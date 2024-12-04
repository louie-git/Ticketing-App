export default defineEventHandler(async(event) => {
  const config = useRuntimeConfig()
  const data =await fetch(`${config.public.server_url}/tickets`)

  return data
  
})