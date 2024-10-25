<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-900">
    <div class="absolute left-1/2 top-0 border w-7 h-7 bg-red-600 tablet:bg-green-600 laptop:bg-yellow-600 desktop:bg-blue-700 z-50 ">

    </div>

    <div class="
    relative
    w-full 
    h-full
    bg-white
    text-gray-600
    m-auto
    shadow-lg
    rounded-md
    tablet:w-[30rem] 
    tablet:h-[43rem]
    p-2"
    >

   
  
      <div class="w-4/5 mx-auto flex flex-col gap-5 mt-10" v-if="blnSignUpForm">

        <div class="text-center h-36 content-center ">
          <p class="text-xl font-bold">Sign in</p>
        </div>

        <div class="">
          <label for="email"> Email </label>
          <input class="w-full h-10 px-2 focus:outline-none border-b-2 focus:border-b-gray-700"  type="text" id="email" placeholder="Enter your email">
        </div>
  
        <div class="">
          <label for="password"> Password </label>
          <div class="flex items-center border-b-2 px-2">
            <input class="w-full h-10  focus:outline-none "  :type="blnShowPassword ? 'text' : 'password'" id="password" placeholder="Enter your password">
            <font-awesome :icon=" blnShowPassword ? 'eye-slash' : 'eye' " class="text-md " @click="blnShowPassword = !blnShowPassword"/>
          </div>
        </div>
  
        <p class="text-end hover:text-indigo-800 cursor-pointer">Forgot Password</p>
  
        <div>
          <input type="button" value="Sign In" class="w-full h-10 px-2 bg-gray-700 rounded-xl focus:outline-none mt-1 text-white hover:bg-gray-800 font-bold" >
        </div>
  
        <div class="text-center">
          <p>Don't have an account? <span class="font-bold cursor-pointer  hover:text-indigo-800" @click="blnSignUpForm = !blnSignUpForm">Sign Up</span></p>
        </div>
      </div>


      <div class="w-4/5 mx-auto flex flex-col gap-3 mt-10 " v-else>

        <div class="text-center mb-5">
          <p class="text-xl font-bold">Sign Up form</p>
        </div>

        <div class="">
          <label for="email"> Email <span class="text-red-600">*</span> </label>
          <input 
          class="w-full h-8 focus:outline-none border-b-2 focus:border-b-gray-700" 
          :class="objUserDetailsVerified.email || 'border-b-red-600'" 
          type="email" 
          id="email" 
          placeholder="Enter your email"
          v-model="objUserDetails.email"
          >
        </div>
        
        <div class="">
          <label for="fname"> First Name <span class="text-red-600">*</span></label>
          <input 
          class="w-full h-8 focus:outline-none border-b-2 focus:border-b-gray-700" 
          :class="objUserDetailsVerified.first_name || 'border-b-red-600'"  
          type="text" 
          id="fname" 
          placeholder="Enter your first name"
          v-model="objUserDetails.first_name"
          >
        </div>
  
        <div class="">
          <label for="lname"> Last Name <span class="text-red-600">*</span></label>
          <input 
          class="w-full h-8 focus:outline-none border-b-2 focus:border-b-gray-700" 
          :class="objUserDetailsVerified.last_name || 'border-b-red-600'"  
          type="text" 
          id="lname" 
          placeholder="Enter your middle name"
          v-model="objUserDetails.last_name"
          >
        </div>

        <div class="">
          <label for="password"> Password <span class="text-red-600">*</span> </label>
          <div class="flex items-center border-b-2" :class="objUserDetailsVerified.password || 'border-b-red-600'" >
            <input 
            class="w-full h-8  focus:outline-none "   
            :type="blnShowSignUpPassword ? 'text' : 'password'" 
            id="password" 
            placeholder="Enter your password"
            v-model="objUserDetails.password"
            >
            <font-awesome :icon=" blnShowSignUpPassword ? 'eye-slash' : 'eye' " class="text-md " @click="blnShowSignUpPassword = !blnShowSignUpPassword"/>
          </div>
        </div>

        <div class="">
          <label for="confirmPass"> Confirm Password <span class="text-red-600">*</span></label>
          <div class="flex items-center border-b-2" :class="objUserDetailsVerified.confirm_password || 'border-b-red-600'">
            <input 
            class="w-full h-8  focus:outline-none "   
            :type="blnShowSignUpConfirmPassword ? 'text' : 'password'" 
            id="password" 
            placeholder="Confirm password"
            v-model="objUserDetails.confirm_password"
            >
            <font-awesome :icon=" blnShowSignUpConfirmPassword ? 'eye-slash' : 'eye' " class="text-md " @click="blnShowSignUpConfirmPassword = !blnShowSignUpConfirmPassword"/>
          </div>
        </div>
        
        <div>
          <input type="button" value="Sign Up" class="w-full h-10 px-2 bg-gray-700 rounded-xl focus:outline-none mt-1 text-white hover:bg-gray-800 font-bold cursor-pointer" @click="fnSignUp">
        </div>
        
        <div class="text-center">
          <p>Already have an account? <span class="font-bold cursor-pointer  hover:text-indigo-800" @click="blnSignUpForm = !blnSignUpForm">Sign In</span></p>
        </div>

        <div class="text-center">
          <p v-if="strSignupError != ''" class="text-red-600 text-sm font-semibold">{{ strSignupError }}</p>
          <p v-if="strSingUpSuccess != ''" class="text-green-400 text-sm font-semibold" >{{ strSingUpSuccess }}</p>          
          <div v-if="blnLoading" class="mx-auto">
            <Loading></Loading>
          </div>
        </div>

 
  
      </div>


    </div>

   
  </div>
</template>

<script setup>

import fetch from '../api/fetch'

const config = useRuntimeConfig()

const blnSignUpForm = ref(false) //set this back to true

const blnShowPassword = ref(false)

const blnShowSignUpPassword = ref(false)
const blnShowSignUpConfirmPassword =  ref(false)
const blnLoading = ref(false)

const strSignupError = ref('')
const strSingUpSuccess = ref('')

const objUserDetails = ref({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirm_password: ''

})

const objUserDetailsVerified = ref({
  email: true,
  first_name: true,
  last_name: true,
  password: true,
  confirm_password: true
})

let format =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
let uppercaseFormat = /[A-Z]/

const fnSignUp = async () => {

  const keys = Object.keys(objUserDetails.value)

  console.log(objUserDetails.value)
  keys.forEach(key => {
    objUserDetailsVerified.value[key] = objUserDetails.value[key] === '' || objUserDetails.value[key] === ' ' ?  false : true
  })

  if(objUserDetails.value.password !== objUserDetails.value.confirm_password){
    objUserDetailsVerified.value.confirm_password = false
    strSignupError.value = 'Password not match'
  }

  if(!format.test(objUserDetails.value.password)) {
    objUserDetailsVerified.value.confirm_password = false
    strSignupError.value = 'Password must contain special character'
  } // Check for special characters
  if(objUserDetails.value.password.length < 8){
    objUserDetailsVerified.value.confirm_password = false
    strSignupError.value = 'Password must have at least 8 characters'
  } // Check if string is morethan or equal to 8
  if(!uppercaseFormat.test(objUserDetails.value.password)) {
    objUserDetailsVerified.value.confirm_password = false
    strSignupError.value = 'Password must contain uppercase character'
  }// Check if password has uppercase

  setTimeout(() => strSignupError.value = '', 5000)

  if(keys.find( key => !objUserDetailsVerified.value[key]) !== undefined) return 

  try {
    const {response, error_response} = await fetch.post(`${config.public.server_url}/users/sign-in`, objUserDetails.value)
    console.log(error_response)
    if(!response) return strSignupError.value = error_response
    strSingUpSuccess.value = response
  } catch (error) {
    console.log(error)
    strSignupError.value = 'Something went wrong'
  } finally {
    setTimeout(() =>{
       strSignupError.value = ''
       strSingUpSuccess.value = ''
    }, 5000)
  }
}


</script>

<style lang="scss" scoped>

</style>