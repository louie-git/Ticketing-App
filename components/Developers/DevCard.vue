<template>
  <div class="w-full p-2 bg-white rounded-md text-slate-800 my-2 border shadow-md max-w-[500px]  mx-auto hover:scale-[1.032] transition-all duration-200 ease-out">
    <div class="flex items-center gap-4 justify-center">
      <div class="h-16 w-16 min-w-16 border-4 border-indigo-900 rounded-full">
        <img  class="ib object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt="">
      </div>
      <div class="text-center mt-3 w-56 ">
        <p class="font-semibold">{{ dev.full_name }}</p>
        <p class="text-sm break-all">{{ dev.email }}</p>
        <p class=" rounded-full font-semibold bg-indigo-900 text-white">{{ dev.designation }}</p>
      </div>
    </div>
    <div class="mt-2">
      <p class="text-xl font-bold text-center ">Tickets</p>
      <div class="flex flex-wrap justify-center gap-1 tablet:gap-x-1">
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Pending</p>
          <p class="text-red-500 font-bold">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> In-progress</p>
          <p class="text-yellow-500 font-bold">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Completed</p>
          <p class="text-green-500 font-bold">100</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const propt = defineProps(['dev'])

</script>

<style lang="scss" scoped>

</style>