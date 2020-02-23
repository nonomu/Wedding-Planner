const Logout = () => {
  sessionStorage.clear()
  return (window.location = '/')
}

export default Logout