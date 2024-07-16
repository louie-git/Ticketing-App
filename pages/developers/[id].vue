<template>

  <PageTitle page-title="vincentla@meditab.com" :ret-btn="true"/>
  <div class="mx-auto my-5 text-te-700 ">
    
    <div class="laptop:flex laptop:gap-x-10 items-start border-b pb-4">
      <div class="flex flex-col items-center tablet:flex-row gap-x-4">
        <div class="w-14 h-14">
          <img class="h-full w-full object-cover rounded-full" src="~assets/images/cat3.jpg" alt="">
        </div>
        <div class="text-center">
          <p class="font-bold">Vincent Louie Arrabis</p>
          <p class="text-sm">vincentla@meditab.com</p>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-1 mt-4 tablet:gap-x-4 tablet:justify-normal tablet:mt-5 laptop:mt-0 ">
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Pending</p>
          <p class="text-red-500 font-bold text-xl">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> In-progress</p>
          <p class="text-yellow-500 font-bold text-xl">100</p>
        </div>
        <div class="shadow-md rounded-md text-center px-3 ">
          <p class="text-sm"> Completed</p>
          <p class="text-green-500 font-bold text-xl">100</p>
        </div>
      </div>
    </div>
    <div class='mt-3'>
      <div class="mb-3 py-2 px-2 rounded-md text-slate-800 flex flex-col  tablet:flex-row gap-5 bg-purple-50 shadow-md">
        <div class="flex-col flex items-center tablet:block">
          <p>Status</p>
          <select class="outline-none w-4/5 py-1 px-2 font-semibold border rounded-md tablet:w-52" name="" id="status">
            <option value="">COMPLETED</option>
            <option value="">PENDING</option>
            <option value="">IN-PROGRESS</option>
          </select>
        </div>
        <div class="flex-col flex items-center tablet:block">
          <p>Priority</p>
          <select class="outline-none w-4/5 py-1 px-2 font-semibold border rounded-md tablet:w-52" name="" id="status">
            <option value="">LOW</option>
            <option value="">MEDIUM</option>
            <option value="">HIGH</option>
          </select>
        </div>
      </div>

      <TicketTable></TicketTable>
    </div>
  </div>
</template>

<script setup>
  const router = useRouter()

</script>

<style lang="scss" scoped>
  
</style>