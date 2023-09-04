/* eslint-disable */

import { useEffect, useState } from "react"
import { Alimentar } from "../Alimentar/Alimentar"
import { Historial } from "../Historial/Historial"

export const Menu = () => {

  const [menus, setMenus] = useState([])

  useEffect(() => {
    getMenus()
  }, [])

  const getMenus = async () => {
    try {
      const response = await fetch('http://localhost:9000/menu')
      const data = await response.json()
      setMenus(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(menus)

  return (
    <div>
      {menus && menus.length > 0 ?  
      menus.map(menu => {
        return <div key={menu.idMenu}>
          <h3>{menu.nombreMenu}</h3>
        </div>
      })
      : <span>No se encontraron menús disponibles</span>}
    </div>
  )
}
