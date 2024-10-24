<template>
  <div class=" relative h-64 w-full tablet:h-72 laptop:h-80 shadow-md rounded-md ">
    <table class="table-auto w-full" >
      <thead class="h-12  bg-indigo-950">
        <tr class="text-sm text-slate-100">
          <th class="text-start pl-3 min-w-[80px] px-1">Ticket ID</th>
          <th class="hidden tablet:table-cell text-start min-w-[90px] px-1">Submitted By</th>
          <th class="hidden laptop:table-cell text-start min-w-[75px] px-1">Category</th>
          <th class="hidden laptop:table-cell text-start min-w-[75px] px-1" >Date</th>
          <th class="hidden laptop:table-cell text-start min-w-[150px] max-w-[200px]: px-1" >Description</th>
          <th class="text-center min-w-[60px] px-1 " >Status</th>
          <th class="text-center min-w-[60px] px-1" >Priority</th>
          <th class="text-center min-w-[50px] px-1" >View</th>
        </tr>
      </thead>
    
      <tbody class="" :class="blnLoading && 'blur-sm'">

        <tr class="border-b text-start h-9 align-middle tablet:h-10 laptop:h-12" v-for="(ticket, index) in arrTickets">

          <td class="pl-2 text-indigo-800 font-semibold">
            <!-- <NuxtLink to="../tickets/1">{{ ticket.ticket_number }}</NuxtLink> -->
            <NuxtLink :to="`../tickets/${ticket.ticket_number}` "><span class="hover:bg-indigo-50 py-1 px-2 rounded-md transition-all duration-300 cursor-pointer">{{ ticket.ticket_number }}</span></NuxtLink>
          </td>

          <td class="hidden  tablet:table-cell text-sm px-2 max-w-[120px] relative text-slate-800">
              <p class=" line-clamp-1  break-all py-1" @mouseover="fnShowEmail(index)" @mouseout="showEmail = ''">{{ ticket.submitted_by.email }}</p>
              <Tooltip  :class="index === showEmail ? 'opacity-100 z-10' : 'opacity-0'" :text="ticket.submitted_by.email"></Tooltip>
          </td>

          <td class="hidden laptop:table-cell text-sm px-2 text-slate-800">
            <p class=" line-clamp-1  break-all">{{ ticket.category }}</p>
          </td>

          <td class="hidden laptop:table-cell text-sm px-2 text-slate-800">{{ ticket.createdAt }}</td>

          <td class="relative hidden laptop:table-cell text-sm px-2 max-w-[200px] text-slate-800"  >
            <div class="cursor-pointer py-1" @mouseover="fnShowDescription(index)" @mouseout="() => showDescription = ''">
              <p class=" line-clamp-2 break-all">{{ ticket.description }}</p>
            </div>
            <Tooltip  :class="index === showDescription ? 'visible z-10' : 'hidden'" :text="ticket.description"></Tooltip>
          </td>

          <td class="text-xs font-semibold text-center"><span class="px-2 py-1 rounded" :class="fnCheckStatus(ticket.status)">{{ ticket.status }}</span></td>
          <td class="text-xs font-semibold text-center"><span class="px-2 py-1 rounded" :class="fnCheckPrio(ticket.priority)">{{ticket.priority}}</span></td>

          <td class="hidden">{{ ticket.submitted_by }}</td>
          <td class="hidden truncate max-w-16">{{ ticket.description }}</td>

          <td class=" laptop:table-cell text-center">
            <font-awesome :icon="'eye'" class="text-slate-800 cursor-pointer text-lg px-2" @click="fnShowModal(ticket)"/>
          </td>

        </tr>
      </tbody>
    </table>

    <!-- <div class="absolute w-full top-28 block text-center">
      <Loading class="bg-slate-50 rounded-lg px-6 py-4" v-if="blnLoading"></Loading>
    </div> -->

    <div class="absolute w-full  top-0 text-center bg-black/10 h-full flex justify-center items-center rounded-lg" v-if="blnLoading">
      <Loading class="bg-slate-50 rounded-lg px-6 py-4"></Loading>
    </div>

    <div v-if="!arrTickets.length && !blnLoading" class="text-center">
      <p class="py-3 px-2">No data to show</p>
    </div>

    <TicketModal v-if="blnShowModal" :obj-ticket="objTicket" @emitBlnShowModal="() => blnShowModal = false"></TicketModal>

  </div>

</template>

<script setup>
import TicketModal from  '../components/Modals/TicketModal.vue'


const props = defineProps({
  arrTickets: {
    type: Array,
    default: []
  },
  blnLoading: {
    type: Boolean,
    default: false
  }
})


const showEmail = ref()
const showDescription = ref()
const blnShowModal = ref(false)
const objTicket = ref()
const arrCheck = ref(props.arrTickets)

const fnShowEmail = (index) => showEmail.value = index
const fnShowDescription = (index) => showDescription.value = index

const fnShowModal = (ticket) => {
  objTicket.value = ticket
  blnShowModal.value = true
}

const fnCheckStatus = (status) => status === 'Pending' ? 'bg-red-50 text-red-500' : status === 'In-progress' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
const fnCheckPrio =  (prio) => prio === 'High' ? 'bg-red-50 text-red-500' : prio === 'Low' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'



</script>

