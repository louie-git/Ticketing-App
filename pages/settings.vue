<template>
  <div class="flex flex-col h-[88vh]">
    <PageTitle page-title="Settings"/>
    
    <PageHeader>
        <div class="w-full h-full items-end flex ">
          <div class="flex gap-3">
            <button class="
            px-2 
            py-1 
            rounded-md 
            font-semibold 
            transition-colors 
            duration-300
            text-sm
            laptop:text-base
            shadow-md
            "
            :class="btn.isActive ? 'bg-indigo-950 text-white hover:bg-indigo-950/80' : 'bg-gray-100 hover:bg-gray-200'"
            v-for="(btn, index) in arrActionBtns"
            @click="fnActiveBtn(index)"
            >
              {{ btn.name }}
            </button>

          </div>

        </div>
    </PageHeader>



    <div class="flex-1 overflow-y-auto border rounded-md w-full laptop:w-[40rem] p-2">

      <div class="p-2 flex flex-col">

        <div class="flex justify-between h-10 items-center px-2">
          <p class="font-bold text-lg">{{ strCurrentFilter }}</p>
          <button class="flex items-center gap-2 border px-2 py-1 rounded-md text-white bg-indigo-950 text-xs tablet:text-sm" @click="blnToggleAddBtn = !blnToggleAddBtn">
            <font-awesome :icon="blnToggleAddBtn ? 'xmark' : 'plus'" class="text-lg "/>
            <p>{{ blnToggleAddBtn ? 'Cancel': 'Add new' }}</p>
          </button>
        </div>

        <div class="px-2 w-full flex flex-col gap-2 tablet:flex-row tablet:items-center  transition-all duration-300 overflow-hidden" :class="blnToggleAddBtn ? 'h-20 tablet:h-14': 'h-0'">
          <input class="border  rounded-md px-2 w-full tablet:w-60 min-h-10" type="text" placeholder="Enter name" >
          <button class="text-xs text-white bg-indigo-950 tablet:text-sm w-40 px-2 min-h-7  py-1 rounded-md mx-auto 
          tablet:mx-0 
          tablet:w-auto
          tablet:h-10
          ">Save</button>
        </div>
        
        <div class="mt-4 flex flex-col text-sm laptop:text-base overflow-y-auto gap-2 px-2]">

          <div class="min-h-10 flex justify-between px-2 items-center tablet:min-h-12 border rounded-md" v-for="i in 12">
            <p class="font-semibold">Content</p>
            <div class="flex gap-2 font-semibold">
              <button class="px-2 py-1 rounded-md hover:bg-indigo-50 text-indigo-400">Edit</button>
              <button class="px-2 py-1 rounded-md hover:bg-red-50 text-red-600">Delete</button>
            </div>
          </div>
          
          
        </div>
        
      </div>

  
      <Notification v-if="blnShowNotif" :message="strNotifMessage" :is-success="blnRequestSuccess" @closeNotif="()=> blnShowNotif = false"></Notification>
    </div>

  </div>
</template>

<script setup>

import PageHeader from '../../components/General/PageHeader.vue'

definePageMeta({
  layout: 'default1'
})

const config = useRuntimeConfig()
const user = ref({})

const blnShowNotif = ref(false)
const strNotifMessage = ref('')
const blnRequestSuccess = ref()
const blnToggleAddBtn = ref(false)


const strCurrentFilter = ref('Designations')

const status = ref('')
const priority = ref('')
const categoryName = ref('')


const arrActionBtns = ref([
  {
    name: 'Designations',
    isActive: true,
    uri: '/designation'
  },
  {
    name: 'Categories',
    isActive: false,
    uri: '/categories'
  }
])

console.log(`${config.public.server_url}/users`)

const createUser = async() => {
  try {
    const response = await $fetch(`${config.public.server_url}/users`, {
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
    blnRequestSuccess.value = false
  }
}


const createStatus = async() => {
  try {
    const response = await $fetch(`${config.public.server_url}/status`, {
      method: 'post',
      headers: {
       'Content-type' : 'application/json', 
      },
      body: JSON.stringify({
        status: status.value
      })
    })
    console.log(response)
    blnShowNotif.value = true
    strNotifMessage.value = response.message
    blnRequestSuccess.value = true

  } catch (error) {
    console.log(error)
    blnShowNotif.value = true
    strNotifMessage.value = 'Error while creating status.'
    blnRequestSuccess.value = false

  }
}

const createPriority = async() => {
  try {
    const response = await $fetch(`${config.public.server_url}/priorities`, {
      method: 'post',
      headers: {
       'Content-type' : 'application/json', 
      },
      body: JSON.stringify({
        priority: priority.value
      })
    })
    console.log(response)
    blnShowNotif.value = true
    strNotifMessage.value = response.message
    blnRequestSuccess.value = true

  } catch (error) {
    console.log(error)
    blnShowNotif.value = true
    strNotifMessage.value = 'Error while creating status.'
    blnRequestSuccess.value = false
  }


}
const fnActiveBtn = (btnIndex) => {

  arrActionBtns.value = arrActionBtns.value.map((btn, index) => {
    if(index === btnIndex) {
      strCurrentFilter.value = btn.name
      btn.isActive = true 
    }
    else {
      btn.isActive = false
    }
    return btn
  })
}


const createCategory = async () => {
  try {
    const response = await $fetch(`${config.public.server_url}/categories`,{
      method: 'post',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        category: categoryName.value ,
      })
    })
    console.log(response)
    blnShowNotif.value = true
    strNotifMessage.value = response.message
    blnRequestSuccess.value = true
  } catch (error) {
    console.log(error)
    blnShowNotif.value = true
    strNotifMessage.value = 'Error while creating category.'
    blnRequestSuccess.value = false
  }
}



</script>

<style lang="scss" scoped>

</style>