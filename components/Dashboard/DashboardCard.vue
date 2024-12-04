<template>
  <div class="shadow-md rounded-md ">
    <div class="bg-slate-50 h-10 flex items-center px-2 justify-between  rounded-md">
      <p class="text-base font-semibold">{{ props.title }}</p>
      <!-- <NuxtLink :to="props.link">
        <p class="px-2 py-1 cursor-pointer text-white bg-blue-950 rounded-md text-xs font-semibold">SEE ALL</p>
      </NuxtLink> -->
    </div>
    <div class=" h-60 overflow-y-auto">
      <table class="table-auto w-full ">
        <thead class="bg-slate-200 h-10 text-slate-800 font-semibold sticky top-0 ">
          <tr class="text-sm ">
            <th class="w-1/2 tablet:w-2/5 text-start px-2">Ticket ID</th>
            <th class="hidden tablet:table-cell w-1/2 tablet:w-2/5 text-start">Submitted By</th>
            <th class="tablet:w-1/5 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="" >
          <tr class="h-9 text-sm" v-for="ticket in props.data">
            <!-- <td class="px-2 text-indigo-800 font-semibold cursor-pointer " @click="navigateTo({path:`/tickets/${ticket.ticket_number}`})">{{ ticket.ticket_number }}</td> -->
            <td class="pl-2 text-indigo-800 font-semibold">
              <!-- <NuxtLink to="../tickets/1">{{ ticket.ticket_number }}</NuxtLink> -->
              <NuxtLink :to="`../tickets/${ticket.ticket_number}` "><span class="p-1 rounded-md hover:bg-indigo-50 cursor-pointer">{{ ticket.ticket_number }}</span></NuxtLink>
            </td>
            <td class="hidden tablet:table-cell">
              <p class=" line-clamp-1  break-all">{{ ticket.submitted_by.full_name }}</p>
            </td>
            <td class="text-center">
              <span class="px-2 py-1 rounded" :class="infoFormater(ticket.priority)">{{ ticket.priority }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import infoFormater from '../helpers/infoFormater.js'

const props = defineProps({
    title: {
      type: String,
      default: '--'
    },
    link: {
      type: String,
      default: '/dashboard'
    },
    data: {
      type: Array
    }
  })

</script>

