<template>
  <div>
    <PageTitle page-title="Users"/>






    <PageHeader>
        <div class="h-full w-full flex justify-center items-end tablet:justify-end">
          <form @submit.prevent="fnSearch">
            <div class="flex justify-between items-center border rounded-md h-10 bg-white max-w-96 tablet:max-w-80 w-full">
              <input class="outline-none py-1 px-2  " type="text" placeholder="Search..." v-model="strSearch">
              <font-awesome :icon="'magnifying-glass'" class="text-slate-800 text-xl px-2" @click="fnSearch"/>
            </div>
          </form>
        </div>
    </PageHeader>





    <div class="">
<!-- 
      <div class="mt-5">
        <p class="text-lg font-semibold">Invite Developer</p>
        <form @submit.prevent="createUser">
          <div class="">
            <input class="block mb-2" type="text" placeholder="Enter Email" v-model="user.email">
            <input class="block mb-2" type="text" placeholder="First Name" v-model="user.first_name">
            <input class="block mb-2" type="text" placeholder="Last Name" v-model="user.last_name">
            <input class="bg-indigo-950 hover:opacity-80 p-2 rounded-md text-white transition-all duration-300" type="submit" value="Invite">
          </div>
        </form>
      </div> -->
  


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
              <td class="text-start">{{ user.status }}</td>
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

      <UserDetailsModal v-if="blnShowModal" :obj-user-details="objUserDetails" @close-modal="blnShowModal = false" @user-update="fnUserUpdate"></UserDetailsModal>

      <Pagination :total-data="numTotalUsers" :current-page="numCurrentPage" :page-cursor="numPageCursor" @set-page="fnSetPage" ></Pagination>

      <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false"></Notification>
    </div>



  </div>
</template>

<script setup>

import getFetch from '../../fetch/getFetch'
import UserDetailsModal from '../../components/Users/UserDetailsModal.vue'
import PageHeader from '../../components/General/PageHeader.vue'

definePageMeta({
  layout: 'default1'
})

const route = useRoute()


const blnShowNotif = ref(false)
const blnLoading = ref(false)
const blnRequestSuccess = ref()
const blnShowModal = ref(false)

const strNotifMessage = ref('')
const strSearch = ref('')

const numCurrentPage = ref(1)
const numPageCursor = ref(0)
const numTotalUsers = ref(0)

const objQuery = ref({})
const objUserDetails = ref({})

const arrUsers = ref([])

const config = useRuntimeConfig()


console.log(`${config.public.server_url}/users`)


const fnShowModal = (user) => {
  objUserDetails.value = user
  blnShowModal.value = true
  
}

const fnSetPage = (page,cursor) => {
  console.log('dev',page,cursor)
  numCurrentPage.value = page
  numPageCursor.value = cursor
  fnFetchData()
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


const fnUserUpdate = (response) => {
  blnShowNotif.value = true
  strNotifMessage.value = response.message
  blnRequestSuccess.value = response.success
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
  const {data, message} = await getFetch(`${config.public.server_url}/users`, objQuery.value)
  if (!data) {
    blnShowNotif.value = true
    blnLoading.value = false
    strNotifMessage.value = message
    blnRequestSuccess.value = false
  }
  arrUsers.value = data.users
  numTotalUsers.value = data.total_users
  blnLoading.value = false
}

onMounted(() => {
  fnSetPageQuery()
})

</script>

<style lang="scss" scoped>

</style>