

const dateFormat = (date) => {
  if(date){
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    return `${monthList[month-1]} ${day}, ${year}`
  }
  return '--'
}

export default dateFormat