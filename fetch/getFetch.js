

const getFetch = async (url, queries = {}) => {

  let queryString = ''
  if(queries) queryString = Object.entries(queries).map(query => `${query[0]}=${query[1]}`).join('&')
  
  let message = ''
  let response_error = {}
  let data 
  try {
    data = await $fetch(`${url}?${queryString}`)
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