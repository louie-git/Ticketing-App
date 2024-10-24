<template>
  <div class="">
    <PageTitle :page-title="router.currentRoute.value.params.id" :ret-btn="true"/>


    <div class="rounded-md shadow-md mb-5 bg-indigo-50 mt-5 px-2" >
      <div class="mt-4 h-16 flex justify-center items-center tablet:justify-end   ">
        <!-- <form @submit.prevent="fnSearch">
          <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 tablet:max-w-80 w-full">
            <input class="outline-none py-1 px-2  " type="text" placeholder="Search..." v-model="strSearch">
            <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
          </div>
        </form> -->
      </div>
    </div>
    <div class="relative text-slate-800 mt-2 p-2 laptop:grid laptop:grid-cols-2 gap-x-3">

      <TicketCardSkeleton v-if="blnLoading"></TicketCardSkeleton>
      
      <div class=" p-2 rounded-md shadow-md border" v-else>
        <p class="text-xl font-bold">{{ objTicket.category ? objTicket.category : '--' }}</p>
        <div class="flex items-center gap-2 my-2">
          <div class="h-16 w-16 border-4 border-indigo-950 rounded-full" v-if="objTicket.submitted_by.image" >
              <img src="" alt="user image"  class="object-cover h-full w-full rounded-full">
              <!-- <img v-else  class="object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt=""> -->
          </div>

          <font-awesome v-else :icon="'user'" class="rounded-full w-8 h-8 p-3 border-indigo-950 border-4" />

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
          <p class="px-2 rounded-md font-semibold">{{ fnDisplayStatus(strTicketStatus) }}</p>
          <div class="relative" v-if="blnShowEditOpt">
            <button>
              <font-awesome :icon="'pencil'" class="border p-0.5 rounded text-xs border-slate-400 text-slate-500 cursor-pointer" @click="fnToggleStatusOpt"/>
            </button>
            <div class="z-10 absolute  border text-sm rounded-md bg-white overflow-hidden" v-if="blnShowStatusOpt" >
              <div class=" w-28 px-2 py-1 transition-colors duration-300 cursor-pointer" 
              :class="strTicketStatus === menu.item_id ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
              v-for="(menu,index) in arrStatusMenu" 
              @click="fnSetStatus(menu.item_id)">
                <p>{{ menu.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 my-2">
          <p class="font-bold">Priority: </p>
          <p class="px-2 rounded-md font-semibold">{{ fnDisplayPriority(strTicketPriority) }}</p>
          <div class="relative" v-if="blnShowEditOpt">
            <button>
              <font-awesome :icon="'pencil'" class="border p-0.5 rounded text-xs border-slate-400 text-slate-500 cursor-pointer" @click="fnTogglePriorityOpt"/>
            </button>
            <div class="z-10 absolute  border text-sm rounded-md bg-white overflow-hidden" v-if="blnShowPriorityOpt" >
              <div class=" w-28 px-2 py-1  transition-colors duration-300 cursor-pointer" 
              :class="strTicketPriority === menu.item_id ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
              v-for="(menu,index) in arrPriorityMenu" 
              @click="fnSetPriority(menu.item_id)">
                <p>{{ menu.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="font-bold">Description</p>
          <p>{{ objTicket.description }}</p>
        </div>

        <div class="my-3" >
          <p class="font-bold">Assignee</p>
          <p class="" v-if="!arrAssignedDev.length">No developers assigned.</p>
          <div  class="flex gap-3">
            <button v-if="blnShowEditOpt"> 
              <font-awesome :icon="'plus'" class="border p-0.5 rounded text-sm border-slate-400 text-slate-500 cursor-pointer" @click="fnToggleDevNamesOpt"/>
            </button>
          </div>
          <div  class="flex flex-wrap w-full bg-white  rounded-md text-sm overflow-y-auto transition-all duration-300"  :class=" blnShowDevelopers ? ' h-36 p-2 border': 'h-0 p-0 border-none' " v-if="blnShowEditOpt">
            <div v-for="dev in arrDevNames" 
            class="px-2 py-1 cursor-pointer border border-white w-1/2 rounded-md h-8"
            :class="fnCheckId(dev._id) ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
            @click="fnAssignDev(dev)">
              <p class="line-clamp-1">{{ dev.email }}</p>
            </div>
          </div>
          
          <div class="flex flex-wrap ">
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1 hover:bg-gray-100" v-for="assignee in arrAssignedDev">
              <div class="w-8 h-8 b ">
                <img class="object-cover w-full h-full rounded-full"  src="~assets/images/cat1.jpg" alt="">
              </div>
              <div class=" leading-3  text-center">
                <p class="text-sm ">{{ assignee.first_name }} {{ assignee.last_name }}</p>
                <p class="text-xs">{{ assignee.email }}</p>
              </div>
            </div>
          </div>
        </div>


        <div class="">
          <p class="font-bold ">Uploaded Images</p>
          <div class="flex gap-2 flex-row flex-wrap">
            <div class="w-20 h-20 relative cursor-pointer" v-for="image in arrImages" @click="fnImageModal(image)">
                <img class="h-full w-full object-cover rounded-md " :src="`/_nuxt/assets/images/${image}`" alt="" >
                <div class="absolute top-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-100 hover:backdrop-blur-sm transition-all duration-100">
                  <p class="px-1  text-white text-sm">expand</p>
                </div>
            </div>
          </div>
        </div>


        <!-- Ticket Card Footer -->
        <div class="mt-4 flex justify-end gap-5 items-end" >
          <Loading v-if="blnEditLoading"></Loading>
          <div class="font-medium">
            <div class="flex gap-2"  v-if="blnShowEditOpt">
              <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85"  @click="fnCancelEdit">Cancel</button>
              <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="fnUpdateTicket">Save</button>
            </div>
            <div class="flex gap-2" v-else>
              <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="() => blnShowEditOpt = true">Edit</button>
            </div>
          </div>
        </div>
      </div>


      <!-- Message section -->
      <div class="my-5 laptop:my-0 h-auto ">
        <div class="flex my-2 text-white font-medium gap-1">
          <button class="
          px-3 
          py-1 
          rounded-md 
          shadow-md 
          border 
          transition-colors 
          duration-200
          " 
          :class="btn.isActive ? 'bg-indigo-950 hover:bg-indigo-950/70': 'bg-none text-black hover:bg-gray-100 '" 
          v-for="(btn, index) in arrActionBtns"
          @click="fnActiveBtn(index)"
          >{{ btn.name }}</button>
        </div>

        <ChatBox title="Reply" v-if="arrActionBtns[0].isActive"/>
        <ChatBox title="Notes" v-else/>
        


      </div>

    </div>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false"></Notification>
    <ImageModal v-if="blnToggleImageModal" :image="strImage" @toggle-modal="fnCloseModal"></ImageModal>
    
   
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default1'
})

import { onMounted } from 'vue';
import TicketCardSkeleton from '~/components/Loading/TicketCardSkeleton.vue';
import ImageModal from '~/components/Modals/ImageModal.vue';
import getFetch from '../../fetch/getFetch.js'
import ChatBox from '../../components/Ticket/ChatBox.vue'


const router = useRouter()
const config = useRuntimeConfig()

const objTicket = ref({submitted_by: {}})

const strTicketStatus = ref()
const strTicketPriority = ref()
const strNotifMessage = ref('')
const strImage = ref('')

const arrStatusMenu = ref([])
const arrPriorityMenu = ref([])
const arrDevNames = ref()
const arrNewAssignedDevID = ref()
const arrImages = ref(['cat1.jpg', 'cat2.jpg', 'cat3.jpg'])

const blnLoading = ref(false)
const blnEditLoading = ref(false)
const blnShowStatusOpt = ref(false)
const blnShowPriorityOpt = ref(false)
const blnShowDevelopers = ref(false)
const blnShowEditOpt = ref(false)
const blnShowNotif = ref(false)
const blnRequestSuccess = ref()
const blnToggleImageModal = ref(false)

const numActiveStatus = ref()
const numActivePriority = ref()
const strStatus = ref('')

const arrAssignedDev = ref([])
const arrActionBtns = ref([
  {
    name: 'Reply',
    isActive: true
  },
  {
    name: 'Add Note',
    isActive: false
  }
])


console.log(router.currentRoute.value.params.id)

const fnToggleStatusOpt = () =>  blnShowStatusOpt.value = !blnShowStatusOpt.value

const fnTogglePriorityOpt = () =>  blnShowPriorityOpt.value = !blnShowPriorityOpt.value

const fnToggleDevNamesOpt = () => blnShowDevelopers.value = !blnShowDevelopers.value

const fnSetStatus = (id) => {
  blnShowStatusOpt.value = false
  strTicketStatus.value = id
} 

const fnSetPriority = (id) => {
  blnShowPriorityOpt.value = false
  strTicketPriority.value = id
}

const fnAssignDev = (dev) => {

  if ( arrNewAssignedDevID.value.includes(dev._id) ){
    const index = arrNewAssignedDevID.value.indexOf(dev._id)
    arrNewAssignedDevID.value.splice(index,1)
    arrAssignedDev.value = arrAssignedDev.value.filter(names => names._id != dev._id)
    return
  }
  arrNewAssignedDevID.value.push(dev._id)
  arrAssignedDev.value.push(dev)
}


const fnCheckId = (id) => {
  const assignedDevId = arrAssignedDev.value.map(data => data._id)
  return assignedDevId.includes(id) ? true : false
}

const fnDisplayStatus = (status_id) => {
  let text = '--'
  arrStatusMenu.value.forEach((status) => {
    if(status.item_id === status_id) {
      text = status.name
    }
  })
  return text
}

const fnDisplayPriority = (priority_id) => {
  let text = '--'
  arrPriorityMenu.value.forEach((priority) => {
    if(priority.item_id === priority_id) {
      text = priority.name
    }
  })
  return text
}

const fnCancelEdit = () => {
  blnShowEditOpt.value = false
  strTicketPriority.value = objTicket.value.priority
  strTicketStatus.value = objTicket.value.status
  arrAssignedDev.value = [...objTicket.value.assignee]
}

const fnImageModal = (image) => {
  blnToggleImageModal.value = true
  strImage.value = image 
}

const fnCloseModal = () => blnToggleImageModal.value = false

const fnActiveBtn = (btnIndex) => {
  arrActionBtns.value = arrActionBtns.value.map((btn, index) => {
    index === btnIndex ? btn.isActive = true : btn.isActive = false
    return btn
  })
}


const fnUpdateTicket = async () => {
  blnEditLoading.value = true
  try {
    const res = await $fetch(`${config.public.server_url}/tickets/${router.currentRoute.value.params.id}`,{
      method: 'POST',
      headers :{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        status: strTicketStatus.value,
        priority: strTicketPriority.value,
        assignee: arrNewAssignedDevID.value
      })
    })
    blnEditLoading.value = false
    blnShowNotif.value = true
    strNotifMessage.value = res.message
    blnRequestSuccess.value = true
  } catch (error) {
    blnEditLoading.value = false
    blnShowNotif.value = true
    blnRequestSuccess.value = false
    strNotifMessage.value = 'Error while updating ticket. Please contact IT support. '
  }
  blnShowEditOpt.value = false
}


// Fetch Functions
const fnFetchStatus = async() => {
  const { data } = await getFetch(`${config.public.server_url}/status`)
  arrStatusMenu.value = data
}

const fnFetchPriorities = async() => {
  const { data } = await getFetch(`${config.public.server_url}/priorities`)
  arrPriorityMenu.value = data
}

//Fetch developers
const fetchUserData = async () => { 
  const { data } = await getFetch(`${config.public.server_url}/users`)
  arrDevNames.value = data
  console.log(data)
}

onMounted(async () => {
  console.log('run heree')

  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/tickets/${router.currentRoute.value.params.id}`)
  if(response_error.status) {
    console.log('error')
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
  }
  objTicket.value = {...data}
  strTicketStatus.value = data.status
  strTicketPriority.value = data.priority
  arrAssignedDev.value = [...data.assignee]
  blnLoading.value = false
  arrNewAssignedDevID.value = arrAssignedDev.value.map(dev => dev._id)
   
  await fnFetchStatus()
  await fnFetchPriorities()
  await fetchUserData()

})

</script>


<style scoped>

</style>