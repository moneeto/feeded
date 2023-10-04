import { useEffect, useState } from "react"
import moment from "moment"
import './Historial.scss'
import { Link } from "react-router-dom"
 
export const Historial = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getHistorial = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:9000/historial', {
        method: "POST",
        body: JSON.stringify({ tiempoHistorial: 1 }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      setData(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    getHistorial()
  }, [])


  // Seguir con historial por fecha. (Agregar onChange al select)

  if (loading) {
    return <div className="spinner-border m-5" role="status" style={{ position: "absolute", top: "45%", left: "45%" }}></div>
  } else {
    return (
      <div>
        <div className="table-responsive-sm">
          <div className="historialInputs">
            <Link to={"/"}>
              <button className="btn btn-outline-secondary">Volver</button>
            </Link>
            
            <div className="selectFecha">
              <span className="textoSelect">Ver historial por fecha:</span>
              <select>
                <option value={1}>Hoy</option>
                <option value={2}>Últimos 7 dias</option>
                <option value={3}>Últimos 30 dias</option>
              </select>
            </div>


          </div>

          <table className="table table-striped table-dark table-hover">
            <thead style={{ position: "sticky", top: "0" }}>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Usuario</th>
                <th scope="col">Nombre completo</th>
                <th scope="col">Acción</th>
                <th scope="col">Fecha de acción</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(d => {
                return (
                  <tr key={d.idAccionUsuario}>
                    <td>{d.idAccionUsuario}</td>
                    <td>{d.usuario}</td>
                    <td>{d.nombreApellido}</td>
                    <td>{d.accion}</td>
                    <td>{moment(d.fechaAccion).format("DD/MM/YYYY HH:mm:ss")}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}