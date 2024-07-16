export default defineEventHandler((event) => {


  const colors = ['yellow', 'white', 'pink', 'blue', 'red', 'green']
  let dice1 = ''
  let dice2 = ''
  let dice3 = ''
  let c1 = 0
  let c2 = 0
  let c3 = 0
  let c4 = 0
  let c5 = 0
  let c6 = 0
  let hc1 = 0
  let hc2 = 0
  let hc3 = 0
  let hc4 = 0
  let hc5 = 0
  let hc6 = 0
  let results = []
  for(let i = 0 ; i<100 ; i++ ){
    dice1 = colors[Math.floor(Math.random() * 6)]
    dice2 = colors[Math.floor(Math.random() * 6)]
    dice3 = colors[Math.floor(Math.random() * 6)]
 

    let comb = [dice1, dice2, dice3]

    colors.forEach(color => {

      if(!comb.includes(color)){
        switch (color) {
          case 'yellow': 
            c1 +=1
            if(c1>hc1) {
              hc1 = c1
            }
          break
          case 'white': 
            c2 +=1
            if(c2>hc2) {
              hc2 = c2
            }
          break
          case 'pink': 
            c3 +=1
            if(c3>hc3) {
              hc3 = c3
            }
          break
          case 'blue': 
            c4 +=1
            if(c4>hc4) {
              hc4 = c4
            }
          break
          case 'red': 
            c5 +=1
            if(c5>hc5) {
              hc5 = c5
            }
          break
          case 'green': 
            c6 +=1
            if(c6>hc6) {
              hc6 = c6
            }
          break
          default:
        }
      }
      else {
        switch (color) {
          case 'yellow': 
          c1 = 0
        break
        case 'white': 
          c2 = 0
        break
        case 'pink': 
          c3 = 0
        break
        case 'blue': 
          c4 = 0
        break
        case 'red': 
          c5 = 0
        break
        case 'green': 
          c6 = 0
        break
        default:
        }
      }
    })

    results.push(comb)
  }

  return  {
    results,
    yellow:hc1,
    white:hc2,
    pink:hc3,
    blue:hc4,
    red:hc5,
    green:hc6
  }
  
})