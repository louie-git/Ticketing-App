<template>
  <div class="relative w-60 h-8 border rounded-md mt-10">
    <div class="h-full w-full flex items-center justify-between" @click="fnShowDropDown">
      <p class="px-2">{{ strSelectedMenu ? strSelectedMenu : 'Please Select '}}</p>
      <div>
        <font-awesome :icon="'angle-down'" class="px-3" />
      </div>
    </div>

    <div class="absolute w-full top-8 rounded-md overflow-hidden border" v-if="true" >
      <button  class="block w-full text-start px-2 py-1 duration-300 transition-colors ease-in-out "
      :class="numActiveMenu === index ? 'bg-indigo-500 text-indigo-50': 'hover:bg-indigo-50'" 
      v-for="(menu,index) in arrMenuData" @click="fnSelected(menu,index)">
        <p>{{ menu }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>


const arrMenuData = ref([
  'Option 1', 'Option 2', 'Option 3',
])

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
}

</script>

<style lang="scss" scoped>

</style>