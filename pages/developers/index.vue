<template>
  <div class="flex flex-col h-[91vh]">
    <div class="  tablet:flex tablet:justify-between">
      <PageTitle page-title="Developers"/>
    </div>



    <PageHeader > 
      <div class="flex justify-center items-end tablet:justify-end  h-full w-full ">
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

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess"  @closeNotif="()=> blnShowNotif = false"></Notification>

  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default1'
})
import getFetch from '~/fetch/getFetch';
import CardSkeleton from '~/components/Loading/CardSkeleton.vue';
import DevCard from '~/components/Developers/DevCard.vue';
import PageHeader from '../../components/General/PageHeader.vue'

import { watch } from 'vue';

const config = useRuntimeConfig()
const router = useRouter()

const arrDevelopers = ref([])
const objQuery = ref()

const strNotifMessage = ref('')
const strSearch = ref('')

const blnLoading = ref(false)
const blnRequestSuccess = ref()
const blnShowNotif = ref(false)


watch(strSearch,(search, prevChar) => {

  if(search === '' && prevChar !== ' ') fnFetchData()
  // search === '' && fnFetchData()
})


const fnSearch = () => fnFetchData()

const fnFetchData = async() => {

  const query = strSearch.value ? {search: strSearch.value} : {}

  navigateTo({
    path: '/developers',
    query
  })


  blnLoading.value = true
  arrDevelopers.value = [] //reset the obj

  const {data, message, response_error} = await getFetch(`${config.public.server_url}/users/developers`,query)
  if(!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  arrDevelopers.value = data
  blnLoading.value = false
}

onMounted(() => {
  fnFetchData()

})

</script>

<style scoped>

</style>