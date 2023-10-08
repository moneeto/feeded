import { useEffect, useState } from "react"
import moment from "moment"
import './Historial.scss'
import patita from '../../media/patitaCorreccion.png'
import { Container } from 'reactstrap'
import { Link } from "react-router-dom"

export const Historial = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectFecha, setSelectFecha] = useState(1)


  const getHistorial = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:9000/historial', {
        method: "POST",
        body: JSON.stringify({ tiempoHistorial: selectFecha }),
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
  }, [selectFecha])


  // Seguir con historial por fecha. (Agregar onChange al select)

  if (loading) {
    return <div className="spinner-border m-5" role="status" style={{ position: "absolute", top: "45%", left: "45%" }}></div>
  } else {
    return (
      <div>
        <div className="table-responsive-sm">
          <div className="historialInputs">
            <Link to={"/"}>
              <div className="card-volver">
                <img src={patita} className="patita" style={{maxWidth: "130px",height: "auto"}}/>
                <span className="volverHistorial">Volver</span>
              </div>
            </Link>

            <div className="selectFecha">
              <span className="textoSelect">Ver historial por fecha:</span>
              <select value={selectFecha} onChange={(e) => setSelectFecha(e.target.value)}>
                <option value={1}>Hoy</option>
                <option value={2}>Últimos 7 dias</option>
                <option value={3}>Últimos 30 dias</option>
              </select>
            </div>


          </div>

          <div className="table-div">
            <Container fluid style={{ maxHeight: "500px", overflowY: "auto", width: "90%" }}>
              <table className="table table-striped table-dark table-hover">
                <thead style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th scope="col">Fecha de acción</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre completo</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? data?.map(d => {
                    return (
                      <tr key={d.idAccionUsuario}>
                        <td>{moment(d.fechaAccion).format("DD/MM/YYYY HH:mm:ss")}</td>
                        <td>{d.usuario}</td>
                        <td>{d.nombreApellido}</td>
                        <td>{d.accion}</td>
                      </tr>
                    )
                  })
                :
                <tr>
                  <td>Aún no hubo ninguna acción!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>}
                </tbody>
              </table>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}