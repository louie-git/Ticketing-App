<template>
  <!-- <header class="small:top-0 small:sticky z-10">
    <nav class="flex justify-between px-5 items-center py-4 bg-blue-100">
      <NuxtLink to="/">
        <div class="flex items-center gap-x-3">
          <img class="w-10" src="~assets/icons/ticket.png" alt="" >
          <p class="font-extrabold">Ticketing System</p>
        </div>
      </NuxtLink>
      <div class="tablet:hidden">
        <img class="w-10 " src="~assets/icons/burger-bar.png" alt="" @click="toggleMenu()">
      </div>
     
    </nav>
  </header> -->

  <div class="w-full h-full tablet:flex">
    <!-- <div class=" fixed top-0 -left-full w-full 
    h-screen small:bg-black/70 transition-all ease-in
    small:z-10
    tablet:relative tablet:w-80 border-blue-500 border tablet:bg-inherit
    tablet:left-0"
    :class="{'left-0' : sidepanel}" 
    @click.self="toggleMenu"
    >
      <div class="border  fixed small:w-3/4 small:h-screen p-3 
      tablet:w-inherit tablet:h-full ">
        <div class="mt-10 px-1 gap-y-4" >
          <NuxtLink :to="`${menu.link}`" v-for="menu in sidebarMenus" @click="toggleMenu">
            <div class="menu">
              <img class="w-6" :src="`/_nuxt/assets/icons/${menu.icon}`" alt=""> 
              <p>{{ menu.text }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div> -->
    <div >
      <slot/>
      dsds
    </div>
  </div>
</template>

<script setup>

  const sidepanel = ref(false)

  const toggleMenu = ()=>{ 
    sidepanel.value = !sidepanel.value
  }
  onMounted(()=> {
    window.onresize = () =>{ 
      console.log(screen.width)
      if(screen.width > 640) sidepanel.value = true
      else sidepanel.value = false
    }
  })


  const sidebarMenus = ref([
    {
      link: '/',
      text: 'Home',
      icon: 'home.png'
    },
    {
      link: '/developers',
      text: 'Developers',
      icon: 'dev.png'
    },
    {
      link: '/archives',
      text: 'Archived Tickets',
      icon: 'folder.png'
    },
    {
      link: '/account',
      text: 'Account',
      icon: 'user.png'
    },
    
  ])


</script>

<style scoped>

</style>