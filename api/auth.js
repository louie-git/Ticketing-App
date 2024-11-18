

const set = (data) => {
  localStorage.setItem('auth', JSON.stringify({
    'access_token': data.access_token,
    'isAuthenticated': data.isAuthenticated,
    'routes': data.routes
  }))
  return
}

const get = () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  return {
    access_token: auth ?  auth.access_token : '' ,
    isAuthenticated: auth ?  auth.isAuthenticated : false,
    routes: auth ?  auth.routes : []

  }
}

export default {
  set,
  get
}