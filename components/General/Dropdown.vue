<template>
  <div  class="relative w-44 border h-8 rounded-md tablet:w-56 ">
    <div class="flex justify-between w-full items-center h-full"  @click="blnShowDropdownMenu = !blnShowDropdownMenu">
      <div class="w-full px-2">
        <p>{{ strCurrentVal }}</p>
      </div>
        <font-awesome :icon="'angle-down'" class="px-2 transition-all duration-300" :class="blnShowDropdownMenu && 'rotate-180'" />
    </div>

      <div class="absolute w-full top-8 rounded-md overflow-hidden transition-all duration-300 border bg-white z-10" :class="blnShowDropdownMenu ? 'block': 'hidden'">
        <p v-for="option in options" class="px-2 py-1 hover:bg-indigo-50 bg-white" @click="fnSetValue(option)">
          {{ option.name }}
        </p>
      </div>
  </div>
</template>

<script setup>


const emit = defineEmits(['update'])
const props = defineProps({
  options: {
    type: Array,
    default: []
  },
  currentValue: {
    type: String,
    default: ''
  }
})

const strCurrentVal = ref(props.currentValue)
const blnShowDropdownMenu = ref(false)

const fnSetValue = (data) => {
  strCurrentVal.value = data.name
  blnShowDropdownMenu.value = false
  emit('update', data)
}



</script>

<style lang="scss" scoped>

</style>