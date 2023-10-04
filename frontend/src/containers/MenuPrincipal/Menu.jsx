/* eslint-disable */

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alimentar } from "../Alimentar/Alimentar"
import { Historial } from "../Historial/Historial"
import 'bootstrap/dist/css/bootstrap.css';
import './Menu.scss'

export const Menu = () => {

  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMenus()
  }, [])

  const getMenus = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:9000/menu')
      const data = await response.json()
      setMenus(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  //                         [
  //                           { idMenu: 1, nombreMenu: 'Empezar' },
  //                           { idMenu: 2, nombreMenu: 'Historial' }
  //                         ]
  if (loading) {
    return <div className="spinner-border m-5" role="status" style={{ position: "absolute", top: "45%", left: "45%" }}></div>
  } else {
    return (
      <div className="menuPrincipal">
        <h1 className="menuPrincipal-title">Menú Principal</h1>
        {menus && menus.length > 0 ?
          menus.map(menu => {
            return <div key={menu.idMenu}>
              <Link to={`/${String(menu.nombreMenu).toLowerCase()}`} state={{ menu: menu.nombreMenu }}>
                <button className={`botonMenu btn${menu.idMenu === 1 ? ' btn-primary' : ' btn-secondary'}`}>{menu.nombreMenu}</button>
              </Link>
            </div>
          })
          : <span>No se encontraron menús disponibles</span>}
      </div>
    )
  }
}
