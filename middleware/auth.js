
import auth from '../api/auth'

export default defineNuxtRouteMiddleware((to, from) => {

  const isAuthenticated = auth.get().isAuthenticated || false
  const routes =  auth.get().routes ?  [{path: '/', name: 'index'},...auth.get().routes ] : [{path: '/', name: 'index'}]
  if(to.path !== '/' && !isAuthenticated) return navigateTo('/')

  if (to.path === '/' && isAuthenticated) {
    if(routes.some(route => route.path === '/dashboard')) return navigateTo('/dashboard');
    else return navigateTo('/my-tickets')
  }

  if(!routes.some(route => route.path === to.path)) {
    console.log("sdf")
    return navigateTo('404')
    // return createError({ statusCode: 404, statusMessage: `Page /${to.path} not exist.`})
    // throw createError({statusCode: 404, statusMessage: 'Page you are looking notasdf exist.'})
  }
})