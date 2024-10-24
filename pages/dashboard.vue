<template>
  <div>
    <PageTitle page-title="Dashboard"/>

    <div class="mt-5 px-1 flex flex-col gap-y-5">
      <div class="grid grid-cols-2 gap-2   laptop:grid-cols-4 ">
 
        <div class="w-full flex justify-between items-center p-2 laptop:p-3 rounded-md shadow-md border-2 text-neutral-700 bg-white"  v-for="card in arrDashboardCards">
          <div class="w-8 h-8 min-w-8 laptop:w-12 laptop:h-12 laptop:min-w-12 bg-indigo-900 p-2 rounded-full flex justify-center items-center hover:rotate-12 duration-200">
            <font-awesome :icon="card.icon" class="text-lg text-white "/>
          </div>
          <div class="text-end font-semibold leading-6">
            <p class="text-sm laptop:text-xl">{{ card.value }}</p>
            <p class="text-xs laptop:text-lg">{{ card.label }}</p>
          </div>
        </div>

      </div>

      <div class="grid tablet:grid-cols-2 gap-2 dark">
        <DashboardCard  title="Completed Recently" :data="arrCompletedTickets"/>
        <DashboardCard  title="In-progress" :data="arrInprogressTickets"/>

      </div>
    </div>


  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default1'
})

import getFetch from '../fetch/getFetch.js'
import DashboardCard from '../components/Dashboard/DashboardCard.vue'
const config = useRuntimeConfig()


const arrCompletedTickets = ref([])
const arrInprogressTickets = ref([])
const numTotalTickets = ref(0)
const numPendingCount = ref(0)
const numCompletedCount = ref(0)
const numInprogressCount = ref(0)
const arrDashboardCards = ref([])

const fnFetchData = async () => {
  console.log('here')
  try {
    const {data, message, response_error} = await getFetch(`${config.public.server_url}/tickets/dashboard`)
    arrCompletedTickets.value = data.completed
    arrInprogressTickets.value = data.inprogress
    numTotalTickets.value = data.total_tickets
    numPendingCount.value = data.pending_count
    numCompletedCount.value = data.completed_count
    numInprogressCount.value = data.inprogress_count

    arrDashboardCards.value = [
      {
        bg: "bg-slate-500",
        label: 'Total Tickets',
        value: numTotalTickets.value,
        icon: 'list'
      },
      {
        bg: "bg-green-600",
        label: 'Completed',
        value: numCompletedCount.value,
        icon: 'check'
      },
      {
        bg: "bg-yellow-400",
        label: 'In-progress',
        value: numInprogressCount.value,
        icon: 'spinner'
      },
      {
        bg: "bg-red-600 ",
        label: 'Pending',
        value: numPendingCount.value,
        icon: 'clock'
      }
    ]


  } catch (error) {
    console.log('errlr',error)
  }

}



onMounted( async() => {
  fnFetchData()

})
</script>

<style lang="scss" scoped>

</style>