<template>
  <div class=" h-screen w-screen content-center bg-blue-50">
    <div class="flex flex-col gap-3 max-w-[30rem] mx-auto text-center p-4 text-gray-800 ">
      <p class="text-7xl font-bold">Ooops!</p>
      <p class="text-5xl font-semibold laptop:text-7xl ">{{ error.statusCode }}</p>
      <p class="text-base laptop:text-xl">{{ error.message }}</p>
      <NuxtLink class="border px-6 py-1 rounded-md border-gray-800 self-center" to="/">Return</NuxtLink>
    </div>
  </div>
</template>

<script setup>
  defineProps(['error'])
</script>