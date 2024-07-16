<template>
  <div class="mb-3 py-2 px-2 rounded-md text-slate-800 flex flex-col  tablet:flex-row gap-5 bg-purple-50">
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
</template>

<script setup>

</script>

