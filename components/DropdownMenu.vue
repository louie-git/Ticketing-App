<template>
  <div class="relative w-44
   h-7 tablet:h-8 border rounded-md bg-white text-gray-500 text-xs tablet:text-sm">
    <div class="h-full w-full flex items-center justify-between" @click="fnToggleDropdown">
      <!-- <p class="px-2 " v-for="(menu,index) in arrMenuData" v-if=" (currentFilter - 1) === index ? 'visible' : 'hidden'">{{menu.name ? menu.name : 'All'}}</p> -->
        <p  class="px-2"> {{ fnDisplayFilterName(currentFilter,arrMenuData) }} </p>
      <div>
        <font-awesome :icon="'angle-down'" class="px-3 transition-all duration-300" :class="blnShowMenu && 'rotate-180'" />
      </div>
    </div>
    <div class="absolute w-full top-8 rounded-md overflow-hidden border bg-white z-10" v-if="blnShowMenu" >
      <div  class="block w-full text-start px-2 py-1 duration-300 transition-colors ease-in-out hover:bg-indigo-50" @click="fnResetInput">
        <p>--</p>
      </div>
      <div  class="block w-full text-start px-2 py-1 duration-300 transition-colors ease-in-out "

      :class="fnSetActive(currentFilter,index) ? 'bg-indigo-600 text-indigo-50': 'hover:bg-indigo-50'"
      v-for="(menu,index) in arrMenuData" @click="fnSelected(menu,index)">
        <p>{{ menu.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  arrMenuData: {
    type: Array,
    default: []
  },
  currentFilter: {
    type: String,
  }
})
const emit = defineEmits(['setFilter'])

const strSelectedMenu = ref('')
const numActiveMenu = ref(props.currentFilter)
const blnShowMenu = ref(false)
const arrSetSelectedMenu = ref(props.arrMenuData)

const fnToggleDropdown = () => {
  blnShowMenu.value = !blnShowMenu.value
}

const fnSelected = (menu,index) => {
  strSelectedMenu.value = menu.name
  numActiveMenu.value = index
  blnShowMenu.value = false
  emit('setFilter', menu.item_id)
}

const fnResetInput = () => {
  strSelectedMenu.value = ''
  numActiveMenu.value = ''
  blnShowMenu.value = false
  emit('setFilter', 'All')
}

const fnDisplayFilterName = (currentFilter,arr) => {
  let value = ''
  arr.forEach(a => {
    if( a.item_id ===   currentFilter ) {
      value =  a.name
    }
  })
  return value ? value : 'All'
}


const fnSetActive = (currentFilter,index) => {

  if(numActiveMenu.value){
    return numActiveMenu.value === index ? true : false
  }
  else {
    return currentFilter - 1 === index ? true : false
  }
}




</script>

<style lang="scss" scoped>

</style>