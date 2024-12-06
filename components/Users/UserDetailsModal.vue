<template>
  <Modal title="User Details" @close-modal="$emit('close-modal')">


    <div class="flex flex-col justify-between w-full h-full px-2 tablet:px-5 py-3 ">

      <div class="flex flex-col gap-4">
        <p class="font-bold text-xl">User Profile</p>
        <div class="flex gap-10 p-5 border rounded-md items-center">
          <div class="w-20 h-20 bg-gray-50 rounded-full overflow-hidden content-center border-gray-800 border-2">
            <!-- <img src="~assets/images/cat1.jpg" alt="User Image" class="object-cover w-full h-full m-auto"> -->

            <!-- no image url/source yet -->
            <img v-if="false" src="" alt=""> 
            <font-awesome v-else :icon="'user'" class="w-20 h-11 mx-auto" />
          </div>
        </div>
        
        <div class="border p-2 tablet:p-5 rounded-md text-xs tablet:text-base">
          <p class="font-bold text-lg">Personal Information</p>
  
          <div class="grid grid-cols-3 mt-4">
  
            <div class="relative col-span-1 flex flex-col gap-3 text-gray-500">
              <p>First Name</p>
              <p>Last Name</p>
              <p>Email</p>
              <p>Date Created</p>
              <p>Designation</p>
              <p>Status</p>
              <div class="absolute border h-full right-2  border-gray-100"></div>
            </div>
  
            <div class="col-span-2 flex flex-col gap-3 text-gray-500">
              <p>{{objUserDetails.first_name}}</p>
              <p>{{objUserDetails.last_name}}</p>
              <p>{{objUserDetails.email}}</p>
              <p>{{ dateFormat(objUserDetails.createdAt) }}</p>
              <p v-if="!blnShowEditOpt">{{strDesignation}}</p>
              <Dropdown v-else :options="arrDesignations" :current-value="strDesignation" @update="fnSetDesignation" />
              <p v-if="!blnShowEditOpt">{{ strStatus }}</p>
              <Dropdown v-else :options="arrStatusOpt" :current-value="strStatus" @update="fnSetStatus" /> 
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
import fetch from '../../api/fetch'
import dateFormat from '~/helpers/dateFormat.js'

const emit = defineEmits(['close-modal','user-update'])
const props = defineProps({
  objUserDetails: {
    type : Object,
    default : {}
  },
  arrDesignations: {
    type: Array,
    default: []
  }
})


const config = useRuntimeConfig()
const blnShowEditOpt = ref(false)
const blnLoading = ref(false)

const intStatusKey = ref()
const intDesignationKey = ref()


const objUserDetails = ref(props.objUserDetails)
const objUpdateResponse = ref({})

const strStatus = ref(props.objUserDetails.status.name)
const strDesignation = ref(props.objUserDetails.designation)

const arrStatusOpt = ref([
  {
    name: 'Inactive',
    key: 0
  },
  {
    name: 'Active',
    key: 1
  }
])


const arrDesignations = ref(props.arrDesignations)

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
  strStatus.value = props.objUserDetails.status.name
  strDesignation.value = props.objUserDetails.designation
}

const fnUpdate = async () => {
  const body = {status: intStatusKey.value, designation: intDesignationKey.value}
  
  blnLoading.value = true
  const {response , error_response} = await fetch.post(`${config.public.server_url}/users/${props.objUserDetails._id}/status`, body)
  if(error_response) {
    objUpdateResponse.value.message = error_response
    objUpdateResponse.value.success = false
    return
  }

  objUpdateResponse.value.message = response
  objUpdateResponse.value.success = true
  blnLoading.value = false
  emit('user-update', objUpdateResponse.value)
  emit('close-modal')

}



</script>

<style lang="scss" scoped>

</style>