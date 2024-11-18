<template>
  <div class="flex flex-col h-[91vh]">
    <PageTitle page-title="Users"/>


    <PageHeader>
        <div class="h-full w-full flex justify-center items-end tablet:justify-end ">
          <form @submit.prevent="fnSearch">
            <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 tablet:max-w-80 w-full">
              <input class="outline-none py-1 px-2  " type="text" placeholder="Search..." v-model="strSearch">
              <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
            </div>
          </form>
        </div>
    </PageHeader>

    <div class="">

      <div class="relative h-64 w-full tablet:h-72 laptop:h-80 shadow-md overflow-hidden rounded-md">
        <table class="w-full border table-fixed" >
        
          <thead class="h-12  bg-indigo-950">
            <tr class="text-sm text-slate-100">
              <th class="hidden text-start pl-4 desktop:table-cell">Last name</th>
              <th class="hidden text-start desktop:table-cell">First name</th>
              <th class="text-start pl-3">Email</th>
              <th class="hidden text-start tablet:table-cell">Designation</th>
              <th class="hidden text-start laptop:table-cell w-32">Date Created</th>
              <th class="text-start w-24">Status</th>
              <th class="text-center w-20">View</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="border-b text-start h-9 align-middle tablet:h-10 laptop:h-12 text-xs tablet:text-sm" v-for="user in arrUsers">
              <td class="t hidden text-start pl-4 desktop:table-cell">{{ user.last_name }}</td>
              <td class="hidden text-start desktop:table-cell">{{ user.first_name }}</td>
              <td class=" text-start pl-3 overflow-hidden text-ellipsis ">{{ user.email }}</td>
              <td class="hidden text-start tablet:table-cell overflow-hidden text-ellipsis">{{ user.designation }}</td>
              <td class="hidden text-star laptop:table-cell">{{ user.createdAt }}</td>
              <td class="text-xs font-semibold" >
                <span class="px-2 py-1 rounded" :class="user.status.key === 0 ? 'bg-red-50 text-red-500': 'bg-green-50 text-green-500'">{{ user.status.name }}</span>
              </td>
              <td class="text-center">
                <font-awesome :icon="'eye'" class="text-slate-800 cursor-pointer text-lg px-2" @click="fnShowModal(user)"/>
              </td>
            </tr>

          </tbody>
        </table>

        <div class="absolute w-full  top-0 text-center bg-black/10 h-full flex justify-center items-center rounded-lg" v-if="blnLoading">
          <Loading class="bg-slate-50 rounded-lg px-6 py-4"></Loading>
        </div>

        <div v-if="!arrUsers.length && !blnLoading" class="text-center">
          <p class="py-3 px-2">No data to show</p>
        </div>
  
      </div>

      <UserDetailsModal v-if="blnShowModal" :arr-designations="arrDesignations" :obj-user-details="objUserDetails" @close-modal="blnShowModal = false" @user-update="fnUserUpdate"></UserDetailsModal>

      <Pagination :total-data="numTotalUsers" :current-page="numCurrentPage" :page-cursor="numPageCursor" @set-page="fnSetPage" ></Pagination>

      <Notification v-if="objNotif.show" :bln-show-notif="objNotif.show" :message="objNotif.message" :is-success="objNotif.success" @closeNotif="()=> objNotif.show = false"></Notification>
    </div>



  </div>
</template>

<script setup>

import UserDetailsModal from '../../components/Users/UserDetailsModal.vue'
import PageHeader from '../../components/General/PageHeader.vue'
import fetch from '../../api/fetch'

definePageMeta({
  middleware: ['auth'],
  layout: 'main-layout'
})

const route = useRoute()

const blnLoading = ref(false)
const blnShowModal = ref(false)

const strSearch = ref('')

const numCurrentPage = ref(1)
const numPageCursor = ref(0)
const numTotalUsers = ref(0)

const objQuery = ref({})
const objUserDetails = ref({})
const objNotif = ref({
  show: false,
  message: '',
  success: false
})

const arrUsers = ref([])
const arrDesignations = ref([])

const config = useRuntimeConfig()

console.log(`${config.public.server_url}/users`)

const fnShowErrorNotif = (message) => {
  console.log('erer')
  objNotif.value = {
    show: true,
    message,
    success: false
  }
  blnLoading.value = false

}


//emits functions
const fnUserUpdate = (response) => {
  objNotif.value = {
    show : true,
    message: response.message,
    success: response.success
  }
  fnFetchData()
}


const fnSetPage = (page,cursor) => {
  console.log('dev',page,cursor)
  numCurrentPage.value = page
  numPageCursor.value = cursor
  fnFetchData()
}
//end emits

const fnShowModal = (user) => {
  objUserDetails.value = user
  blnShowModal.value = true
}


const fnSearch = () => fnFetchData()

watch(strSearch,(search, prevChar) => (search === '' && prevChar !== ' ') && fnFetchData() ) 

const fnSetPageQuery = () => {
  route.query.search && (objQuery.value.search = route.query.search, strSearch.value = route.query.search)
  if(route.query.page){
    numCurrentPage.value = route.query.page > 5 ? 5 : parseInt(route.query.page)
    numPageCursor.value = route.query.page > 5 ? parseInt(route.query.page) - 5 : 0
  } 
  fnFetchData()
}


const fnFetchData = async () => {

  if(strSearch.value !== '') objQuery.value.search = strSearch.value
  else delete objQuery.value.search
  objQuery.value.page =  numCurrentPage.value + numPageCursor.value

  navigateTo({
    path: '/users',
    query: objQuery.value
  })

  blnLoading.value = true
  const {data, error_response} = await fetch.get(`${config.public.server_url}/users`, objQuery.value)
  if (error_response) {
    fnShowErrorNotif(error_response)
    return
  }
  arrUsers.value = data.users
  numTotalUsers.value = data.total_users
  blnLoading.value = false
}

const fnGetDesignations = async () => {
  const {data, error_response} = await fetch.get(`${config.public.server_url}/designations/active`)
  if(error_response) {
    fnShowErrorNotif(error_response)
    return
  }
  arrDesignations.value = data
}

onMounted(() => {
  fnGetDesignations()
  fnSetPageQuery()
})

</script>

<style lang="scss" scoped>

</style>