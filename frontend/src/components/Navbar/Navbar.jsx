import './Navbar.scss'

export const Navbar = () => {

  const logOut = () => {
    localStorage.clear()
    window.location.reload()
  };

  return (
    <div className='navbar'>
      {localStorage.getItem("userId") && localStorage.getItem("userId") !== undefined && localStorage.getItem("userId") !== null ?
        <>
          <h2 style={{ textAlign: "center" }}>‎</h2>
          <h2 style={{ textAlign: "center" }}>Feeded!</h2>
          <div>
            <button className='btn btn-link' onClick={logOut}>Log Out</button>
          </div>
        </>
        :
        <>
          <h2 style={{ textAlign: "center" }}>Feeded!</h2>
        </>}

    </div>
  )
}
