<template>
  <div class="">
    <div class=" w-full tablet:flex tablet:justify-between">
      <PageTitle page-title="Developers"/>
      <!-- <div class="sel self-center flex justify-between items-center shadow-md rounded-sm mt-4 tablet:mt-0">
        <input class="outline-none py-1 px-2 laptop:w-80" type="text" placeholder="Search...">
        <font-awesome :icon="'magnifying-glass'" class="text-indigo-700 text-xl px-2"/>
      </div> -->
    </div>

    <div class="border-b">
      <div class="  mt-4 h-16 flex justify-center items-center tablet:justify-end px-5 desktop:w-4/5 mx-auto">
        <form @submit.prevent="fnSearch">
          <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 tablet:max-w-80 w-full">
            <input class="outline-none py-1 px-2  " type="text" placeholder="Search..." v-model="strSearch">
            <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
          </div>
        </form>
      </div>
    </div>

    <div class="w-full" v-if="blnLoading">
      <div class=" p-2 text-slate-800 mt-4  rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-3 desktop:grid-cols-3 desktop:w-4/5 desktop:mx-auto " >
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </div>
    </div>

    <div v-else class="w-full">
      <div class="  p-2 text-slate-800 mt-4 rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-3 desktop:grid-cols-3 desktop:w-4/5 desktop:mx-auto " >
        <NuxtLink :to="`/developers/${dev._id}`" v-for="dev in objDevelopers">
          <DevCard :dev="dev"></DevCard>
        </NuxtLink>
      </div>
    </div>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess"  @closeNotif="()=> blnShowNotif = false"></Notification>

  </div>
</template>

<script setup>
import getFetch from '~/fetch/getFetch';
import CardSkeleton from '~/components/Loading/CardSkeleton.vue';
import DevCard from '~/components/Developers/DevCard.vue';
import { watch } from 'vue';

const config = useRuntimeConfig()
const router = useRouter()

const objDevelopers = ref([])
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

  console.log('thise',)

  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/api/users`,query)
  console.log(data, message, response_error)
  console.log(!data)
  if(!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  objDevelopers.value = data
  blnLoading.value = false
}

onMounted(() => {
  fnFetchData()

})

</script>

<style scoped>

</style>