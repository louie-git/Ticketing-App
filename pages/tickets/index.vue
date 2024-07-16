<template>
  <div class="">
    <div class=" w-full tablet:flex tablet:justify-between">
      <PageTitle page-title="Tickets"/>
    </div>
    <div class="py-3">
      <div class="flex w-44 justify-center gap-3 shadow-md px-4 py-1 bg-blue-950 rounded-md font-semibold text-slate-50 hover:opacity-85 duration-200">
          <p class="font-semibold">Download All</p>
          <font-awesome :icon="'download'" class="text-xl"/>
      </div>
    </div>

    <div class="mb-3 py-2 px-2 rounded-md text-slate-800 gap-y-2 bg-indigo-50 shadow-md flex flex-col laptop:flex-row laptop:justify-between laptop:items-end">
      <div class=" flex flex-col  tablet:flex-row gap-3">
        <div class="flex-col flex items-center tablet:block">
          <p class="font-semibold">Status</p>
          <DropdownMenu :arr-menu-data="arrStatusMenu" @set-filter="fnSetStatus"></DropdownMenu>

          <!-- <select class="outline-none w-4/5 py-1 px-2 border text-sm rounded-md tablet:w-52" name="" id="status">
            <option value="">Completed</option>
            <option value="">Pending</option>
            <option value="">In-progress</option>
          </select> -->
        </div>
        <div class="flex-col flex items-center tablet:block">
          <p class="font-semibold">Priority</p>
          <!-- <select class="outline-none w-4/5 py-1 px-2 border text-sm rounded-md tablet:w-52" name="" id="status">
            <option value="">Low</option>
            <option value="">Medium</option>
            <option value="">High</option>
          </select> -->
          <DropdownMenu :arr-menu-data="arrPriorityMenu" @set-filter="fnSetPriority"></DropdownMenu>
        </div>
      </div>
      
      <div class="flex justify-between items-center border rounded-md mt-4 w-4/5 self-center tablet:self-auto tablet:mt-0 tablet:w-80 laptop:w-64 desktop:w-80 bg-white">
        <input class="outline-none py-1 px-2 w-full " type="text" placeholder="Search..." >
        <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2"/>
      </div>
    </div>

    <TicketTable :arr-tickets="arrTickets" :num-total-tickets="numTotalTickets" :bln-loading="blnLoading"></TicketTable>

    <!-- pagination -->
    <div class="flex flex-col items-center gap-3 content-center mx-auto w-full px-4 mt-4 laptop:flex-row laptop:justify-between" >
      <div class="text-sm">
        Total of <span class="font-semibold underline">{{ numTotalTickets }}</span> tickets
      </div>

      <div class="flex">
        
        <button class="cursor-pointer w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 rounded-tl-md rounded-bl-md border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationSkip('first')" :disabled="blnLoading || numCurrentPage === 1">
          <font-awesome :icon="'angles-left'" class="m-auto text-xs" />
        </button>

        <button class="cursor-pointer w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationPrev" :disabled="blnLoading || numCurrentPage === 1">
          <font-awesome :icon="'angle-left'" class="m-auto text-xs" />
        </button>

        <div v-for="(page, index) in Math.ceil(numTotalTickets/numPageLimit)">
          <button class="cursor-pointer  w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
            tablet:w-9 tablet:h-8
            laptop:w-10 laptop:h-9 border-slate-300
            disabled:cursor-not-allowed disabled:bg-white disabled:text-black" 
            :class="numCurrentPage === index + 1 && 'bg-indigo-600 text-white hover:opacity-80'" 
            v-if="index + 1 <= numPaginationLimit"
            @click="fnPaginationClick(page)" :disabled="blnLoading && numCurrentPage !==index + 1">
              <p  class="m-auto" >{{ page + numPageCursor }}</p>
          </button>
        </div>

        <button class="cursor-pointer  w-8 h-7 flex border hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 border-slate-300 
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationNext" :disabled="blnLoading || numCurrentPage === Math.ceil(numTotalTickets/numPageLimit)">
          <font-awesome :icon="'angle-right'" class="m-auto text-xs" />
        </button>
        <button type="button" class=" w-8 h-7 flex border border-l-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 rounded-tr-md rounded-br-md  border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationSkip('last')" :disabled="blnLoading || numCurrentPage === Math.ceil(numTotalTickets/numPageLimit)" >
          <font-awesome :icon="'angles-right'" class="m-auto text-xs" />
        </button>
    
      </div>
      
    </div>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess"  @closeNotif="()=> blnShowNotif = false"></Notification>


    


  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import getFetch from '../fetch/getFetch.js'


const route = useRoute()
const config = useRuntimeConfig()
const arrTickets = ref([])
const blnLoading = ref(true)
const blnShowNotif = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()
const numTotalTickets = ref(0)
const numCurrentPage = ref(1)
const numPageLimit = ref(5)
const numPageCursor = ref(0)
const numPaginationLimit = ref(5)
const arrStatusMenu = ref(['Completed', 'Pending', 'In-progress',])
const arrPriorityMenu = ref(['Low', 'Meduim', 'High'])
const strStatusFilter = ref('')
const strPriorityFilter = ref('')

//Pagination functions
const fnPaginationNext = () => {
  let limit = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? 5 : Math.ceil(numTotalTickets.value/numPageLimit.value)
  numPaginationLimit.value = limit
  if ( numCurrentPage.value != limit ) {
    numCurrentPage.value += 1
  } 
  else {
    if((numCurrentPage.value + numPageCursor.value + 1 )  <= Math.ceil(numTotalTickets.value/numPageLimit.value)) {
      numPageCursor.value += 1
    }
  }
  fnFetchData()
}

const fnPaginationPrev = () => {
  if(numCurrentPage.value != 1){
    numCurrentPage.value -= 1 
  }
  else{ 
    if((numCurrentPage.value - numPageCursor.value) != 1)
    numPageCursor.value -= 1
  }
  console.log(numCurrentPage.value)
  fnFetchData()
}

const fnPaginationClick = (page) => {
  numCurrentPage.value = page 
  fnFetchData()
}

const fnPaginationSkip = (value) => {
  switch (value) {
    case 'last':
      numCurrentPage.value = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? 5 : Math.ceil(numTotalTickets.value/numPageLimit.value)
      numPageCursor.value = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? Math.ceil(numTotalTickets.value/numPageLimit.value) - numPageLimit.value : 0
      console.log(numPageCursor.value, '----', numCurrentPage.value)
      break;
  
    default:
      numCurrentPage.value = 1
      numPageCursor.value = 0;
      break;
  }
  fnFetchData()
}


//Set Filter Function
const fnSetStatus = (status) => {
  strStatusFilter.value = status
  fnFetchData()
}

const fnSetPriority = (priority) => {
  strPriorityFilter.value = priority
  fnFetchData()
}


//Fetch Data
const fnFetchData = async() => {
  
  let page = numCurrentPage.value + numPageCursor.value

  navigateTo({
    path: '/tickets',
    query: {
      page: numCurrentPage.value + numPageCursor.value,
      limit: 10,
      status: strStatusFilter.value ? strStatusFilter.value : 'All',
      priority: strPriorityFilter.value ? strPriorityFilter.value : 'All',
    }
  })

  console.log('request', numCurrentPage.value + numPageCursor.value)

  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/api/tickets?page=${page}`)
  console.log(data, message, response_error)
  console.log(!data)
  if(!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  arrTickets.value = data.tickets
  numTotalTickets.value = data.total_tickets
  blnLoading.value = false
}

const fnSetCurrentPage = () => {
  console.log('this is route',route.query)
  numPageCursor.value = route.query.page > 5 ? Math.ceil(route.query.page/numPageLimit.value) - numPageLimit.value  : 0
  numCurrentPage.value = route.query.page ? (parseInt(route.query.page) - numPageCursor.value) : 1
  console.log(numCurrentPage.value, numPageCursor.value)
  
}


onMounted( async () => {

  fnSetCurrentPage()



  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/api/tickets?page=${numCurrentPage.value}`)
  console.log(data, message, response_error)
  console.log(!data)
  if(!data) {
    console.log('e')
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  arrTickets.value = data.tickets
  numTotalTickets.value = data.total_tickets
  blnLoading.value = false

})





</script>

<style scoped>


</style>