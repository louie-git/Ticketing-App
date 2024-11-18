<template>
  <div class="">
    <PageTitle page-title="Tickets"/>
    


    <PageHeader>
      
      <div class="h-full w-full rounded-md text-slate-800 flex gap-y-2 flex-col laptop:flex-row laptop:justify-between laptop:items-end ">
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
          <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 mx-auto tablet:max-w-80 tablet:mx-0 w-full">
            <input class="outline-none py-1 px-2 w-full " type="text" placeholder="Search..." v-model="strSearch">
            <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
          </div>
        </form>
      </div>
    </PageHeader>

    <div class="flex justify-end px-2 pb-3">
      <div class="flex w-44 justify-center gap-3 shadow-md px-4 py-1 bg-blue-950 rounded-md font-semibold cursor-pointer text-slate-50 hover:opacity-85 duration-200">
          <p class="font-semibold">Download All</p>
          <font-awesome :icon="'download'" class="text-xl"/>
      </div>
    </div>

    <TicketTable :arr-tickets="arrTickets" :num-total-tickets="numTotalTickets" :bln-loading="blnLoading"></TicketTable>

    <Pagination :total-data="numTotalTickets" :current-page="numCurrentPage" :page-cursor="numPageCursor" @set-page="fnSetPage" ></Pagination>

    <Notification v-if="objNotif.show" :bln-show-notif="objNotif.show" :message="objNotif.message" :is-success="objNotif.success"  @closeNotif="()=> objNotif.show = false"></Notification>


  </div>
</template>

<script setup>

definePageMeta({
  middleware:['auth'],
  layout: 'main-layout'
})

import fetch from '../../api/fetch'
import { onMounted, watch } from 'vue';
import { status, priority } from '../../helpers/filters.js'
import PageHeader from '../../components/General/PageHeader.vue'

const route = useRoute()
const config = useRuntimeConfig()

const blnLoading = ref(true)

const numTotalTickets = ref(0)
const numCurrentPage = ref(1)
const numPageCursor = ref(0)

const arrTickets = ref([])
const arrStatusMenu = ref(status)
const arrPriorityMenu = ref(priority)

const strSearch = ref('')

const objQuery = ref({})
const objNotif = ref({
  show:false,
  message: '',
  success: false
})


const fnShowNotif = (message) => {
  objNotif.value = {
    show: true,
    message,
    success: false
  }
  blnLoading.value = false
}

//emits functions
const fnSetPage = (page,cursor) => {
  numCurrentPage.value = page
  numPageCursor.value = cursor
  fnFetchData()
}

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
//end emits


const fnSearch = () => {
  numCurrentPage.value = 1
  numPageCursor.value = 0
  strSearch.value && fnFetchData()
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

  if(strSearch.value !== '') objQuery.value.search = strSearch.value
  else delete objQuery.value.search
  objQuery.value.page =  numCurrentPage.value + numPageCursor.value

  navigateTo({
    path: '/tickets',
    query: objQuery.value
  })

  blnLoading.value = true
  const {data, error_response} = await fetch.get(`${config.public.server_url}/tickets`,objQuery.value)
  if(error_response) {
    console.log('error notif', error_response)
    fnShowNotif(error_response)
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