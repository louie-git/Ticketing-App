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



    <div class="relative flex-1 overflow-y-auto  border rounded-md w-full laptop:w-[40rem] p-2">

      <div class="p-2 flex flex-col">

        <div class="flex justify-between h-10 items-center px-2">

          <div class="flex gap-2 items-center">
            <p class="font-bold text-lg">{{ strCurrentFilter }} </p>
            <div v-if="blnLoading" class="w-6 h-6 rounded-full border-4 border-indigo-100 border-t-indigo-950 animate-spin w-" ></div>
          </div>

          <button class="flex items-center gap-2 border px-2 py-1 rounded-md text-white bg-indigo-950 text-xs tablet:text-sm" @click="blnToggleAddBtn = !blnToggleAddBtn">
            <font-awesome :icon="blnToggleAddBtn ? 'xmark' : 'plus'" class="text-lg "/>
            <p>{{ blnToggleAddBtn ? 'Cancel': 'Add new' }}</p>
          </button>
        </div>

        <form @submit.prevent="fnPostData">
          <div class="px-2 w-full flex flex-col gap-2 tablet:flex-row tablet:items-center  transition-all duration-300 overflow-hidden " :class="blnToggleAddBtn ? 'h-20 tablet:h-14': 'h-0'">
            <input 
            class="
            border  
            rounded-md 
            px-2 
            w-full 
            tablet:w-60 
            min-h-10 
            focus:outline-none
            " 
            :class="blnInputError && 'border-red-500'" 
            type="text" 
            placeholder="Enter name" 
            v-model="strNewData" 
            @focus="blnInputError = false"
            >
            <input 
            class="
            text-xs 
            text-white 
            bg-indigo-950 
            tablet:text-sm 
            w-40 
            px-2 
            min-h-7  
            py-1 
            rounded-md 
            mx-auto 
            tablet:mx-0 
            tablet:w-auto
            tablet:h-10
            "
            type="submit"
            value="Save"
            >
          </div>
        </form>
        
        <div class="mt-4 flex flex-col text-sm laptop:text-base overflow-y-auto gap-2 px-2] ">

          <p v-if="!arrData.length" class="py-3 px-2 text-center">No data to show</p>

          <div v-else class="min-h-10 flex px-2 items-center tablet:min-h-12 border rounded-md" v-for="data in arrData" :key="data.key">
            
            <div v-if="numDataKey === data.key" class="flex justify-between w-full h-full items-center">
              <div>
                <input class="focus:outline-none" type="text" v-model="strUpdateData" :placeholder="data.name" >
              </div>
              <div class="flex gap-2">
                <!-- <button class="px-2 py-1 rounded-md hover:bg-red-50 text-red-600" @click="numDataKey = -1">Cancel</button>
                <button class="px-2 py-1 rounded-md hover:bg-green-50 text-green-600">Save</button> -->
                <button class="" @click="numDataKey = -1">
                  <font-awesome :icon="'xmark'" class="text-red-600 rounded-full p-1.5 w-5 h-5 hover:bg-red-50" />
                </button>
                <button class="" @click="fnUpdateData">
                  <font-awesome :icon="'check'" class="text-green-600 rounded-full p-1.5 w-5 h-5 hover:bg-green-50" />
                </button>
              </div>
            </div>

            <div v-else class="flex justify-between w-full h-full items-center ">
              <p class="font-semibold">{{ data.name }}</p>
              <div class="flex font-semibold">
                <div class="text-center">
                  <button class="px-2 py-1 rounded-md hover:bg-blue-50 text-blue-600" @click="numDataKey = data.key">edit</button>
                </div>
                <div class="w-20 text-center">
                  <button 
                  class="px-2 py-1 rounded-md" 
                  :class="data.is_active ? 'hover:bg-green-50 text-green-600': 'hover:bg-red-50 text-red-600'" @click="fnToggleActiveStatus(data.key)">{{ data.is_active ? 'active' : 'inactive' }}</button> 
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>

      <Notification v-if="objNotif.show" :bln-show-notif="objNotif.show" :message="objNotif.message" :is-success="objNotif.success" @closeNotif="()=> objNotif.show = false"></Notification>
    </div>
  </div>
</template>

<script setup>

import PageHeader from '../../components/General/PageHeader.vue'
import fetch from '../api/fetch'

definePageMeta({
  middleware: ['auth'],
  layout: 'main-layout'
})

const config = useRuntimeConfig()


const blnShowNotif = ref(false)
const blnRequestSuccess = ref()
const blnToggleAddBtn = ref(false)
const blnLoading = ref(false)
const blnInputError = ref(false)

const strNotifMessage = ref('')
const strCurrentFilter = ref('')
const strApiEndPoint = ref('')
const strNewData = ref('')
const strUpdateData = ref('')

const numDataKey = ref(-1) // The -1 value is just to reset

const arrData = ref([])

const objNotif = ref({
  show: false,
  message: '',
  success: false
})

const arrActionBtns = ref([
  {
    name: 'Designations',
    isActive: true,
    uri: '/designations'
  },
  {
    name: 'Categories',
    isActive: false,
    uri: '/categories'
  }
])

const fnShowNotif = (message, success = false) => {
  objNotif.value = {
    show: true,
    message,
    success
  }
  blnLoading.value = false
}


const fnPostData = async () => {


  let inputFormat = /\w/

  if(!inputFormat.test(strNewData.value) ) {
    blnInputError.value = true
    return 
  }


  blnLoading.value = true
  const {response , error_response} = await fetch.post(`${config.public.server_url}/${strApiEndPoint.value}`, {name: strNewData.value})
  if(error_response) {
    fnShowNotif(error_response)
    return
  }

  //Append the data to avoid  unnecessary data fetch from the backend
  arrData.value.push({
    key: arrData.value.length + 1,
    name: strNewData.value
  })
  fnShowNotif(response, true)
  strNewData.value = '' //Reset string value when added successfully



}

const fnToggleActiveStatus = async(key) => {

  blnLoading.value = true
  const {response , error_response} = await fetch.patch(`${config.public.server_url}/${strApiEndPoint.value}/active`,{key: key})
  if(error_response) {
    fnShowNotif(error_response)
    return
  }

  //Append the data to avoid  unnecessary data fetch from the backend
  arrData.value = arrData.value.map( data => {
    data.key === key && (data.is_active = !data.is_active)
    return data
  })
  fnShowNotif(response, true)
}

const fnUpdateData = async () => {
  let inputFormat = /\w/

if(!inputFormat.test(strUpdateData.value) ) {
  blnInputError.value = true
  return 
}


blnLoading.value = true
const {response , error_response} = await fetch.patch(`${config.public.server_url}/${strApiEndPoint.value}/${numDataKey.value}`, {name: strUpdateData.value})
if(!response) {
  blnShowNotif.value = true
  strNotifMessage.value = error_response
  blnRequestSuccess.value = false
  blnLoading.value = false
  return
}

//Append the data to avoid  unnecessary data fetch from the backend
arrData.value = arrData.value.map( data => {
  data.key === numDataKey.value && (data.name = strUpdateData.value)
  return data
})
numDataKey.value = -1
strUpdateData.value = '' //Reset string value when updated successfully
blnShowNotif.value = true
strNotifMessage.value = response
blnRequestSuccess.value = true
blnLoading.value = false
}

const fnActiveBtn = (btnIndex = 0) => {
  arrActionBtns.value = arrActionBtns.value.map((btn, index) => {
    if(index === btnIndex) {
      strCurrentFilter.value = btn.name
      strApiEndPoint.value = btn.uri
      btn.isActive = true 
    }
    else btn.isActive = false
    
    return btn
  })
  strNewData.value = '' // reset the value of data. To avoid adding new designation or category
  fnFetchData() 
}





const fnFetchData = async () => {

  blnLoading.value = true
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(),3000)
  // })
  arrData.value = [] //reset value of array
  const { data, error_response } = await fetch.get(`${config.public.server_url}/${strApiEndPoint.value}`)
  if(!data) {
    console.log(error)
    blnShowNotif.value = true
    strNotifMessage.value = error_response
    blnRequestSuccess.value = false
    blnLoading.value = false
    return
  }
  arrData.value = data
  blnLoading.value = false
}

onMounted(() => {
  fnActiveBtn()
})

</script>

<style lang="scss" scoped>
</style>