<template>
  <div class="">
    <PageTitle :page-title="router.currentRoute.value.params.id" :ret-btn="true"/>

    <div class="relative text-slate-800 mt-2 p-2 laptop:grid laptop:grid-cols-2 gap-x-3">
      <div class=" p-2 rounded-md shadow-md border">
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
          <p class="px-2 rounded-md font-semibold">{{ objTicket.status ? arrStatusMenu[objTicket.status - 1].name : '--' }} {{  }}</p>
          <div class="relative">
            <button>
              <font-awesome :icon="'pencil'" class="border p-0.5 rounded text-xs border-slate-400 text-slate-500 cursor-pointer" @click="fnToggleStatusOpt"/>
            </button>
            <div class="z-10 absolute  border text-sm rounded-md bg-white overflow-hidden" v-if="blnShowStatus" >
              <div class=" w-28 px-2 py-1 transition-colors duration-300 cursor-pointer" 
              :class="objTicket.status === menu.item_id ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
              v-for="(menu,index) in arrStatusMenu" 
              @click="() => objTicket.status = menu.item_id">
                <p>{{ menu.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 my-2">
          <p class="font-bold">Priority: </p>
          <p class="px-2 rounded-md font-semibold">{{ objTicket.priority ? objTicket.priority : '--'}}</p>
          <div class="relative">
            <button>
              <font-awesome :icon="'pencil'" class="border p-0.5 rounded text-xs border-slate-400 text-slate-500 cursor-pointer" @click="fnTogglePriorityOpt"/>
            </button>
            <div class="z-10 absolute  border text-sm rounded-md bg-white overflow-hidden" v-if="blnShowPriority" >
              <div class=" w-28 px-2 py-1  transition-colors duration-300 cursor-pointer" 
              :class="numActivePriority === index ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
              v-for="(menu,index) in arrPriorityMenu" 
              @click="() => numActivePriority = index">
                <p>{{ menu.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="font-bold">Description</p>
          <p>{{ objTicket.description }}</p>
        </div>

        <div class="my-3">
          <div class="flex gap-3">
            <p class="font-bold">Assignee</p>
            <button> 
              <font-awesome :icon="'plus'" class="border p-0.5 rounded text-sm border-slate-400 text-slate-500 cursor-pointer" @click="fnToggleDevNamesOpt"/>
            </button>
          </div>
          <div class="flex flex-wrap w-full bg-white  rounded-md text-sm overflow-y-auto transition-all duration-300"  :class=" blnShowDevelopers ? ' h-36 p-2 border': 'h-0 p-0 border-none' ">
            <div v-for="dev in arrDevNames" 
            class="px-2 py-1 cursor-pointer border border-white w-1/2 rounded-md h-8"
            :class="fnCheckId(dev._id) ? 'bg-indigo-600 text-white': 'hover:bg-indigo-50'"
            @click="fnAssignDev(dev)">
              <p class="line-clamp-1">{{ dev.email }}</p>
            </div>
          </div>
          
          <div class="flex flex-wrap ">
            <div class="flex items-center gap-2 m-1 px-2 shadow-md rounded-md justify-center py-1" v-for="assignee in arrAssignedDev">
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

        <div class="mt-4">
          <div class="flex gap-2 justify-end">
            <button class="px-2 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85">Cancel</button>
            <button class="px-2 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85">Save</button>
          </div>
        </div>

      

      </div>


      <!-- Message section -->
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

      <div class="absolute w-full h-full top-0 left-0 text-center bg-black/10  flex justify-center items-center rounded-lg" v-if="blnLoading">
        <Loading class="bg-slate-50 rounded-lg px-6 py-4 z-20"></Loading>
      </div>

    </div>

   
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import getFetch from '../../fetch/getFetch.js'


const router = useRouter()
const config = useRuntimeConfig()
const objTicket = ref({submitted_by: {}})
const blnLoading = ref(false)

const arrStatusMenu = ref([])
const arrPriorityMenu = ref([])

const arrDevNames = ref()
const arrNewDevObj = ref([])
const arrNewAssignedDevID = ref()

const blnShowStatus = ref(false)
const blnShowPriority = ref(false)
const blnShowDevelopers = ref(false)

const numActiveStatus = ref()
const numActivePriority = ref()

const strStatus = ref('')

const arrAssignedDev = ref([
  {
    _id: "668bd0c28a525beeaf38c760",
    first_name: 'Vincent Louie',
    last_name: 'Arrabis',
    email: 'vincentla@meditab.com'
  }
])


console.log(router.currentRoute.value.params.id)

const fnToggleStatusOpt = () =>  blnShowStatus.value = !blnShowStatus.value

const fnTogglePriorityOpt = () =>  blnShowPriority.value = !blnShowPriority.value

const fnToggleDevNamesOpt = () => blnShowDevelopers.value = !blnShowDevelopers.value

const fnAssignDev = (dev) => {

  if ( arrNewAssignedDevID.value.includes(dev._id) ){
    const index = arrNewAssignedDevID.value.indexOf(dev._id)
    arrNewAssignedDevID.value.splice(index,1)
    arrNewDevObj.value = arrNewDevObj.value.filter(names => names._id != dev._id)
    arrAssignedDev.value = arrAssignedDev.value.filter(names => names._id != dev._id)
    return
  }
  arrNewAssignedDevID.value.push(dev._id)
  arrNewDevObj.value.push(dev)
  arrAssignedDev.value.push(dev)
  console.log(arrNewDevObj.value)
}


const fnCheckId = (id) => {
  const assignedDevId = arrAssignedDev.value.map(data => data._id)
  return assignedDevId.includes(id) ? true : false
}




const fnFetchStatus = async() => {
  const { data } = await getFetch(`${config.public.server_url}/api/status`)
  arrStatusMenu.value = data
}

const fnFetchPriorities = async() => {
  const { data } = await getFetch(`${config.public.server_url}/api/priorities`)
  arrPriorityMenu.value = data
}

const fetchUserData = async () => {
  const { data } = await getFetch(`${config.public.server_url}/api/users/`)
  arrDevNames.value = data
  console.log(data)
}

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

   arrNewAssignedDevID.value = arrAssignedDev.value.map(dev => dev._id)
   
  await fnFetchStatus()
  await fnFetchPriorities()
  await fetchUserData()

})

</script>


<style scoped>

</style>