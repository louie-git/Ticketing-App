<template>
  <div class="">

    <PageTitle page-title="My Tickets"/>

    <div class="h-20 flex justify-end bg-indigo-50 rounded-md items-end p-2 shadow-md mt-5">
      <button class="px-4 h-10  bg-indigo-950 rounded-md font-semibold text-slate-50 hover:opacity-85 duration-200" @click="toggleForm">{{ addTicketText }}</button>
    </div>

    <div class="mt-10">
      <TicketTable></TicketTable>
      <Pagination></Pagination>
    </div>


    <AddTicketModal v-if="blnShowTicketModal" @close-modal="blnShowTicketModal=false" :arr-categories="arrCategories" @notification="fnNotification"></AddTicketModal>


    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false" ></Notification>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default1'
})

import AddTicketModal from '../components/Modals/AddTicketModal.vue'
import getFetch from '../../fetch/getFetch.js'



const config = useRuntimeConfig()
const blnShowTicketModal = ref(false)
const addTicketText = ref('Add Ticket')
const blnShowNotif = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()
const arrCategories = ref([])


const fnNotification = (response) => {
  
  console.log('fs', response)
  blnShowNotif.value = true
  blnShowNotif.value = response.showNotif
  strNotifMessage.value = response.notifMessage
  blnRequestSuccess.value = response.requestSuccess
}

const toggleForm = () =>  {
  blnShowTicketModal.value = !blnShowTicketModal.value
  blnShowTicketModal.value ?  addTicketText.value ='Add Ticket' : addTicketText.value = 'Close'
}


const fnFetchCategories = async () => {
  console.log('sdf')
  const {data, message, response_error} = await getFetch(`${config.public.server_url}/categories`)
  arrCategories.value = data
  console.log(data)
  console.log(arrCategories)
}

onMounted(() => {
  fnFetchCategories()
})


</script>

<style lang="scss" scoped>

</style>