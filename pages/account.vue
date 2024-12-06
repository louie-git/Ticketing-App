<template>
  <div>
    <PageTitle page-title="Account"/>

    <div class="border p-3 rounded-md flex flex-col justify-center items-center gap-4 text-sm 
    mt-10
    shadow-md
    tablet:items-start
    tablet:justify-normal
    laptop:w-[45rem]
    "
    >
      <div class="w-20 h-20 tablet:w-24  tablet:h-24 rounded-full overflow-hidden shadow-md border-2 border-gray-800 content-center">
        <!-- <img src="~assets/images/cat3.jpg" alt="" class="w-full h-full object-cover"> -->
        <font-awesome :icon="'user'" class="w-full h-3/5 text text-gray-800"/>
      </div>


      <div class="flex flex-col gap-2 p-2 rounded-md text-gray-500 w-full">
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">Last Name</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ stringChecker(objAuthUser.last_name) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">First Name</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ stringChecker(objAuthUser.first_name) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">Middle Name</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ stringChecker(objAuthUser.middle_name) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">Email</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ stringChecker(objAuthUser.email) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">Designation</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ stringChecker(objAuthUser.designation.name) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <p class="col-span-2">Date Created</p>
          <p class="col-span-4 overflow-hidden text-ellipsis">{{ dateFormat(objAuthUser.createdAt) }}</p>
        </div>
      </div>
      <div class="w-full  p-2 flex flex-col">

        <div class="">
          <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="blnShowChangePassword = !blnShowChangePassword">
            <font-awesome v-if="blnShowChangePassword" :icon="'xmark'" class="text-sm pr-1"/>
            <font-awesome v-else :icon="'pencil'" class="text-sm pr-1"/>
            <span v-if="blnShowChangePassword">Cancel</span>
            <span v-else>Change Password</span>
          </button>
        </div>

        <div class="flex flex-col gap-2 w-56 transition-all duration-300 overflow-hidden" :class="blnShowChangePassword ? 'mt-4 h-72' : 'h-0'">
          
          
          <div class="flex items-center justify-between border rounded-md px-1">
            <input class="focus:outline-none p-1 rounded-md" 
            :type="objShowPassword.current ? 'text' : 'password'" 
            v-model="strCurrentPassword" 
            placeholder="Enter current password"
            >
            <font-awesome :icon=" objShowPassword.current ? 'eye-slash' : 'eye'" class="text-sm" @click="objShowPassword.current = !objShowPassword.current"/>
          </div>

          <div class="flex items-center justify-between border rounded-md px-1">
            <input 
            class="focus:outline-none p-1  rounded-md" 
            :type="objShowPassword.new ? 'text' : 'password'" 
            v-model="strNewPassword" 
            placeholder="Enter new password" 
            >
            <font-awesome :icon=" objShowPassword.new ? 'eye-slash' : 'eye' " class="text-sm" @click="objShowPassword.new = !objShowPassword.new"/>
          </div>

          <div class="flex items-center justify-between border rounded-md px-1"
           :class="!objPasswordCheck.confirmed ? 'border-red-600' : ''"
          >
          <input 
            class="focus:outline-none p-1 rounded-md" 
            :type="objShowPassword.confirm ? 'text' : 'password'"  
            v-model="strConfirmPassword" 
            placeholder="Confirm password" 
            >
            <font-awesome  :icon=" objShowPassword.confirm ? 'eye-slash' : 'eye'" class="text-sm" @click="objShowPassword.confirm = !objShowPassword.confirm"/>
          </div>
          
          <div class="text-xs flex flex-col" >
            <!-- <p :class="!objPasswordCheck.matched ? 'text-green-500' : 'text-red-600' " >New password should not be old password</p> -->
            <p :class="objPasswordCheck.special ? 'text-green-500' : 'text-red-600' " >Must have special character</p>
            <p :class="objPasswordCheck.length ? 'text-green-500' : 'text-red-600' " >At least 8 characters</p>
            <p :class="objPasswordCheck.uppercase ? 'text-green-500' : 'text-red-600' " >Must contain uppercase</p>
          </div>
          <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85 disabled:cursor-not-allowed" :disabled="fnVerifyInputs()" @click="fnUpdatePassword">Update</button>
          
          <div class="px-2 text-center">
            <p class="text-sm" :class="objUpdatePasswordStatus.success ? 'text-green-500': 'text-red-500'">{{ objUpdatePasswordStatus.message }}</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>


import stringChecker from '../helpers/checker/stringCheck.js'
import auth from '../api/auth'
import fetch from '../api/fetch'
import dateFormat from '~/helpers/dateFormat.js'

definePageMeta({
  middleware: ['auth'],
  layout: 'main-layout'
})

let format =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
let uppercaseFormat = /[A-Z]/

const objAuthUser = ref(auth.get().user)
const config = useRuntimeConfig()

const blnShowChangePassword = ref(false)
const strCurrentPassword = ref('')
const strNewPassword = ref('')
const strConfirmPassword = ref('')

const objUpdatePasswordStatus = ref({
  success: true,
  message: ''
})

const objPasswordCheck = ref({
  // matched: true,
  special: false,
  length: false,
  uppercase: false,
  confirmed: true
})
const objShowPassword = ref({
  current : false,
  new: false,
  confirm: false
})

const fnVerifyInputs = () => {
  
  const values = Object.values(objPasswordCheck.value) //Get the values from the object
  let truthy = values.find(value => !value ) // Verifies if object has a false value and it returns it. If not then undefined is returned.
  // Returns the value to dissable the buttons
  if(truthy === undefined) return false 
  else return true
}


const fnUpdatePassword = async () => {
  const {response, error_response} = await fetch.post(`${config.public.server_url}/users/change-password`, {
    current_password: strCurrentPassword.value,
    password: strNewPassword.value,
    confirm_password: strConfirmPassword.value
  })
  if(error_response){
    objUpdatePasswordStatus.value = {
      success: false,
      message: error_response
    }
    return
  }
  objUpdatePasswordStatus.value = {
    success: true,
    message: response
  }
}


watch( strNewPassword, (val) => {
  // val === strCurrentPassword.value ? objPasswordCheck.value.matched = true: objPasswordCheck.value.matched = false // Check if old pass is same with new pass
  format.test(val) ? (objPasswordCheck.value.special = true ) : (objPasswordCheck.value.special = false) // Check for special characters
  val.length >= 8 ? objPasswordCheck.value.length = true : objPasswordCheck.value.length = false // Check if string is morethan or equal to 8
  uppercaseFormat.test(val) ? objPasswordCheck.value.uppercase = true : objPasswordCheck.value.uppercase = false // Check if password has uppercase
})

watch(strConfirmPassword, (val)=>{
  val === strNewPassword.value ? objPasswordCheck.value.confirmed = true : objPasswordCheck.value.confirmed = false
})








</script>

<style lang="scss" scoped>

</style>