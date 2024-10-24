<template>
  <Modal title="User Details" @close-modal="$emit('close-modal')">


    <div class="flex flex-col justify-between w-full h-full px-2 tablet:px-5 py-3 ">

      <div class="flex flex-col gap-4">
        <p class="font-bold text-xl">User Profile</p>
        <div class="flex gap-10 p-5 border rounded-md items-center">
          <div class="w-20 h-20 bg-red-50 rounded-full overflow-hidden">
            <img src="~assets/images/cat1.jpg" alt="User Image" class="object-cover w-full h-full m-auto">
          </div>
        </div>
        
        <div class="border p-5 rounded-md text-xs tablet:text-base">
          <p class="font-bold text-lg">Personal Information</p>
  
          <div class="grid grid-cols-3 mt-4">
  
            <div class="relative col-span-1 flex flex-col gap-3 text-gray-500">
              <p>First Name</p>
              <p>Last Name</p>
              <p>Email</p>
              <p>Designation</p>
              <p>Status</p>
              <div class="absolute border h-full right-2  border-gray-100"></div>
            </div>
  
            <div class="col-span-2 flex flex-col gap-3 text-gray-500">
              <p>{{objUserDetails.first_name}}</p>
              <p>{{objUserDetails.last_name}}</p>
              <p>{{objUserDetails.email}}</p>
              <p v-if="!blnShowEditOpt">{{strDesignation}}</p>
              <Dropdown v-else :options="arrDesignations" :current-value="strDesignation" @update="fnSetDesignation" />
              <p v-if="!blnShowEditOpt">{{ strStatus }}</p>
              <Dropdown v-else :options="arrStatusOpt" :current-value="strStatus" @update="fnSetStatus" /> 
              <!--  <div v-else class="relative w-36 border h-8 rounded-md tablet:w-44">
                <div class="flex justify-between w-full items-center h-full" @click="blnShowDropdownMenu = !blnShowDropdownMenu">
                  <div class="w-full px-2">
                    <p>{{ strStatus }}</p>
                  </div>
                   <font-awesome :icon="'angle-down'" class="px-2 transition-all duration-300" :class="blnShowDropdownMenu && 'rotate-180'" />
                </div>

                 <div class="absolute w-full top-8 rounded-md overflow-hidden transition-all duration-300 border" :class="blnShowDropdownMenu ? 'block': 'hidden'">
                    <p v-for="option in arrStatusOpt" class="px-2 py-1 hover:bg-indigo-50 bg-white" @click="fnSetStatus(option.name)">
                      {{ option.name }}
                    </p>
                 </div>
              </div> -->

            </div>
  
          </div>
        </div>
      </div>

      <div v-if="blnShowEditOpt" class="self-end flex gap-3 ">
        <Loading v-if="blnLoading"></Loading>
        <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="fnCancelEdit()">Cancel</button>
        <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="fnUpdate()">Save</button>
      </div>
      
      <div v-else class=" self-end">
        <button class="px-3 py-1 bg-indigo-950 text-white rounded-md hover:opacity-85" @click="blnShowEditOpt = true">
          <font-awesome :icon="'pencil'" class="text-sm pr-1"/>
            Edit
        </button>
      </div>



    </div>
  </Modal>
</template>

<script setup>
import Modal from '../../components/General/Modal.vue'
import Dropdown from '../../components/General/Dropdown.vue'



const emit = defineEmits(['close-modal','user-update'])
const props = defineProps({
  objUserDetails: {
    type : Object,
    default : {}
  }
})


const config = useRuntimeConfig()
const blnShowEditOpt = ref(false)
const blnLoading = ref(false)

const intStatusKey = ref()
const intDesignationKey = ref()


const objUserDetails = ref(props.objUserDetails)
const objUpdateResponse = ref({})

const strStatus = ref(props.objUserDetails.status)
const strDesignation = ref(props.objUserDetails.designation)

const arrStatusOpt = ref([
  {
    name: 'Pending',
    key: 0
  },
  {
    name: 'Confirmed',
    key: 1
  }
])


const arrDesignations = ref([
  {
    name: 'Back-end Developer',
    key: 0
  },
  {
    name: 'Front-end Developer',
    key: 1
  },
  {
    name: 'User',
    key: 1
  }
])

const fnSetStatus = (data) => {
  strStatus.value = data.name
  intStatusKey.value = data.key

}

const fnSetDesignation = (data) => {
  strDesignation.value = data.name
  intDesignationKey.value = data.key

}

const fnCancelEdit = () => {
  blnShowEditOpt.value = false
  strStatus.value = props.objUserDetails.status
  strDesignation.value = props.objUserDetails.designation

}


const fnUpdate = async () => {
  blnLoading.value = true
  try {
    let res = await $fetch(`${config.public.server_url}/users/${props.objUserDetails._id}/update`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: intStatusKey.value
      })
    })
    objUpdateResponse.value.message = res.message
    objUpdateResponse.value.success = true

  } catch (error) {
    objUpdateResponse.value.message = error.data.message
    objUpdateResponse.value.success = false
  } finally {
    blnLoading.value = false
    emit('user-update', objUpdateResponse.value)
    emit('close-modal')
  }

}

</script>

<style lang="scss" scoped>

</style>