import PropTypes from "prop-types";
import { FaBus } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { IoShirtSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdMovieCreation } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiSoccerBallFill } from "react-icons/pi";
import { IoSchool } from "react-icons/io5";
import { FaSprayCan } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

// Estilos CSS para el componente
const wrapper = {
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
};

const card = {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  fontFamily: "Roboto, sans-serif",
  backgroundColor: "white",
  width: "100%",
};

const header = {
  display: "flex",
};

const headerText = {
  display: "flex",
  flexDirection: "column",
};

const headerTextitle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  paddingBottom: "0.2rem",
};

const headerTextSubtitle = {
  display: "flex",
  gap: "0.5rem",
};

const headerTextPresupuesto = {
  fontSize: "1rem",
  color: "rgba(147, 147, 147)",
  fontWeight: "600",
};

const headerTextCantidad = {
  color: "rgba(89, 89, 89)",
  fontWeight: "600",
  display: "flex",
  alignItems: "flex-end",
};

const headerCantidadSigno = {
  fontSize: "0.7rem",
};

const headerCantidadCantidad = {
  fontSize: "1.2rem",
  paddingBottom: "0.1rem",
};

const headerCantidadMoneda = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "end",
};

const headerCantidadMxn = {
  fontSize: "0.4rem",
  lineHeight: "0.2",
};

const headerCantidadZeros = {
  fontSize: "0.8rem",
};

const icon = {
  fontSize: "2rem",
  paddingRight: "0.8rem",
};

const progreso = {
  display: "flex",
  flexDirection: "column",
  paddingTop: "1rem",
};

const progresoTitle = {
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: "0.5rem",
  alignItems: "flex-end",
};

const progresoPorcentaje = {
  fontSize: "1.4rem",
  fontWeight: "600",
  paddingLeft: "1rem",
  marginBottom: "-0.1rem",
};

const progresoDinero = {
  display: "flex",
  color: "rgba(89, 89, 89)",
  alignItems: "flex-end",
  fontWeight: "600",
};

const progresoSigno = {
  fontSize: "0.9rem",
};

const progresoCantidad = {
  fontSize: "1.6rem",
  lineHeight: "0.9",
};

const progresoMoneda = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  lineHeight: "0.9",
  textAlign: "center",
};

const progresoMxn = {
  fontSize: "0.5rem",
  alignSelf: "flex-end",
};

const progresoZeros = {
  fontSize: "1.1rem",
};

const progresoBarra = {
  position: "relative",
};

const progresoColor = {
  height: "1.3rem",
  zIndex: "0",
  position: "absolute",
  borderRadius: "2rem",
};

const progresoLimite = {
  backgroundColor: "rgba(225, 225, 225)",
  height: "1.3rem",
  zIndex: "1",
  borderRadius: "2rem",
};

const progresoFooter = {
  fontWeight: "600",
  fontSize: "1rem",
  paddingLeft: "0.6rem",
  paddingTop: "0.3rem",
};

function WidgetCategoria({ message, webChatInstance }) {
  // Informacion de las categorias
  const categorias = message.user_defined.data;

  return (
    <div style={wrapper}>
      {categorias.map((categoria) => {
        return (
          <div style={card}>
            <div style={header}>
              <div>{renderIcon(categoria)}</div>
              <div style={headerText}>
                <div
                  style={{ ...headerTextitle, ...{ color: categoria.color } }}
                >
                  {categoria.categoria}
                </div>
                <div style={headerTextSubtitle}>
                  <div style={headerTextPresupuesto}>Presupuesto</div>
                  <div style={headerTextCantidad}>
                    <div style={headerCantidadSigno}>$</div>
                    <div style={headerCantidadCantidad}>
                      {categoria.presupuesto}
                    </div>
                    <div style={headerCantidadMoneda}>
                      <div style={headerCantidadMxn}>MXN</div>
                      <div style={headerCantidadZeros}>.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={progreso}>
              <div style={progresoTitle}>
                <div
                  style={{
                    ...progresoPorcentaje,
                    ...{ color: categoria.color },
                  }}
                >
                  {categoria.porcentaje}%
                </div>
                <div style={progresoDinero}>
                  <div style={progresoSigno}>$</div>
                  <div style={progresoCantidad}>{categoria.gastado}</div>
                  <div style={progresoMoneda}>
                    <div style={progresoMxn}>MXN</div>
                    <div style={progresoZeros}>.00</div>
                  </div>
                </div>
              </div>
              <div style={progresoBarra}>
                <div
                  style={{
                    ...progresoColor,
                    ...{
                      backgroundColor: categoria.color,
                      width: `${categoria.porcentaje}%`,
                    },
                  }}
                ></div>
                <div style={progresoLimite}></div>
              </div>
              <div style={{ ...progresoFooter, ...{ color: categoria.color } }}>
                Gastado
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Se muestra el icono dependiendo de la categoria seleccionada
function renderIcon(categoria) {
  const style = { ...icon, ...{ color: categoria.color } };
  switch (categoria.categoria) {
    case "Transporte":
      return <FaBus style={style} />;
    case "Comida":
      return <MdFastfood style={style} />;
    case "Ropa":
      return <IoShirtSharp style={style} />;
    case "Salud":
      return <FaHeart style={style} />;
    case "Entretenimiento":
      return <MdMovieCreation style={style} />;
    case "Tecnologia":
      return <MdDevices style={style} />;
    case "Servicios":
      return <MdMiscellaneousServices style={style} />;
    case "Viajes":
      return <IoAirplaneSharp style={style} />;
    case "Casa":
      return <FaHouseChimney style={style} />;
    case "Vehiculo":
      return <FaCar style={style} />;
    case "Departamental":
      return <FaStore style={style} />;
    case "Super":
      return <IoStorefront style={style} />;
    case "Mascotas":
      return <MdOutlinePets style={style} />;
    case "Deportes":
      return <PiSoccerBallFill style={style} />;
    case "Educacion":
      return <IoSchool style={style} />;
    case "Belleza":
      return <FaSprayCan style={style} />;
    case "Compras en Linea":
      return <FaCartPlus style={style} />;
    case "Otros":
      return <FaInfoCircle style={style} />;
    default:
      return <></>;
  }
}

WidgetCategoria.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetCategoria };
