<template>
  <div class="relative w-56 h-8 border rounded-md bg-white">
    <div class="h-full w-full flex items-center justify-between" @click="fnShowDropDown">
      <p class="px-2">{{ strSelectedMenu ? strSelectedMenu : '-Select- '}}</p>
      <div>
        <font-awesome :icon="'angle-down'" class="px-3 transition-all duration-300" :class="blnShowMenu && 'rotate-180'" />
      </div>
    </div>
    <div class="absolute w-full top-8 rounded-md overflow-hidden border bg-white z-10" v-if="blnShowMenu" >
      <div  class="block w-full text-start px-2 py-1 duration-300 transition-colors ease-in-out hover:bg-indigo-50" @click="fnResetInput">
        <p>--</p>
      </div>
      <div  class="block w-full text-start px-2 py-1 duration-300 transition-colors ease-in-out "
      :class="numActiveMenu === index ? 'bg-indigo-600 text-indigo-50': 'hover:bg-indigo-50'" 
      v-for="(menu,index) in arrMenuData" @click="fnSelected(menu,index)">
        <p>{{ menu }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>


// const arrMenuData = ref([
//   'Option 1', 'Option 2', 'Option 3',
// ])

const props = defineProps(['arrMenuData'])
const emit = defineEmits(['setFilter'])

const strSelectedMenu = ref('')
const numActiveMenu = ref()
const blnShowMenu = ref(false)

const fnShowDropDown = () => {
  blnShowMenu.value = !blnShowMenu.value
}

const fnSelected = (menu,index) => {
  console.log(menu)
  strSelectedMenu.value = menu
  numActiveMenu.value = index
  blnShowMenu.value = false
  emit('setFilter', strSelectedMenu.value)
}

const fnResetInput = () => {
  strSelectedMenu.value = ''
  numActiveMenu.value = ''
  blnShowMenu.value = false
  emit('setFilter', strSelectedMenu.value)
}




</script>

<style lang="scss" scoped>

</style>