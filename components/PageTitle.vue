<template>
  <div class="flex gap-3 items-center  ">
    <font-awesome :icon="'arrow-left'" class="text-lg p-2  rounded-full hover:bg-indigo-100 transition-all duration-200" @click="() => router.go(-1)" v-if="props.retBtn"/>
    <p class="text-xm tablet:text-xl laptop:text-2xl font-bold text-slate-800">{{ props.pageTitle }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    pageTitle: {
      type: String,
      default: 'Hello world'
    },
    retBtn: {
      type: Boolean,
      default: false
    }
  })

  const router = useRouter()

</script>

<style scoped>

</style>