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

   
  
      <form @keyup.enter="fnLogin" v-if="blnSignUpForm">
        <div class="w-4/5 mx-auto flex flex-col gap-5 mt-10" >

          <div class="text-center h-36 content-center ">
            <p class="text-xl font-bold">Sign in</p>
          </div>

          <div class="">
            <label for="email"> Email </label>
            <input class="w-full h-10 px-2 focus:outline-none border-b-2 focus:border-b-gray-700"  type="text" id="email" placeholder="Enter your email" v-model="objLogin.email">
          </div>
    
          <div class="">
            <label for="password"> Password </label>
            <div class="flex items-center border-b-2 px-2">
              <input class="w-full h-10  focus:outline-none "  :type="blnShowPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" v-model="objLogin.password">
              <font-awesome :icon=" blnShowPassword ? 'eye-slash' : 'eye' " class="text-md " @click="blnShowPassword = !blnShowPassword"/>
            </div>
          </div>
    
          <p class="text-end hover:text-indigo-800 cursor-pointer">Forgot Password</p>
    
          <div @click="fnLogin">
            <input type="button" value="Sign In" class="w-full h-10 px-2 bg-gray-700 rounded-xl focus:outline-blue-500 mt-1 text-white hover:bg-gray-800 font-bold" >
          </div>
    
          <div class="text-center">
            <p>Don't have an account? <span class="font-bold cursor-pointer  hover:text-indigo-800" @click="blnSignUpForm = !blnSignUpForm">Sign Up</span></p>
            <p class="text-red-600 font-semibold text-sm">{{ strLoginError }}</p>
          </div>
          <div v-if="blnLoading" class="mx-auto">
            <Loading></Loading>
          </div>
          <!-- <div>
            <button @click="fnTokenTest">Token test</button>
          </div> -->
            <div class="flex justify-between">
            <button @click.prevent="fnTokenTest">S3 request</button>
            <!-- <button>Download file</button> -->
            <!-- <a href="https://meditab-lmc-beta.s3.us-east-1.amazonaws.com/670d0199dab0664c04458e57.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASFO6H5UZHSQMUGEK%2F20241115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241115T084552Z&X-Amz-Expires=3600&X-Amz-Signature=ff4b441f1ba07830eab9388953eb0be4c25fdf7e2017769ff9000319dce030a4&X-Amz-SignedHeaders=host&x-id=GetObject" download></a> -->
            <a :href="file" download target="_blank">Click me daddy</a>
          </div>
          <!-- <div>
            <button @click="fnRefreshToken">Refresh test</button>
          </div> -->
        </div>
      </form>


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
          <label for="lname"> Middle Name <span class="text-red-600">*</span></label>
          <input 
          class="w-full h-8 focus:outline-none border-b-2 focus:border-b-gray-700" 
          :class="objUserDetailsVerified.middle_name || 'border-b-red-600'"  
          type="text" 
          id="lname" 
          placeholder="Enter your middle name"
          v-model="objUserDetails.middle_name"
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
import auth from '../api/auth'

definePageMeta({
  middleware: ['auth']
})




const config = useRuntimeConfig()

const inputFormat = /\w/ //Check if input value is empty

const blnSignUpForm = ref(true) //set this back to true

const blnShowPassword = ref(false)

const blnShowSignUpPassword = ref(false)
const blnShowSignUpConfirmPassword =  ref(false)
const blnLoading = ref(false)

const strSignupError = ref('')
const strSingUpSuccess = ref('')
const strLoginError = ref('')
const file = ref('')

const objLogin = ref({
  email: '',
  password: ''
})

const objUserDetails = ref({
  email: '',
  first_name: '',
  last_name: '',
  middle_name:'',
  password: '',
  confirm_password: ''
})

const objUserDetailsVerified = ref({
  email: true,
  first_name: true,
  last_name: true,
  middle_name:true,
  password: true,
  confirm_password: true
})

let format =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
let uppercaseFormat = /[A-Z]/

const fnRefreshToken = async () => {
  try {

    const refreshToken = localStorage.getItem('refreshToken')
    const res = await $fetch(`${config.public.server_auth_url}/auth/refresh-token`,{
      method: 'post',
      headers: {
       'Content-Type': 'application/json'
      },
      body: {refreshToken}
    }) 
    localStorage.setItem('accessToken', res.accessToken)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const fnTokenTest = async () => {
  try {
    // console.log('fsdf')
    // let presignedUrl = "https://meditab-lmc-beta.s3.us-east-1.amazonaws.com/670d0199dab0664c04458e57.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASFO6H5UZHSQMUGEK%2F20241115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241115T084552Z&X-Amz-Expires=3600&X-Amz-Signature=ff4b441f1ba07830eab9388953eb0be4c25fdf7e2017769ff9000319dce030a4&X-Amz-SignedHeaders=host&x-id=GetObject"
    // if (presignedUrl) {
    //   // Create a temporary anchor (<a>) element to trigger the download
    //   const link = document.createElement('a');
    //   link.href = presignedUrl;

    //   // console.log('file name',presignedUrl.split('/').pop())
    //   // Optionally, set the filename (this is optional and can be dynamic)
    //   link.download = presignedUrl.split('/').pop(); // Use the last part of the URL as the filename

    //   // Programmatically click the link to trigger the download
    //   link.click();
    // } else {
    //   console.error('No presigned URL returned');
    //     }

    // const { data } = await fetch.get(`${config.public.server_auth_url}/auth/token`)
    // console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}

const fnLogin = async () => {
  if(!inputFormat.test(objLogin.value.email) || !inputFormat.test(objLogin.value.password)) return strLoginError.value = 'Please input required fields.'
  try {
    blnLoading.value = true
    console.log(objLogin.value)
    const res = await $fetch(`${config.public.server_auth_url}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: objLogin.value
    })
    console.log(res)
    auth.set({access_token: res.accessToken, isAuthenticated: true , routes: res.routes})
    // localStorage.setItem('auth', JSON.stringify({'access_token': res.accessToken, 'isAuthenticated': 'true'}))
    blnLoading.value = false

    let routes = res.routes
    console.log(routes.some(route => route.path === '/dashboard'))
    if(routes.some(route => route.path === '/dashboard')) navigateTo({path: routes[0].path})
    else navigateTo({path: routes[0].path})
    // navigateTo({path:'/dashboard'})
  } catch (error) {
    if(error.status === undefined) strLoginError.value = 'Something went wrong from the request.'
    if(error.status) strLoginError.value = error.data.message
    blnLoading.value = false
  }
}

const fnSignUp = async () => {
  const keys = Object.keys(objUserDetails.value)
  keys.forEach(key => {
    objUserDetailsVerified.value[key] = !inputFormat.test(objUserDetails.value[key]) ?  false : true
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
    blnLoading.value = true
    const res = await $fetch(`${config.public.server_auth_url}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: objUserDetails.value
    })

    strSingUpSuccess.value = res.message

  } catch (error) {
    console.log(error)
    strSignupError.value = 'Something went wrong'
  } finally {
    blnLoading.value = false
    setTimeout(() =>{
       strSignupError.value = ''
       strSingUpSuccess.value = ''
    }, 5000)
  }
}

watch( strLoginError, (val) => {
  setTimeout(() => strLoginError.value = '' , 3000)
} )

</script>

<style lang="scss" scoped>

</style>