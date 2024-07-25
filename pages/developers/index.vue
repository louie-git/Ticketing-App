<template>
  <div class="">
    <div class=" w-full tablet:flex tablet:justify-between">
      <PageTitle page-title="Developers"/>
      <!-- <div class="sel self-center flex justify-between items-center shadow-md rounded-sm mt-4 tablet:mt-0">
        <input class="outline-none py-1 px-2 laptop:w-80" type="text" placeholder="Search...">
        <font-awesome :icon="'magnifying-glass'" class="text-indigo-700 text-xl px-2"/>
      </div> -->
    </div>

    <div class="w-full">
      <div class="  p-2 text-slate-800 mt-4 rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-3 desktop:grid-cols-3 desktop:w-4/5 desktop:mx-auto " >
        <NuxtLink to="/developers/1" v-for="dev in objDevelopers">
          <div class="w-full p-2 bg-white rounded-md text-slate-800 my-2 border shadow-md max-w-[500px] desktop:max-w-[550px] mx-auto hover:scale-105 transition-all duration-200 ease-out">
            <div class="flex items-center gap-4 justify-center">
              <div class="h-16 w-16 min-w-16 border-4 border-indigo-900 rounded-full">
                <img  class="ib object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class="text-center mt-3 w-56 ">
                <p class="font-semibold">{{ dev.fullname }}</p>
                <p class="text-sm break-all">{{ dev.email }}</p>
                <p class=" rounded-full font-semibold bg-indigo-900 text-white">{{ dev.designation }}</p>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-xl font-bold text-center ">Tickets</p>
              <div class="flex flex-wrap justify-center gap-1 tablet:gap-x-1">
                <div class="shadow-md rounded-md text-center px-3 ">
                  <p class="text-sm"> Pending</p>
                  <p class="text-red-500 font-bold">100</p>
                </div>
                <div class="shadow-md rounded-md text-center px-3 ">
                  <p class="text-sm"> In-progress</p>
                  <p class="text-yellow-500 font-bold">100</p>
                </div>
                <div class="shadow-md rounded-md text-center px-3 ">
                  <p class="text-sm"> Completed</p>
                  <p class="text-green-500 font-bold">100</p>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div> -->
    
    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess"  @closeNotif="()=> blnShowNotif = false"></Notification>

  </div>
</template>

<script setup>
import getFetch from '~/fetch/getFetch';

const config = useRuntimeConfig()

const objDevelopers = ref([])
const blnShowNotif = ref(false)
const blnLoading = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()

const fnFetchData = async() => {
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/api/users`)
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