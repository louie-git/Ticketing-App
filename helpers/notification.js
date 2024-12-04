

export default (data = {message: '', success : true}) => {
  const objNotif = {
    show: true,
    message: data.message,
    success: data.success
  }
  return objNotif
}