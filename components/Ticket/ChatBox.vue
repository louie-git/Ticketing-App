<template>
  <div class="w-full flex flex-col justify-between border rounded-md shadow-md">
    <div class=" h-96 border flex flex-col-reverse p-3 overflow-y-auto">
      <div class="flex flex-col gap-y-3">
        <div class="flex gap-2 items-end mb-2">
          <div class="w-8 h-8 min-w-8 relative cursor-pointer">
            <img class="h-full w-full object-cover rounded-full " src="~assets/images/cat3.jpg" alt="">
          </div>
          <div class=" break-words text-wrap w-10/12 bg-blue-600 text-white rounded-2xl p-2 relative mr-20">
            <p class="text-sm">I am chicken</p>
            <p class="absolute -top-4 text-slate-800 text-xs">alexw@email.com</p>
          </div>
        </div>


        <div class="flex gap-2 items-end mb-2 flex-row-reverse">
          <div class=" break-words text-wrap w-10/12 bg-blue-600 text-white rounded-2xl p-2 relative ml-20">
            <p class="text-sm">If chicken can be a chicken, why a fish can't be a chicken</p>
          </div>
        </div>
      </div>
    </div>
    <div class=" flex justify-center items-center px-5 py-1 gap-2">
      <input class="w-full py-1 px-3 rounded-full border outline-none" type="text" placeholder="Compose..." :value="props.title">
      <font-awesome :icon="'paper-plane'" class="text-2xl p-2 w-5 h-5 rounded-full hover:bg-purple-100 transition-all duration-200 text-indigo-950 mr-2 cursor-pointer"/>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>

</style>