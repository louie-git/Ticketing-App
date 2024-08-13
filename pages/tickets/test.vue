<template>
  <div>
    hello
  </div>
</template>

<script setup>
import { ref } from 'vue';


let value = 578
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
console.log(str)

</script>

<style lang="scss" scoped>

</style>