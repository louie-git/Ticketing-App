<template>
  <div class="px-3 mt-5">
    <button class="px-4 py-1 bg-indigo-950 rounded-md font-semibold text-slate-50 hover:opacity-85 duration-200" @click="toggleForm">{{ addTicketText }}</button>
    <div class="">
      <!-- <div class="my-4 transition-all duration-150" :class="{'hidden' : hideForm}" > -->
      <div class="my-4 transition-all duration-500 ease-in-out overflow-hidden" :class="hideForm ? 'h-0 opacity-0' : 'h-96 opacity-100'">
        <!-- <div class="bg-red-100 h-20 w-36 transition-all duration-300 hover:w-80 "> </div> -->
        <form @submit.prevent="submitTicket()" >
          <input class="border-2 h-10 rounded-md outline-none px-2 block w-full" type="text" placeholder="Category" v-model="ticket.category">
          <textarea class="border-2 p-2 rounded-md outline-none w-full h-36  mt-1 resize-none" name="" placeholder="Add Description" v-model="ticket.description"></textarea>
          <div class="h-36 border-2 rounded-md flex flex-col items-center justify-center">
            <img class="w-10" src="~assets/icons/upload.png" alt="upload">
            <p>Drag file/s to upload or <span class="text-blue-500 cursor-pointer hover:text-blue-800">Browse</span></p>
          </div>
          <div class="my-2 flex justify-end gap-x-2">
            <input class="px-4 py-1 bg-blue-950 rounded-md font-semibold text-slate-50 hover:opacity-85 duration-200" type="button" value="Clear" >
            <input class="px-4 py-1 bg-blue-950 rounded-md font-semibold cursor-pointer text-slate-50 hover:opacity-85 duration-200" type="submit" value="Submit" >
          </div>
        </form>
      </div>
      <div class="mt-3">
        <TicketCards></TicketCards>
      </div>
    </div>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false"></Notification>
  </div>
</template>

<script setup>

const hideForm = ref(true)
const addTicketText = ref('Add Ticket')
const ticket = ref({})
const blnShowNotif = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()


const toggleForm = () =>  {
  hideForm.value = !hideForm.value
  hideForm.value ?  addTicketText.value ='Add Ticket' : addTicketText.value = 'Close'
}

const submitTicket = async () => {

  try {
    const res = await fetch('http://localhost:8001/api/tickets',{ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket.value)
    })
    console.log(res)
    if( res.status !== 200 ) throw ({name: 'Response', message: 'Failed to create ticket'})
    const data = await res.json()
    blnShowNotif.value = true
    strNotifMessage.value = data.message
    blnRequestSuccess.value = true
  } catch (error) {
    blnShowNotif.value = true
    blnRequestSuccess.value = false
    strNotifMessage.value = 'Error while posting ticket.'
  }

}

</script>

<style lang="scss" scoped>

</style>