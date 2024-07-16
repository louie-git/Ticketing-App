<template>
  <div class="">
    <div class=" w-full tablet:flex tablet:justify-between">
      <PageTitle page-title="Developers"/>
      <!-- <div class="sel self-center flex justify-between items-center shadow-md rounded-sm mt-4 tablet:mt-0">
        <input class="outline-none py-1 px-2 laptop:w-80" type="text" placeholder="Search...">
        <font-awesome :icon="'magnifying-glass'" class="text-purple-700 text-xl px-2"/>
      </div> -->
    </div>
    <div class="bg-purple-50  p-2 text-slate-800 mt-4 rounded-md laptop:grid laptop:grid-cols-2 laptop:gap-2 desktop:grid-cols-3 ">
      <NuxtLink to="/developers/1">
        <div class="w-full p-2 bg-white rounded-md text-slate-800 my-2 border shadow-md max-w-[550px] mx-auto tablet:max-w-none">
          <div class="flex items-center gap-4 justify-center">
            <div class="h-16 w-16 min-w-16 border-4 border-purple-700 rounded-full">
              <img  class="ib object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt="">
            </div>
            <div class="text-center mt-3 w-56 ">
              <p class="font-semibold">Gerald Williams</p>
              <p class="text-sm">geraldwilliam@email.com</p>
              <p class=" rounded-full font-semibold bg-purple-700 text-white">Full-stack Developer</p>
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
      </NuxtLink>
      <div class="w-full p-2 bg-white rounded-md text-slate-800 my-2 border shadow-md max-w-[550px] mx-auto tablet:max-w-none">
        <div class="flex items-center gap-4 justify-center">
          <div class="h-16 w-16 border-4 border-purple-700 rounded-full">
            <img  class="ib object-cover h-full w-full rounded-full" src="~assets/images/cat1.jpg" alt="">
          </div>
          <div class="text-center mt-3 w-56 ">
            <p class="font-semibold">Gerald Williams</p>
            <p class="text-sm">geraldwilliam@email.com</p>
            <p class=" rounded-full font-semibold bg-purple-700 text-white">Full-stack Developer</p>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-xl font-bold text-center ">Tickets</p>
          <div class="flex flex-wrap justify-center gap-1 tablet:gap-x-1">
            <div class="shadow-md rounded-md text-center px-3 ">
              <p class="text-sm"> Pending</p>
              <p class="text-red-700 font-bold">100</p>
            </div>
            <div class="shadow-md rounded-md text-center px-3 ">
              <p class="text-sm"> In-progress</p>
              <p class="text-yellow-700 font-bold">100</p>
            </div>
            <div class="shadow-md rounded-md text-center px-3 ">
              <p class="text-sm"> Completed</p>
              <p class="text-green-700 font-bold">100</p>
            </div>
          </div>
        </div>
      </div>
    

    </div>
    
  </div>
</template>

<script setup>


</script>

<style scoped>

</style>