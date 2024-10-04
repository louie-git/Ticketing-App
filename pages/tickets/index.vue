<template>
  <div class="">
    <PageTitle page-title="Tickets"/>
    
    <div class="my-5 py-2 px-2 rounded-md text-slate-800 gap-y-2 bg-indigo-50 shadow-md flex flex-col laptop:flex-row laptop:justify-between laptop:items-end">
      <div class=" flex flex-col  tablet:flex-row gap-3">
        <div class="flex-col flex items-center tablet:block">
          <p class="font-semibold">Status</p>
          <DropdownMenu :arr-menu-data="arrStatusMenu" @set-filter="fnSetStatus" :current-filter="objQuery.status"></DropdownMenu>
        </div>
        <div class="flex-col flex items-center tablet:block">
          <p class="font-semibold">Priority</p>
          <DropdownMenu :arr-menu-data="arrPriorityMenu" @set-filter="fnSetPriority"  :current-filter="objQuery.priority"></DropdownMenu>
        </div>
      </div>

      <form @submit.prevent="fnSearch">
        <div class="flex justify-between items-center border rounded-md mt-4 w-4/5 self-center tablet:self-auto tablet:mt-0 tablet:w-80 laptop:w-64 desktop:w-80 bg-white">
          <input class="outline-none py-1 px-2 w-full " type="text" placeholder="Search..." v-model="strSearch">
          <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
        </div>
      </form>
    </div>

    <div class="flex justify-end px-2 pb-3">
      <div class="flex w-44 justify-center gap-3 shadow-md px-4 py-1 bg-blue-950 rounded-md font-semibold cursor-pointer text-slate-50 hover:opacity-85 duration-200">
          <p class="font-semibold">Download All</p>
          <font-awesome :icon="'download'" class="text-xl"/>
      </div>
    </div>

    <TicketTable :arr-tickets="arrTickets" :num-total-tickets="numTotalTickets" :bln-loading="blnLoading"></TicketTable>

    <Pagination :total-tickets="numTotalTickets" :current-page="numCurrentPage" :page-cursor="numPageCursor" @set-page="fnSetPage" ></Pagination>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess"  @closeNotif="()=> blnShowNotif = false"></Notification>
    


  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import getFetch from '../fetch/getFetch.js'
import { status, priority } from '../../helpers/filters.js'
import { routerKey } from 'vue-router';

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
const arrStatusMenu = ref(status)
const arrPriorityMenu = ref(priority)
const strStatusFilter = ref('')
const strPriorityFilter = ref('')
const strSearch = ref('')
const objQuery = ref({})


//Set Filter Function
const fnSetStatus = (status) => {
  if(status === 'All') delete objQuery.value.status
  else objQuery.value.status = status
  numPageCursor.value = 0
  numCurrentPage.value = 1
  fnFetchData()
}

const fnSetPriority = (priority) => {
  if(priority === 'All') delete objQuery.value.priority
  else objQuery.value.priority = priority
  numPageCursor.value = 0
  numCurrentPage.value = 1
  fnFetchData()
}

const fnSearch = () => {
  numCurrentPage.value = 1
  numPageCursor.value = 0
  strSearch.value && fnFetchData()
}

const fnSetPage = (page,cursor) => {
  console.log('dev',page,cursor)
  numCurrentPage.value = page
  numPageCursor.value = cursor
  fnFetchData()
}

const fnSetPageQuery = () => {
  route.query.status && (objQuery.value.status = route.query.status)
  route.query.priority && (objQuery.value.priority = route.query.priority)
  route.query.search && (objQuery.value.search = route.query.search, strSearch.value = route.query.search)
  if(route.query.page){
    numCurrentPage.value = route.query.page > 5 ? 5 : parseInt(route.query.page)
    numPageCursor.value = route.query.page > 5 ? parseInt(route.query.page) - 5 : 0
  } 

  fnFetchData()
}


//Fetch Data
const fnFetchData = async() => {


  console.log('str valu',strSearch.value)
  if(strSearch.value !== '') objQuery.value.search = strSearch.value
  else delete objQuery.value.search
  objQuery.value.page =  numCurrentPage.value + numPageCursor.value

  console.log('here',objQuery.value)
  navigateTo({
    path: '/tickets',
    query: objQuery.value
  })

  console.log('request', numCurrentPage.value + numPageCursor.value)

  blnLoading.value = true
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/tickets`,objQuery.value)
  console.log(data, message, response_error)
  console.log(!data)
  if(!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  arrTickets.value = [...data.tickets]
  numTotalTickets.value = data.total_tickets
  blnLoading.value = false
}


//Watch Search String
watch(strSearch, (val, oldVal) => {   //Refreshes the page when input box is empty
  if(val === '' && oldVal !== ' ')  fnFetchData()
})

onMounted( () => {
   fnSetPageQuery()
})



</script>

<style scoped>


</style>