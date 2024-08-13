<template>
  <div class="fixed h-full w-full bg-black/30 top-0 left-0 z-10 p-2 content-center">

    <div class="relative w-11/12 h-4/5 m-auto bg-white rounded-md tablet:h-4/5 laptop:w-10/12 desktop:w-9/12 overflow-hidden">
      <p class=" bg-indigo-950 text-white text-center h-10 content-center">{{ image }}</p>
      <p v-if="!image">Nothing to show</p>
      <img v-else class=" object-contain w-full h-5/6 mt-5 "  :src="`/_nuxt/assets/images/${image}`" alt="">
      <!-- <NuxtImg v-else class=" object-contain w-full h-5/6 mt-5 "  :src="`/_nuxt/assets/images/${image}`" alt=""></NuxtImg> -->


      <div>
        <font-awesome :icon="'xmark'" class="text-white absolute right-0 top-0 w-7 h-7 px-2 py-1 cursor-pointer" @click="$emit('toggleModal')" />
      </div>
    </div>

  
    
  </div>
</template>

<script setup>

const props = defineProps(['image'])

</script>

