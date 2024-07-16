<template>
  <div class="absolute top-10 -left-1 px-2 py-2 rounded-md bg-indigo-100 transition-all ease-in-out duration-200" >
    <p class="text-sm">{{ text }}</p>
  </div>
</template>

<script setup>

const props = defineProps([
  'text'
])

</script>

