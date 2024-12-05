<template>
    <div>
      hello


    </div>
    <Notification v-if="objNotif.show" :bln-show-notif="objNotif.show" :message="objNotif.message" :is-success="objNotif.success"  @closeNotif="()=> objNotif.show = false"></Notification>

</template>

<script setup>


definePageMeta({
  layout: 'main-layout'
})

// const objNotif = ref({
//   show: false,
//   message: '',
//   success: false
// })



let value = 49

// const = ['x', 'ix', 'viii', 'vii', 'vi','v','iv','iii',ii,i]

const refs = [
  {
    rn: 'M',
    val: 1000
  },
  {
    rn: 'CM',
    val: 900
  },
  {
    rn: 'D',
    val: 500
  },
  {
    rn: 'CD',
    val: 400
  },
  {
    rn: 'C',
    val: 100
  },
  {
    rn: "XC",
    val: 90
  },
  {
    rn: 'L',
    val: 50
  },
  {
    rn: 'XL',
    val: 40
  },
  {
    rn: 'X',
    val: 10
  },  
  {
    rn: 'IX',
    val: 9
  },  
  {
    rn: 'V',
    val: 5
  },  
  {
    rn: 'IV',
    val: 4
  }, 
  {
    rn: 'I',
    val: 1
  },
]

let str = ''
iterate(value)
function iterate(val) {
  if(val !== 0) {
    const curRef = refs.find(ref => val >= ref.val)
    val = val - curRef.val
    str = `${str}${curRef.rn}`
    iterate(val)
  }
}

</script>

<style lang="scss" scoped>

</style>