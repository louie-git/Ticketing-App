<template>
  <div class="flex flex-col h-[91vh]">
    <PageTitle page-title="Developers"/>

    <PageHeader > 
      <div class="flex justify-center items-end tablet:justify-end h-full w-full ">
        <form @submit.prevent="fnSearch">
          <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 tablet:max-w-80 w-full">
            <input class="outline-none py-1 px-2  " type="text" placeholder="Search..." v-model="strSearch">
            <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
          </div>
        </form>
      </div>
    </PageHeader>

    <div class="w-full" v-if="blnLoading">
      <div class=" p-2 text-slate-800 mt-4 rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-3 desktop:grid-cols-3 desktop:gap-2 desktop:mx-auto " >
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </div>
    </div>

    <div  class="flex-1 overflow-auto" v-else>
      <p class="text-center" v-if="!arrDevelopers.length">No data to show.</p>
      <div class="  p-2 text-slate-800 mt-4 rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-3 desktop:grid-cols-3 desktop:gap-2 desktop:mx-auto" v-else>
        <NuxtLink :to="`/developers/${dev._id}`" v-for="dev in arrDevelopers">
          <DevCard :dev="dev"></DevCard>
        </NuxtLink>
      </div>
    </div>

    <Notification v-if="objNotif.show" :bln-show-notif="objNotif.show" :message="objNotif.message" :is-success="objNotif.success"  @closeNotif="()=> objNotif.show = false"></Notification>

  </div>
</template>

<script setup>

definePageMeta({
  middleware:['auth'],
  layout: 'main-layout'
})
import fetch from '../../api/fetch'
import CardSkeleton from '~/components/Loading/CardSkeleton.vue';
import DevCard from '~/components/Developers/DevCard.vue';
import PageHeader from '../../components/General/PageHeader.vue'

import { watch } from 'vue';

const config = useRuntimeConfig()

const arrDevelopers = ref([])

const strSearch = ref('')

const blnLoading = ref(false)


const objNotif = ref({
  show: false,
  message: '',
  success: false
})


const fnShowNotif = (message) => {
  objNotif.value = {
    show: true,
    message: message,
    success: false
  }
  blnLoading.value = false
}


const fnSearch = () => fnFetchData()

const fnFetchData = async() => {
  const query = strSearch.value ? {search: strSearch.value} : {}
  navigateTo({
    path: '/developers',
    query
  })
  blnLoading.value = true
  arrDevelopers.value = [] //reset the obj
  const {data, error_response} = await fetch.get(`${config.public.server_url}/users/developers`,query)
  if(!data) {
    fnShowNotif(error_response)
    return
  }
  arrDevelopers.value = data
  blnLoading.value = false
}

watch(strSearch,(search, prevChar) => {  // automatically fetch data when search bar is empty
if(search === '' && prevChar !== ' ') fnFetchData()
})

onMounted(() => {
  fnFetchData()
})

</script>

<style scoped>

</style>