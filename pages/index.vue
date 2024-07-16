<template>
  <div>
    <PageTitle page-title="Dashboard"/>

    <div class="mt-5 px-1 flex flex-col gap-y-5">
      <div class="grid grid-cols-2 gap-2   laptop:grid-cols-4 ">
 
        <div class="w-full flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md " :class="card.bg" v-for="card in dashboardCards">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-slate-50 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="'archive'" class="text-sm "/>
          </div>
          <div class="text-end text-slate-50 font-semibold leading-6">
            <p class="text-sm laptop:text-xl">{{ card.value }}</p>
            <p class="text-xs laptop:text-lg">{{ card.label }}</p>
          </div>
        </div>
<!-- 
        <div class="w-full bg-slate-600 flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md border-b-4 border-green-900 ">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-slate-50 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="'archive'" class="text-sm "/>
          </div>
          <div class="text-end text-slate-50 font-semibold leading-6">
            <p class="text-sm laptop:text-xl">248</p>
            <p class="text-xs laptop:text-lg">Completed</p>
          </div>
        </div>

        <div class="w-full bg-green-600 flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md border-b-4 border-green-900 ">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-slate-50 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="'archive'" class="text-sm "/>
          </div>
          <div class="text-end text-slate-50 font-semibold leading-6">
            <p class="text-sm laptop:text-xl">248</p>
            <p class="text-xs laptop:text-lg">Completed</p>
          </div>
        </div>
        
        <div class="w-full bg-yellow-400 flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md border-b-4 border-yellow-900 ">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-slate-50 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="'archive'" class="text-sm "/>
          </div>
          <div class="text-end text-slate-50 font-semibold leading-6">
            <p class="text-sm laptop:text-xl">248</p>
            <p class="text-xs laptop:text-lg">On Going</p>
          </div>
        </div>

        <div class="w-full bg-red-600 flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md border-b-4 border-red-900 ">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-slate-50 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="'archive'" class="text-sm "/>
          </div>
          <div class="text-end text-slate-50 font-semibold leading-6">
            <p class="text-sm laptop:text-xl">248</p>
            <p class="text-xs laptop:text-lg">Pending</p>
          </div>
        </div> -->

      </div>

      <div class="grid tablet:grid-cols-2 gap-2 dark">
        <div class=" shadow-md rounded-md ">
          <div class="bg-slate-50 h-10 flex items-center px-2 justify-between  rounded-md">
            <p class="text-base font-semibold">Completed Recently</p>
            <p class="px-2 py-1 cursor-pointer text-white bg-blue-700 rounded text-xs font-semibold">SEE ALL</p>
          </div>
          <div class="h-64 desktop:h-72 overflow-y-auto">
            <table class="table-auto w-full ">
              <thead class="bg-slate-200 h-10 text-slate-800 font-semibold sticky top-0 ">
                <tr class="text-sm ">
                  <th class="w-1/2 tablet:w-2/5 text-start px-2">Ticket ID</th>
                  <th class="w-1/2 tablet:w-2/5 text-start">Submitted By</th>
                  <th class="hidden tablet:table-cell tablet:w-1/5 text-start"></th>
                </tr>
              </thead>
              <tbody class="" >
                <tr class="h-12 text-sm" >
                  <td class="px-2">#150224</td>
                  <td class="">
                    <p class=" line-clamp-1  break-all">Vincent Louie Arrabis</p>
                  </td>
                  <td class="hidden tablet:table-cell text-center">
                    <span class=" text-blue-500 bg-blue-100  px-2 py-1 rounded">Low</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class=" shadow-md rounded-md ">
          <div class="bg-slate-50 h-10 flex items-center px-2 justify-between  rounded-md">
            <p class="text-base font-semibold">On Going</p>
            <p class="px-2 py-1 cursor-pointer text-white bg-blue-700 rounded text-xs font-semibold">SEE ALL</p>
          </div>
          <div class="h-64 desktop:h-72 overflow-y-auto">
            <table class="table-auto w-full ">
              <thead class="bg-slate-200 h-10 text-slate-800 font-semibold sticky top-0 ">
                <tr class="text-sm ">
                  <th class="w-1/2 tablet:w-2/5 text-start px-2">Ticket ID</th>
                  <th class="w-1/2 tablet:w-2/5 text-start">Submitted By</th>
                  <th class="hidden tablet:table-cell tablet:w-1/5 text-start"></th>
                </tr>
              </thead>
              <tbody class="" >
                <tr class="h-12 text-sm" >
                  <td class="px-2">#150224</td>
                  <td class="">
                    <p class=" line-clamp-1  break-all">Vincent Louie Arrabis</p>
                  </td>
                  <td class="hidden tablet:table-cell text-center">
                    <span class=" text-blue-500 bg-blue-100  px-2 py-1 rounded">Low</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

const dashboardCards = [
  {
    bg: "bg-slate-500",
    label: 'Total Tickets',
    value: '245'
  },
  {
    bg: "bg-green-600",
    label: 'Completed',
    value: '100'
  },
  {
    bg: "bg-yellow-400",
    label: 'On Going',
    value: '23'
  },
  {
    bg: "bg-red-600 ",
    label: 'Pending',
    value: '122'
  }
  
]

</script>

<style lang="scss" scoped>

</style>