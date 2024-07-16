<template>
    <div class="fixed left-0 bottom-5 w-screen p-2 flex justify-center transition-all ease-in-out duration-700 " :class="blnShowNotif ? 'visible' : 'hidden'" >

      <div class="relative rounded-md max-w-52 min-w-48 py-3 px-5 text-center border-2 content-center text-xs tablet:max-w-60 laptop:text-sm laptop:max-w-96 laptop:min-w-80" 
      :class=" isSuccess ? ' bg-green-100 text-green-500 border-green-300' : ' bg-red-100 text-red-500 border-red-300'"
      >
        <!-- <font-awesome :icon="'xmark'" class="text-xs absolute -top-3 -right-2 p-1 border border-slate-400 rounded-full h-3 cursor-pointer w-3 bg-slate-50 text-black  -->
         <!-- hover:bg-red-700 hover:text-white" @click="() => blnShowNotif = false" /> -->

           <font-awesome :icon="'xmark'" class="absolute top-1 right-1 cursor-pointer" @click="() => {blnShowNotif = false; emit('closeNotif')}" />
        <p>{{ message }}</p>

      
      </div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits } from 'vue';

const emit = defineEmits(['closeNotif'])

const props = defineProps({
  message: String,
  isSuccess: {
    type: Boolean,
    default: true
  }
})

const blnShowNotif = ref(props.message? true: false)
blnShowNotif.value = true
onMounted(() =>  setTimeout( () => {
  blnShowNotif.value = false 
  emit('closeNotif')
}, 10000))

</script>


<style lang="scss" scoped>


</style>v