<template>
  <Modal title="Create Ticket" @close-modal="emit('close-modal')">
    <div class="p-3 flex-1 flex flex-col justify-between overflow-y-auto">
      <div class="grid grid-cols-1 gap-1">
        <div class="flex flex-col gap-1">
          <div class="relative border w-auto  rounded-md">
            <button class="w-full py-1 px-2 cursor-pointer flex justify-between"  @click="blnShowDropdown = !blnShowDropdown">
              <p>{{ strCategoryName || 'Select Category' }}</p>
              <div>
                <font-awesome :icon="'angle-down'" class="px-3 transition-all duration-300" :class="blnShowDropdown && 'rotate-180'" />
              </div>
            </button>
            <div class="absolute border top-9 bg-white w-full rounded-md transition-all duration-300" :class="blnShowDropdown ? '' : 'hidden'" >
              <div class="px-2 py-1 hover:bg-indigo-50 transition-colors duration-300 cursor-pointer" v-for="category in props.arrCategories" @click="strCategoryName = category.name , ticket.category = category.key, blnShowDropdown = false ">{{ category.name }}</div>
            </div>
          </div>
          
          <textarea class="border p-2 rounded-md outline-none w-full h-36 resize-none" name="" placeholder="Add Description" v-model="ticket.description"></textarea>
        </div>
        <div class="
        h-40 
        border 
        rounded-md 
        flex 
        flex-col 
        items-center 
        justify-center
        " 
        :class="blnDragOver && 'bg-indigo-50'"
        @dragover.prevent="onDragOver" 
        @dragleave.prevent="onDragLeave" 
        @drop.prevent="fnDropImg"
        >
          <img class="w-10" src="~assets/icons/upload.png" alt="upload">
          <p>Drag image/s to upload or <label class="text-blue-500 cursor-pointer hover:text-blue-800" for="file-input">Browse</label></p>
          <input class="hidden" type="file" name="" id="file-input" ref="files" accept="image/png, image/gif, image/jpeg" multiple @change="onFileSelect">
        </div>
        <p class=" text-red-600 text-xs" v-if="arrNotAllowedFiles.length > 0"  > {{fnCheckErrorFileAndCount()}} file/s type not allowed </p>

        <div class=" flex gap-2 flex-wrap">
          <div class="relative w-24 h-24 border rounded-md overflow-hidden " v-for="(img, index) in arrImages">
            <img :src="img.url" alt="uploaded image" class="object-contain w-full h-full m-auto bg-gray-950">
            <font-awesome :icon="'xmark'" class="w-4 h-4 rounded-full bg-white/50 absolute top-1 right-1  cursor-pointer hover:bg-white transition-colors duration-300" @click="fnRemoveImg(index)" />
          </div>
        </div>

      </div>
      <div class="mt-auto flex justify-end gap-x-2">
        <input class="px-4 py-1 bg-blue-950 rounded-md font-semibold text-slate-50 hover:opacity-85 duration-200" type="button" value="Clear" >
        <button class="px-4 py-1 bg-blue-950 rounded-md font-semibold cursor-pointer text-slate-50 hover:opacity-85 duration-200" @click="submitTicket()">Submit</button>
      </div>
    </div>
  </Modal>


</template>

<script setup>

import Modal from '../components/General/Modal.vue'

const emit = defineEmits(['close-modal','notification'])

const props = defineProps({
  arrCategories: {
    type: Array,
    default: []
  }
})


const ticket = ref({})

const strCategoryName = ref('')
const strNotifMessage = ref('')
const blnShowDropdown = ref(false)
const blnFullDisplay = ref(false)
const blnShowNotif = ref(false)
const blnRequestSuccess = ref()
const blnDragOver = ref(false)

const arrImages = ref([])
const arrNotAllowedFiles = ref([])

const onDragOver = () => blnDragOver.value = true


const onDragLeave = () => blnDragOver.value = false


const arrAllowedFileTypes = ["image/jpeg", "image/png"]



function fnuploadedFiles(files){  //Push files in array

  for(let i = 0; i < files.length; i++){
    console.log(files[i])
    let uri = URL.createObjectURL(files[i])
    console.log(uri)

    if(arrAllowedFileTypes.includes(files[i].type)){
      arrImages.value.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i])
      })
    }
    else {
      arrNotAllowedFiles.value.push(files[i].name)
    }
  }
}

function fnCheckErrorFileAndCount () {
  arrNotAllowedFiles.value.length
  setTimeout(() => arrNotAllowedFiles.value = [] , 5000)
  return arrNotAllowedFiles.value.length
}

const fnDropImg = (event) => {
  blnDragOver.value = false
  const files = event.dataTransfer.files
  fnuploadedFiles(files)
}

const onFileSelect = (event) => {
  const files = event.target.files
  fnuploadedFiles(files)

}

const fnRemoveImg = (index) => {
  arrImages.value = arrImages.value.filter( (img,i) =>  {
     if( i!==index ) {
      return img
     }
  })
  console.log(arrImages.value)
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
  if( res.status !== 200 ) throw ({name: 'Response', message: 'Failed to create ticket'})
  const data = await res.json()
  console.log(data)
  blnShowNotif.value = true
  strNotifMessage.value = data.message
  blnRequestSuccess.value = true

} catch (error) {
  console.log(error)
  blnShowNotif.value = true
  blnRequestSuccess.value = false
  strNotifMessage.value = 'Error while posting ticket.'
} finally  {
  console.log('here')
  emit('notification', {
    showNotif: blnShowNotif.value,
    notifMessage: strNotifMessage.value,
    requestSuccess: blnRequestSuccess.value
  })
  emit('close-modal')
}
}



onMounted(() => {
  setTimeout(() => blnFullDisplay.value = true,10)
})


</script>

<style lang="scss" scoped>

</style>