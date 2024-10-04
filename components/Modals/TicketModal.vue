<template>
  <!-- <div class="fixed h-full w-full top-0 left-0 bg-gray-500/30 z-10 flex items-center justify-center">
    <div class="relative bg-slate-50 h-4/5 w-11/12 rounded-lg overflow-hidden tablet:w-4/5 tablet:h-3/5 laptop:w-3/5 desktop:w-2/5"> -->
      <Modal :title="objTicket.ticket_number"  @close-modal="emit('emitBlnShowModal')">
        <div class="flex flex-col px-4 mt-16 gap-3 text-sm tablet:text-base">
          <div class="flex flex-col items-center gap-3  w-full tablet:grid tablet:grid-cols-2 tablet:items-start">
  
            <div class="flex flex-col gap-3 w-full">
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Ticket ID: </p>
                <p class="col-span-3">{{ objTicket.ticket_number }}</p>
              </div>
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Full name: </p>
                <p class="col-span-3">{{ stringCheck(objTicket.submitted_by.full_name) }}</p>
              </div>
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Email: </p>
                <p class="col-span-3 break-all">{{ stringCheck(objTicket.submitted_by.email) }}</p>
              </div>
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Date: </p>
                <p class="col-span-3">{{ stringCheck(objTicket.createdAt) }}</p>
              </div>
  
            </div>
  
            <div class="flex flex-col gap-3 w-full">
  
              <div class="grid grid-cols-5">
                <p class=" font-semibold col-span-2">Category: </p>
                <p class="col-span-3">{{ stringCheck(objTicket.category) }}</p>
              </div>
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Status: </p>
                <p class="col-span-3">{{ stringCheck(objTicket.status) }}</p>
              </div>
  
              <div class="grid grid-cols-5">
                <p class="font-semibold col-span-2">Priority: </p>
                <p class="col-span-3">{{ stringCheck(objTicket.priority) }}</p>
              </div>
  
            </div>
  
          </div>
  
          <div class="mt-5">
            <div class="">
              <p class=" font-semibold">Description</p>
              <p class="break-all line-clamp-4">{{ objTicket.description }}</p>
            </div>
          </div>
  
        </div>
  
        <div class="absolute bottom-0 right-0 flex gap-4 p-6">
          <button class="bg-indigo-950 hover:opacity-80 p-2 rounded-md text-white transition-all duration-300" @click="emit('emitBlnShowModal')">Close</button>
          <NuxtLink :to="`../tickets/${objTicket.ticket_number}`">
            <button class="bg-indigo-950 hover:opacity-80 p-2 rounded-md text-white transition-all duration-300">View</button>
          </NuxtLink>
        </div>

      </Modal>

    <!-- </div>
  </div> -->


</template>

<script setup>

import stringCheck from '../../helpers/checker/stringCheck'
import Modal from '../../components/General/Modal.vue'

const emit = defineEmits(['emitBlnShowModal'])
const props = defineProps(['objTicket'])





</script>

<style lang="scss" scoped>

</style>