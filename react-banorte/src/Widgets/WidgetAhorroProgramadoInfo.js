// Widget con la informacion del ahorro programado
import PropTypes from "prop-types";
import AhorroIcon from "../assets/iconoAhorro.png";
import AutoIcon from "../assets/auto.png";
import CasaIcon from "../assets/casa.png";
import ViajeIcon from "../assets/viaje.png";

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
  width: "100%",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(235, 240, 243)",
};

const titleContainer = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const icon = {
  width: "5rem",
  margin: "1rem",
  backgroundColor: "#ffffff",
  padding: "0.5rem",
  borderRadius: "50%",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
};

const titulo = {
  fontSize: "1.1rem",
  fontWeight: "900",
};

const divider = {
  width: "30%",
  borderTop: "0.3rem solid #F0BE6A",
  marginTop: "1rem",
};

const descripcion = {
  display: "flex",
  flexDirection: "column",
  fontSize: "0.9rem",
  padding: "1rem",
};

const descripcionList = {
  listStyleType: "disc",
  listStylePosition: "outside",
  padding: "1rem 0 1rem 0",
  paddingLeft: "1rem",
};

const descripcionText = {
  color: "#F0BE6A",
  paddingBottom: "1rem",
};

const ejemploIcon = {
  width: "5rem",
  margin: "0.5rem 0.5rem 0.5rem 0",
  backgroundColor: "#ffffff",
  padding: "0.2rem",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
};

function WidgetAhorroProgramadoInfo({ message, webChatInstance }) {
  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={titleContainer}>
          <img src={AhorroIcon} style={icon} alt=""></img>
          <div style={titulo}>¿Qué es un ahorro programado?</div>
          <div style={divider}></div>
        </div>

        <div style={descripcion}>
          <div style={{ width: "90%" }}>
            Es una opción práctica para ahorrar dinero y ayudarte a cumplir con
            tus metas.
          </div>
          <ul style={descripcionList}>
            <li style={descripcionText}>
              <span style={{ color: "black" }}>
                Programa tu ahorro y se hará de forma automática como tú decidas{" "}
                {"(semanal, quincenal o mensual)"}
              </span>
            </li>
            <li style={descripcionText}>
              <span style={{ color: "black" }}>
                Deposita cuando quieras para llegar más rápido a tu meta o
                retira si lo necesitas
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function WidgetAhorroProgramadoPaso1({ message, webChatInstance }) {
  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={{ padding: "1rem" }}>
          <div style={{ fontWeight: "900", fontSize: "1.1rem" }}>Paso #1:</div>
          <div style={{ fontSize: "1.2rem" }}>¿Cuál es tu meta de ahorro?</div>
        </div>
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <div>Algunos ejemplos son: </div>
          <img src={ViajeIcon} style={ejemploIcon} alt=""></img>
          <img src={AutoIcon} style={ejemploIcon} alt=""></img>
          <img src={CasaIcon} style={ejemploIcon} alt=""></img>
        </div>
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          Nombra tu ahorro {"(Máximo 40 caracteres)"}
        </div>
      </div>
    </div>
  );
}

function WidgetAhorroProgramadoPaso2({ message, webChatInstance }) {
  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={{ padding: "1rem" }}>
          <div style={{ fontWeight: "900", fontSize: "1.1rem" }}>Paso #2:</div>
          <div style={{ fontSize: "1.2rem" }}>¿Cuánto quieres ahorrar?</div>
        </div>
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          Cantidad mínima $1.00 MN
        </div>
      </div>
    </div>
  );
}

WidgetAhorroProgramadoInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

WidgetAhorroProgramadoPaso1.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

WidgetAhorroProgramadoPaso2.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export {
  WidgetAhorroProgramadoInfo,
  WidgetAhorroProgramadoPaso1,
  WidgetAhorroProgramadoPaso2,
};
