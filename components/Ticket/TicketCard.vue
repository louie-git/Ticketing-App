<template>
    <NuxtLink to="/tickets/1">
    <div class="border border-slate-200 rounded-md mb-2  py-3 bg-white">
      <div class="flex justify-between items-center px-4 py-1 laptop:flex-col laptop:gap-y-2 desktop:flex-row">
        <p class="px-2 font-bold text-xl text-purple-700 border-2 border-purple-700 rounded-lg">#0535FA</p>
        <div class=" px-2 bg-green-500 rounded-md text-white">MEDIUM</div>
      </div>
      <div class="px-4 pb-2">
        <div class="flex items-center gap-2 py-2 laptop:flex-col desktop:flex-row">
          <img class="w-11 h-11" src="~assets/icons/user.png" alt="">
          <div class="">
            <p class="text-base font-bold">alexa@email.com</p>
            <p class="text-xs">February 10, 2024 2:51pm</p>
          </div>
        </div>
        <p class="text-lg font-bold mb-2 laptop:text-center desktop:text-start" >Application Group</p>
        <p class="line-clamp-2">Lorem ipsum dolor sit amet consectetur sklabush adipisicing elit.  adipisci iusto cumque nihil nobis tempore obcaecati voluptatem.</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>