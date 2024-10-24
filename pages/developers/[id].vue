<template>

  <PageTitle :page-title="objDeveloper.email" :ret-btn="true"/>
  <div class="mx-auto my-5 text-te-700 ">
    
    <div class="laptop:flex laptop:gap-x-10 items-start border-b pb-4">
      <div class="flex flex-col items-center tablet:flex-row gap-x-4">
        <div class="w-14 h-14">
          <img class="h-full w-full object-cover rounded-full" src="~assets/images/cat3.jpg" alt="">
        </div>
        <div class="text-center">
          <p class="font-bold">{{ objDeveloper.full_name }}</p>
          <p class="text-sm">{{ objDeveloper.email }}</p>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-1 mt-4 tablet:gap-x-4 tablet:justify-normal tablet:mt-5 laptop:mt-0 ">
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Pending</p>
          <p class="text-red-500 font-bold text-xl">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> In-progress</p>
          <p class="text-yellow-500 font-bold text-xl">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Completed</p>
          <p class="text-green-500 font-bold text-xl">100</p>
        </div>
      </div>
    </div>
    <div class='mt-3'>
      <div class="mb-3 py-2 px-2 rounded-md text-slate-800 flex flex-col  tablet:flex-row gap-5 bg-indigo-50 shadow-md">

        <div class="flex-col flex items-center tablet:block">
          <p>Status</p>
          <DropdownMenu :arr-menu-data="arrStatusMenu" @set-filter="fnSetStatus"  :current-filter="objQuery.status"></DropdownMenu>
          <!-- <DropdownMenu :arr-menu-data="arrStatusMenu" @set-filter="fnSetStatus"></DropdownMenu> -->



        </div>
        <div class="flex-col flex items-center tablet:block">
          <p>Priority</p>
          <DropdownMenu :arr-menu-data="arrPriorityMenu" @set-filter="fnSetPriority"  :current-filter="objQuery.priority"></DropdownMenu>
          <!-- <DropdownMenu :arr-menu-data="arrPriorityMenu" @set-filter="fnSetPriority"></DropdownMenu> -->

        </div>
      </div>
      <TicketTable :arr-tickets="arrTickets" :bln-loading="blnLoading"></TicketTable>

      <Pagination :total-data="numTotalTickets" @set-page="fnSetPage"></Pagination>


    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default1'
})

import { onMounted } from 'vue';
import getFetch from '~/fetch/getFetch';

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
console.log(router.currentRoute.value.params.id)

const objDeveloper = ref({})
const objQuery = ref({})

const blnShowNotif = ref(false)
const blnRequestSuccess = ref()
const blnLoading = ref(false)

const arrPriorityMenu = ref([])
const arrStatusMenu = ref([])
const arrTickets = ref([])

const strNotifMessage = ref('')
const strPriorityFilter = ref()
const strStatusFilter = ref()

const numTotalTickets = ref(0)
const numCurrentPage = ref(1)
const numPageCursor = ref(0)
const numPageLimit = ref(5)

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

const fnSetPage = (page,cursor) => {
  console.log('dev',page,cursor)
  numCurrentPage.value = page
  numPageCursor.value = cursor
  fnFetchData()
}

const fnSetPageQuery = () => {
  route.query.status && (objQuery.value.status = route.query.status)
  route.query.priority && (objQuery.value.priority = route.query.priority)
  if(route.query.page){
    numCurrentPage.value = route.query.page > 5 ? 5 : parseInt(route.query.page)
    numPageCursor.value = route.query.page > 5 ? parseInt(route.query.page) - 5 : 0
  } 

  fnFetchData()
}

//Fetch data
const fnFetchStatus = async() => {
  const { data } = await getFetch(`${config.public.server_url}/status`)
  arrStatusMenu.value = [...data]
  console.log('status',arrStatusMenu.value)
}

const fnFetchPriorities = async() => {
  const { data } = await getFetch(`${config.public.server_url}/priorities`)
  arrPriorityMenu.value = [...data]
  console.log('priority',arrPriorityMenu.value)

}

const fnFetchData = async() => {

  // route.query.page == 1  ? '' : objQuery.value.page =  numCurrentPage.value + numPageCursor.value


  objQuery.value.page =  numCurrentPage.value + numPageCursor.value
  navigateTo({
    path: `/developers/${router.currentRoute.value.params.id}`,
    query: objQuery.value
  })
  
  blnLoading.value = true
  const {data , message, response_error} = await getFetch(`${config.public.server_url}/users/${router.currentRoute.value.params.id}`,objQuery.value)
  if(!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
    return
  }
  console.log('this is',data)
  objDeveloper.value = data.user
  arrTickets.value = [ ...data.tickets ]
  numTotalTickets.value = data.total_tickets
  blnLoading.value = false
}


onMounted( async() => {
  fnSetPageQuery()
  await fnFetchStatus()
  await fnFetchPriorities()
})
</script>

<style lang="scss" scoped>
  
</style>