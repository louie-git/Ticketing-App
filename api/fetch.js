
const get = async (url, queries = {}) => {
  let queryString = ''
  if(queries) queryString = Object.entries(queries).map(query => `${query[0]}=${query[1]}`).join('&')
  
    let data 
    let error_response = ''
  try {
    data = await $fetch(`${url}?${queryString}`)
  } catch (error) {
    if(!error.data) error_response = 'Server is down.'
    else error_response = error.data.message
  }
  return {
    data,
    response_error,
  }
}

const post = async (url, body) => {


  let response
  let error_response 
  console.log('herer')
  try {
    const res = await $fetch(`${url}`, {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body)
    })
    response = res.message
  } catch (error) {
    console.log(error)
    if(!error.data) error_response = 'Server is down'
    else error_response = error.data.message
  }

  return {
    response,
    error_response
  }
}



export default {
  get,
  post
}