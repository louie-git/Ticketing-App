<template>
  <div class="">
    <PageTitle :page-title="router.currentRoute.value.params.id" :ret-btn="true"/>

    <div class="text-slate-800 mt-2 p-2 laptop:grid laptop:grid-cols-2 gap-x-3">
      <div class="p-2 rounded-md shadow-md border">
        <p class="text-xl font-bold">{{ objTicket.category ? objTicket.category : '--' }}</p>
        <div class="flex items-center gap-2 my-2">
          <div class="h-16 w-16 border-4 border-indigo-950 rounded-full">
              <img  class="ib object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt="">
          </div>
          <div class="">
            <p class="font-bold">{{ objTicket.submitted_by.full_name }}</p>
            <p>{{objTicket.submitted_by.email}}</p>
          </div>
        </div>

        <div class="flex gap-2 my-2">
          <p class="font-bold">Date posted: </p>
          <p>{{ objTicket.createdAt }}</p>
        </div> 

        <div class="flex gap-2 my-2">
          <p class="font-bold">Status: </p>
          <p class="px-2 rounded-md font-semibold">{{ objTicket.status ? objTicket.status : '--' }}</p>
        </div>
        <div class="flex gap-2 my-2">
          <p class="font-bold">Priority: </p>
          <p class="px-2 rounded-md font-semibold">{{ objTicket.priority ? objTicket.priority : '--'}}</p>
        </div>
        <div class="">
          <p class="font-bold">Description</p>
          <p>{{ objTicket.description }}</p>
        </div>

        <div class="my-3">
          <p class="font-bold">Assignee</p>
          <div class="flex flex-wrap ">
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1">
              <div class="w-8 h-8 b ">
                <img class="object-cover w-full h-full rounded-full"  src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class=" leading-3  text-center">
                <p class="text-sm ">Vincent Louie Arrabis</p>
                <p class="text-xs">dev1@email.com</p>
              </div>
            </div>
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1">
              <div class="w-8 h-8 b ">
                <img class="object-cover w-full h-full rounded-full"  src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class=" leading-3  text-center">
                <p class="text-sm ">Vincent Louie Arrabis</p>
                <p class="text-xs">dev1@email.com</p>
              </div>
            </div>
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1">
              <div class="w-8 h-8 b ">
                <img class="object-cover w-full h-full rounded-full"  src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class=" leading-3  text-center">
                <p class="text-sm ">Vincent Louie Arrabis</p>
                <p class="text-xs">dev1@email.com</p>
              </div>
            </div>
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1">
              <div class="w-8 h-8 b ">
                <img class="object-cover w-full h-full rounded-full"  src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class=" leading-3  text-center">
                <p class="text-sm ">Ako si Lowee</p>
                <p class="text-xs">dev1@.com</p>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="font-bold ">Uploaded Documents</p>
          <div class="flex gap-2 flex-row flex-wrap">
            <div class="w-20 h-20 relative cursor-pointer">
                <img class="h-full w-full object-cover rounded-md " src="~assets/images/cat1.jpg" alt="">
                <div class="absolute top-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-100 hover:backdrop-blur-sm transition-all duration-100">
                  <p class="px-1  text-white text-sm">expand</p>
                </div>
            </div>
            <div class="w-20 h-20 relative cursor-pointer">
                <img class="h-full w-full object-cover rounded-md " src="~assets/images/cat2.jpg" alt="">
                <div class="absolute top-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-100 hover:backdrop-blur-sm transition-all duration-100">
                  <p class="px-1  text-white text-sm">expand</p>
                </div>
            </div>
            <div class="w-20 h-20 relative cursor-pointer">
                <img class="h-full w-full object-cover rounded-md " src="~assets/images/cat3.jpg" alt="">
                <div class="absolute top-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-100 hover:backdrop-blur-sm transition-all duration-100">
                  <p class="px-1  text-white text-sm">expand</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-5 laptop:my-0 h-auto ">
 
        <div class="w-full flex flex-col justify-between  border">
          <div class=" h-96 border flex flex-col-reverse p-3 overflow-y-auto">
            <div class="flex flex-col gap-y-3">
              <div class="flex gap-2 items-end mb-2">
                <div class="w-8 h-8 min-w-8 relative cursor-pointer">
                  <img class="h-full w-full object-cover rounded-full " src="~assets/images/cat3.jpg" alt="">
                </div>
                <div class=" break-words text-wrap w-10/12 bg-blue-600 text-white rounded-2xl p-2 relative mr-20">
                  <p class="text-sm">sfdsffsdfdsfsdfsfdsffdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfsfdsfddsfdsfdsfdsf sfds fdf</p>
                  <p class="absolute -top-4 text-slate-800 text-xs">alexw@email.com</p>
                </div>
              </div>

              <div class="flex gap-2 items-end mb-2 flex-row-reverse">
                <div class=" break-words text-wrap w-10/12 bg-blue-600 text-white rounded-2xl p-2 relative ml-20">
                  <p class="text-sm">If chicken can be a chicken, why a fish can't be a chicken</p>
                </div>
              </div>
            </div>
          </div>
          <div class=" flex justify-center items-center px-5 py-1 gap-2">
            <input class="w-full py-1 px-3 rounded-full border outline-none" type="text" placeholder="Compose...">
            <font-awesome :icon="'paper-plane'" class="text-2xl p-2 w-5 h-5 rounded-full hover:bg-purple-100 transition-all duration-200 text-blue-400 mr-2 cursor-pointer"/>
            <!-- <img class="w-6" src="~assets/icons/paper-plane.png" alt=""> -->
          </div>
        </div>
        <div>
          <button class="px-3 py-1 border bg-blue-700 rounded-sm text-white hover:bg-blue-600">Reply</button>
          <button class="px-3 py-1 border bg-blue-700 rounded-sm text-white hover:bg-blue-600">Note</button>
        </div>
      </div>
    </div>
    <Loading v-if="blnLoading"></Loading>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import getFetch from '../../fetch/getFetch.js'
const router = useRouter()
const config = useRuntimeConfig()
const objTicket = ref({submitted_by: {}})
const blnLoading = ref(false)
console.log(router.currentRoute.value.params.id)

onMounted(async () => {

  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/api/tickets/${router.currentRoute.value.params.id}`)
  if(response_error.status) {
    console.log('e')
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
  }
  objTicket.value = data
  blnLoading.value = false

})
</script>


<style scoped>

</style>