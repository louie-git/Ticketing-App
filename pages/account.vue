<template>
  <div>
    <PageTitle page-title="Account"/>



    <div class="border p-3 rounded-md flex flex-col justify-center items-center gap-4 text-gray-500 text-sm 
    mt-10
    shadow-md
    tablet:items-start
    tablet:justify-normal
    laptop:w-[45rem]
    "
    >
      <div class="w-28 h-28 bg-red-50 rounded-full overflow-hidden shadow-md">
        <img src="~assets/images/cat3.jpg" alt="" class="w-full h-full object-cover">
      </div>


      <div class="w-full grid grid-cols-6 border rounded-md p-2">
        <div class="col-span-2 flex flex-col gap-2">
          <p>Last Name</p>
          <p>First Name</p>
          <p>Middle Name</p>
          <p>Email</p>
          <p>Designation</p>
          <p>Date Created</p>
        </div>
        <div class="col-span-4 flex flex-col gap-2">
          <p>Arrabis</p>
          <p>Vincent Louie</p>
          <p>Dela Cruz</p>
          <p>vincentla@meditab.com</p>
          <p>Back-end Developer</p>
          <p>Jan 21 2024</p>
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

        <div class="flex flex-col gap-2 w-56 transition-all duration-300 overflow-hidden" :class="blnShowChangePassword ? 'mt-4 h-60' : 'h-0'">
          
          
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
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default1'
})

let format =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
let uppercaseFormat = /[A-Z]/

const blnShowChangePassword = ref(false)
const strCurrentPassword = ref('')
const strNewPassword = ref('')
const strConfirmPassword = ref('')
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
  console.log('here')
}




watch( strNewPassword, (val) => {
  console.log('val', val)
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