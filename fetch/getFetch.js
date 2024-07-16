

const getFetch = async (url) => {


  let message = ''
  let response_error = {}
  let data 
  try {
    data = await $fetch(url)
    message = 'Request Success'
  } catch (error) {
    console.log(error)
    response_error = {name: 'Server error.', status: 400}
    message = 'Error while fetching data in server.'
  }
  return {
    data,
    response_error,
    message
  }
}



export default getFetch