<template>
  <div>
    <PageTitle page-title="Settings"/>

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
    </div>

    <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false"></Notification>

  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const user = ref({})

const blnShowNotif = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()


console.log(`${config.public.server_url}/api/users`)

const createUser = async() => {
  try {
    const response = await $fetch(`${config.public.server_url}/api/users`, {
      method: 'post',
      headers: {
       'Content-type' : 'application/json', 
      },
      body: JSON.stringify(user.value)
    })
    console.log(response)

    blnShowNotif.value = true
    strNotifMessage.value = response.message
    blnRequestSuccess.value = true

  } catch (error) {
    console.log(error)
    blnShowNotif.value = true
    strNotifMessage.value = 'Error while creating user.'
  }
}

</script>

<style lang="scss" scoped>

</style>