<template>
  <div class="shadow-md rounded-md ">
    <div class="bg-slate-50 h-10 flex items-center px-2 justify-between  rounded-md">
      <p class="text-base font-semibold">{{ props.title }}</p>
      <p class="px-2 py-1 cursor-pointer text-white bg-blue-950 rounded-md text-xs font-semibold">SEE ALL</p>
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
            <td class="px-2">{{ ticket.ticket_number }}</td>
            <td class="hidden tablet:table-cell">
              <p class=" line-clamp-1  break-all">{{ ticket.submitted_by.full_name }}</p>
            </td>
            <td class="text-center">
              <span class="px-2 py-1 rounded" :class="fnCheckPrio(ticket.priority)">{{ ticket.priority }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    title: {
      type: String,
      default: '--'
    },
    link: {
      type: String,
      default: '--'
    },
    data: {
      type: Array
    }
  })

  const fnCheckPrio =  (prio) => prio === 'High' ? 'bg-red-50 text-red-500' : prio === 'Low' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'

</script>

