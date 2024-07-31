<template>
  <div class="font-body">

    <header
      class="w-full h-14 flex justify-between items-center px-3 shadow-sm transition-all ease-in-out duration-500 tablet:pl-64 bg-indigo-50">
      <NuxtLink to="/" class="tablet:opacity-0">
        <div class="flex items-center gap-x-3">
          <img class="w-10" src="~assets/icons/ticket.png" alt="">
          <p class="font-extrabold text-slate-800">Ticketing System</p>
        </div>
      </NuxtLink>
      <div class="tablet:hidden">
        <font-awesome v-if="!showMenu" :icon="'bars'" class="text-2xl cursor-pointer" @click="toggleMenu()" />
        <font-awesome v-else :icon="'xmark'" class="text-3xl cursor-pointer" @click="toggleMenu()" />
        <!-- <img class="w-8"  v-if="!showMenu" src="~assets/icons/burger-bar.png" alt="" @click="toggleMenu()">
        <img class="w-6 " v-else src="~assets/icons/close.png" alt="" @click="toggleMenu()"> -->
      </div>
    </header>


    <div class="w-64 fixed top-0 px-3 pb-10 h-full border bg-white z-10 transition-all ease-in-out duration-500 
    tablet:left-0  tablet:64 tablet:px-3" :class="showMenu ? 'left-0' : '-left-full'">
      <nav class="h-full flex flex-col justify-between w-full tablet:items-center">
        <div class="w-full">
          <NuxtLink to="/">
            <div class="flex items-center gap-x-3 h-14">
              <img class="w-10" src="~assets/icons/ticket.png" alt="">
              <p class="font-extrabold text-slate-800">Ticketing System</p>
            </div>
          </NuxtLink>
          <div class="flex items-center justify-between gap-1 px-2 py-2 bg-indigo-950 rounded-md mt-6">
            <!-- <font-awesome :icon="'circle-user'" class="text-4xl rounded-full p-1 border-rose-50 border-4 bg-white"/> -->
            <div class="h-12 w-12 border-4 border-white rounded-full">
              <img src="~assets/images/cat3.jpg" alt="" class="h-full w-full object-cover rounded-full">
            </div>
            <div class="text-center flex flex-col gap-y-2 max-w-36 ">
              <p class="text-white text-sm text-ellipsis font-semibold">Vincent Louie Arrabis</p>
              <p class="text-xs text-slate-800 px-1 bg-white rounded-full">Backend Developer</p>

            </div>
          </div>
          <div class="flex flex-col gap-y-2 tablet:align-middle mt-10">
            <NuxtLink :to="menu.link" v-for="(menu, index) in sidebarMenus" 
              class=" font-semibold  px-2  rounded-md duration-200 transition-all ease-in-out"
              :class="menu.isActive? 'bg-indigo-950 text-indigo-50': 'hover:bg-indigo-200'"
              @click="activeMenu(index), toggleMenu()">
              <div class="flex gap-3 py-2 items-center">
                <!-- <img class="w-5 h-5" :src="`/_nuxt/assets/icons/${menu.icon}`" alt="">  -->
                <font-awesome :icon="`${menu.icon}`" class="text-xl w-10" />
                <span class="">{{ menu.text }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex gap-3  rounded-md px-2 w-full py-2 shadow-lg">
          <font-awesome :icon="'arrow-right-from-bracket'" class="text-xl" />
          <span>Logout</span>
        </div>
      </nav>
    </div>

    <div class="tablet:pl-64 transition-all ease-in-out duration-500">
      <div class="p-3">
        <slot />
      </div>
    </div>


  </div>
  
</template>


<script setup>


const showMenu = ref(false)
const sidebarMenus = ref([
  {
    link: '/',
    text: 'Home',
    icon: 'house',
    isActive: true
  },
  {
    link: '/tickets',
    text: 'Tickets',
    icon: 'clipboard-list',
    isActive: false

  },
  {
    link: '/developers',
    text: 'Developers',
    icon: 'code',
    isActive: false

  },
  {
    link: '/archives',
    text: 'Archived Tickets',
    icon: 'box-archive',
    isActive: false
  },
  {
    link: '/account',
    text: 'Account',
    icon: 'circle-user',
    isActive: false
  },
  {
    link: '/settings',
    text: 'Settings',
    icon: 'gears',
    isActive: false
  },
  {
    link: '/my-tickets',
    text: 'My Tickets',
    icon: 'circle-user',
    isActive: false
  },
])


const router = useRouter()

sidebarMenus.value = sidebarMenus.value.map((menu)=> {
  const path = router.currentRoute.value.path.split('/')[1]
  menu.link === `/${path}` ? menu.isActive = true : menu.isActive = false
  return menu
})


const dateTime = ref(Date())
console.log(dateTime.value)

const activeMenu = (index) => {
  sidebarMenus.value = sidebarMenus.value.map((menu, menuIndex) => {
    menuIndex === index ? menu.isActive = true : menu.isActive = false
    return menu
  })
}

window.onresize = () => {
  if (window.screen.width < 768) {
    showMenu.value = false
  }
}

const toggleMenu = () => {
  console.log('here')
  showMenu.value = !showMenu.value
}



</script>

<style scoped></style>