import PropTypes from "prop-types";
import { useCallback } from "react";
// import { FaBell } from "react-icons/fa";
import UsuarioImagen from "../assets/perfil.png";

// Estilos CSS para el componente
const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingBottom: "0.5rem",
};

// const titleContainer = {
//   width: "100%",
//   borderRadius: "1rem",
//   boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
//   backgroundColor: "#5C6670",
//   color: "#ffffff",
//   padding: "1rem",
//   display: "flex",
//   position: "relative",
//   alignItems: "center",
// };

// const title = {
//   fontSize: "1.3rem",
//   fontWeight: "900",
//   paddingLeft: "1rem",
// };

// const iconContainer = {
//   position: "relative",
// };

// const icon = {
//   fontSize: "1.5rem",
// };

// const iconBox = {
//   width: "1.2rem",
//   height: "1.3rem",
//   backgroundColor: "red",
//   borderRadius: "50%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   position: "absolute",
//   top: "-0.5rem",
//   right: "-0.5rem",
// };

const titleContainer = {
  borderRadius: "1rem 1rem 0 0",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  backgroundColor: "#5C6670",
  color: "#ffffff",
  padding: "0.5rem 1rem 0.5rem 1rem",
  fontSize: "1.1rem",
  fontWeight: "700",
  width: "80%",
};

const card = {
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "0.5rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  gap: "0.5rem",
  cursor: "pointer",
};

const recordatorioContainer = {
  backgroundColor: "rgba(235, 240, 243)",
  padding: "0.5rem",
  display: "flex",
};

const usuarioFoto = {
  width: "4rem",
};

const infoContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: "0.5rem",
  justifyContent: "space-between",
};

const infoDetails = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
};

const infoNombre = {
  fontSize: "1.3rem",
  fontWeight: "900",
  color: "#5C6670",
};

const infoFecha = {
  fontSize: "1.1rem",
};

const infoDinero = {
  fontSize: "1.3rem",
  fontWeight: "900",
};

function WidgetListaRecordatorios({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const recordatorios = message.user_defined.data;

  const onCardClick = useCallback(
    (recordatorio) => {
      webChatInstance.send(
        {
          input: {
            text: `${recordatorio}`,
          },
        },
        { silent: true }
      );
    },
    [webChatInstance]
  );

  return (
    <div style={wrapper}>
      {/* <div style={titleContainer}>
        <div style={iconContainer}>
          <FaBell style={icon} />
          <div style={iconBox}>{recordatorios.length}</div>
        </div>
        <div style={title}>Tienes {recordatorios.length} recordatorios</div>
      </div> */}

      <div style={titleContainer}>Recordatorios de pagos</div>

      <div style={card}>
        {recordatorios.map((recordatorio, index) => {
          const { accountDestination, fechaRecordatorio, predMonto } =
            recordatorio;
          return (
            <div
              style={recordatorioContainer}
              onClick={() => onCardClick(index)}
            >
              <img src={UsuarioImagen} style={usuarioFoto} alt="perfil" />
              <div style={infoContainer}>
                <div style={infoNombre}>{accountDestination}</div>
                <div style={infoDetails}>
                  <div style={infoFecha}>{fechaRecordatorio}</div>
                  <div style={infoDinero}>${predMonto}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ color: "#5C6670", paddingTop: "0.5rem" }}>
        Haz click sobre el recordatorio para ver detalle
      </div>
    </div>
  );
}

WidgetListaRecordatorios.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetListaRecordatorios };
