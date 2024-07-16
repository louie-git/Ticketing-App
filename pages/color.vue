<template>
  <div>
    <h1>color</h1>
    <div class="flex flex-wrap px-2 py-3">
      <div class="py-2" v-for="result in results" >
     <!-- <p> {{ result }}</p> -->
        <div class="mx-[1px]"  v-for="color in result" >
          <div class="w-3 h-3 border-[0.5px] border-black " :class="`bg-[${color}]`"></div>
        </div>
      </div>
    </div>

    <p>Highest round that the specific color didn't appear</p>
    <div class="px-3">

      <div class="mb-2 flex items-center">
        <div class="bg-[yellow] w-3 h-3 border border-black"></div>
        <p> = {{ yellow }}</p>
      </div>
      <div class="mb-2 flex items-center">
        <div class="bg-[white] w-3 h-3 border border-black"></div>
        <p> = {{ white }}</p>
      </div>
      <div class="mb-2 flex items-center">
        <div class="bg-[pink] w-3 h-3 border border-black"></div>
        <p> = {{ pink }}</p>
      </div>
      <div class="mb-2 flex items-center">
        <div class="bg-[blue] w-3 h-3 border border-black"></div>
        <p> = {{ blue }}</p>
      </div>
      <div class="mb-2 flex items-center">
        <div class="bg-[red] w-3 h-3 border border-black"></div>
        <p> = {{ red }}</p>
      </div>
      <div class="mb-2 flex items-center">
        <div class="bg-[green] w-3 h-3 border border-black"></div>
        <p> = {{ green }}</p>

      </div>
    </div>

    <button class="py-1 px-3 bg-blue-100" @click="ran">click me</button>
  </div>


</template>

<script setup>


const results = ref([])
const yellow = ref(0)
const white = ref(0)
const pink = ref(0)
const blue = ref(0)
const red = ref(0)
const green = ref(0)



// const colors = ref(['yellow', 'white', 'pink', 'blue', 'red', 'green'])
// let dice1 = ref('')
// let dice2 = ref(''blue)
// let dice3 = ref('')
// let blue = 'blue'
// let results = ref([])
// // console.log(dice1.value, dice2.value, dice3.value)
// // console.log(res1.value)
// for(let i = 0 ; i<5 ; i++ ){
//   dice1.value = colors.value[Math.floor(Math.random() * 6)]
//   dice2.value = colors.value[Math.floor(Math.random() * 6)]
//   dice3.value = colors.value[Math.floor(Math.random() * 6)]
//   // console.log(result.value = `${dice1.value} - ${dice2.value} - ${dice3.value}`)
//   let combination = {
//     color1 : dice1.value,
//     color2: dice2.value,
//     color3: dice3.value
//   }
//   results.value.push(combination)
// }

// console.log('yhid',results.value)

const ran = async () => {
  const {data} = await useFetch('/api/color')
  results.value = data.value.results
  yellow.value = data.value.yellow
  white.value = data.value.white
  pink.value = data.value.pink
  blue.value = data.value.blue
  red.value = data.value.red
  green.value = data.value.green
}


</script>

<style lang="scss" scoped>

</style>