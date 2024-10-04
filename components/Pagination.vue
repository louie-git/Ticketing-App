<template>
  <div>
    <div class="flex flex-col items-center gap-3 content-center mx-auto w-full px-4 mt-4 laptop:flex-row laptop:justify-between" >
      <div class="text-sm">
        Total of <span class="font-semibold underline">{{ numTotalTickets }}</span> tickets
      </div>

      <div class="flex">
        
        <button class="cursor-pointer w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 rounded-tl-md rounded-bl-md border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationSkip('first')" :disabled="blnLoading || (numCurrentPage + numPageCursor) === 1">
          <font-awesome :icon="'angles-left'" class="m-auto text-xs" />
        </button>

        <button class="cursor-pointer w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationPrev" :disabled="blnLoading || (numCurrentPage + numPageCursor) === 1">
          <font-awesome :icon="'angle-left'" class="m-auto text-xs" />
        </button>

        <div v-for="(page, index) in Math.ceil(numTotalTickets/numPageLimit)">
          <button class="cursor-pointer  w-8 h-7 flex border border-r-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
            tablet:w-9 tablet:h-8
            laptop:w-10 laptop:h-9 border-slate-300
            disabled:cursor-not-allowed disabled:bg-white disabled:text-black" 
            :class="numCurrentPage === index + 1 && 'bg-indigo-600 text-white hover:opacity-80'" 
            v-if="index + 1 <= numPaginationLimit"
            @click="fnPaginationClick(page)" :disabled="blnLoading && numCurrentPage !==index + 1">
              <p  class="m-auto" >{{ page + numPageCursor }}</p>
          </button>
        </div>

        <!-- i dont know why assigning props value to variable doesn't work, 
        instead I used fn to pass props value and assign it in variable inside the fn. Idiot way -->
        <!-- {{ assignTotalTicket(totalTickets) }} -->

        <button class="cursor-pointer  w-8 h-7 flex border hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 border-slate-300 
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationNext" :disabled="blnLoading || numCurrentPage + numPageCursor >= Math.ceil(numTotalTickets/numPageLimit) ||  numTotalTickets == 0 ">
          <font-awesome :icon="'angle-right'" class="m-auto text-xs" />
        </button>
        <button type="button" class=" w-8 h-7 flex border border-l-0 hover:bg-indigo-500 hover:text-slate-50 transition-colors duration-200
        tablet:w-9 tablet:h-8
        laptop:w-10 laptop:h-9 rounded-tr-md rounded-br-md  border-slate-300
        disabled:cursor-not-allowed disabled:bg-white disabled:text-black"
        @click="fnPaginationSkip('last')" :disabled="blnLoading || numCurrentPage + numPageCursor >= Math.ceil(numTotalTickets/numPageLimit) || numTotalTickets == 0 " >
          <font-awesome :icon="'angles-right'" class="m-auto text-xs" />
        </button>
      </div>
    </div>
    {{ numCurrentPage }} --- {{ numPageCursor }}
    {{ currentPage}} -- {{ pageCursor }}
  </div>
</template>

<script setup>

const props = defineProps({
  totalTickets: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 0
  },
  pageCursor: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['setPage'])
const route = useRoute()

const blnLoading = ref(false)
const numTotalTickets = ref(props.totalTickets)
const numCurrentPage = ref(1)
const numPageLimit = ref(5)
const numPageCursor = ref(0)
const numPaginationLimit = ref(5)


watch(() => props.totalTickets, (newVal, oldVal) =>  numTotalTickets.value = newVal)
watch(() => props.currentPage, (newVal,oldVal) => numCurrentPage.value = newVal)
watch(() => props.pageCursor, (newVal,oldVal) => numPageCursor.value = newVal)


console.log(numTotalTickets.value)

const fnPaginationNext = () => {
  
  console.log('next',numCurrentPage.value)
  let limit = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? 5 : Math.ceil(numTotalTickets.value/numPageLimit.value) // CHeck if the total tickets are morethan 5. if not, assign limit based on the numTotalTicket/5.
  numPaginationLimit.value = limit  // assign the limit that is displayed in  pagination
  if ( numCurrentPage.value+1 <= limit ) {  //move the page +1
    console.log('if',numCurrentPage.value <= limit)
    numCurrentPage.value += 1
  } 
  else {  //if page is = 5, add 1 to cursor to display 6
    if((numCurrentPage.value + numPageCursor.value + 1 )  <= Math.ceil(numTotalTickets.value/numPageLimit.value)) {
      numPageCursor.value += 1
    }
  }
  fnSetPage()
}



const fnPaginationPrev = () => {
  if(numCurrentPage.value != 1){
    numCurrentPage.value -= 1 
  }
  else{ 
    if((numCurrentPage.value - numPageCursor.value) != 1)
    numPageCursor.value -= 1
  }
  console.log('prev',numCurrentPage.value)
  fnSetPage()
}

const fnPaginationClick = (page) => {
  numCurrentPage.value = page 
  fnSetPage()
}

const fnPaginationSkip = (value) => {
  switch (value) {
    case 'last':
      numCurrentPage.value = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? 5 : Math.ceil(numTotalTickets.value/numPageLimit.value)
      numPageCursor.value = Math.ceil(numTotalTickets.value/numPageLimit.value) > 5 ? Math.ceil(numTotalTickets.value/numPageLimit.value) - numPageLimit.value : 0
      console.log(numPageCursor.value, '----', numCurrentPage.value)
      break;
  
    default:
      numCurrentPage.value = 1
      numPageCursor.value = 0;
      break;
  }
  fnSetPage()
}

const fnSetPage = () => {
  console.log('hello')
  console.log(numCurrentPage.value)
  console.log(numPageCursor.value)
  emit('setPage',numCurrentPage.value,numPageCursor.value)
}

onMounted(() => {
  if(route.query.page){
    numCurrentPage.value = route.query.page > 5 ? 5 : parseInt(route.query.page)
    numPageCursor.value = route.query.page > 5 ? parseInt(route.query.page) - 5 : 0
  } 

  console.log(numCurrentPage.value,'---', numPageCursor.value)
})

</script>

<style lang="scss" scoped>

</style>