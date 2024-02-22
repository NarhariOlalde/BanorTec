import PropTypes from "prop-types";
import { useCallback } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

import tarjeta1 from "../assets/Banorte-TDC-Oro-410x290.png";
import tarjeta2 from "../assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta3 from "../assets/Banorte_PorTi_410x290.png";

const urlImageMap = new Map([
  ["oro", tarjeta1],
  ["Enlace", tarjeta2],
  ["Nomina", tarjeta3],
]);

// Estilos CSS para el componente
const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "0.5rem",
};

const titleContainer = {
  width: "100%",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  backgroundColor: "#EB0029",
  color: "#ffffff",
  padding: "1rem",
  display: "flex",
  position: "relative",
  alignItems: "center",
};

const title = {
  fontSize: "1.3rem",
  fontWeight: "900",
  paddingLeft: "1rem",
};

const iconContainer = {
  position: "relative",
};

const icon = {
  fontSize: "1.5rem",
};

const iconBox = {
  width: "1.2rem",
  height: "1.3rem",
  backgroundColor: "#FEB023",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "-0.5rem",
  right: "-0.5rem",
};

const card = {
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  gap: "0.5rem",
};

const avisoContainer = {
  backgroundColor: "rgba(235, 240, 243)",
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
};

const tarjetaFoto = {
  width: "6rem",
  height: "4rem",
};

const infoContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: "0.5rem",
};

const infoDetails = {
  display: "flex",
};

const infoMessage = {
  fontSize: "0.8rem",
};

const miniIcon = {
  fontSize: "1rem",
  marginLeft: "0.3rem",
  alignSelf: "flex-start",
  color: "#EB0029",
};

const infoNombre = {
  fontSize: "1rem",
  fontWeight: "900",
};

function WidgetAvisosTarjetas({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const avisosTarjetas = message.user_defined.data;
  console.log(avisosTarjetas);

  const onCardClick = useCallback(
    (avisoTarjeta) => {
      webChatInstance.send(
        {
          input: {
            text: `${avisoTarjeta}`,
          },
        },
        { silent: true }
      );
    },
    [webChatInstance]
  );

  return (
    <div style={wrapper}>
      <div style={titleContainer}>
        <div style={iconContainer}>
          <FaCircleExclamation style={icon} />
          <div style={iconBox}>{avisosTarjetas.length}</div>
        </div>
        <div style={title}>Tienes {avisosTarjetas.length} avisos</div>
      </div>

      <div style={card}>
        {avisosTarjetas.map((aviso, index) => {
          const { tarjetaNombre, shortMessage } = aviso;
          const image = urlImageMap.get(tarjetaNombre) || tarjetaNombre;

          return (
            <div style={avisoContainer} onClick={() => onCardClick(index)}>
              <img src={image} style={tarjetaFoto} alt="tarjeta" />
              <div style={infoContainer}>
                <div style={infoNombre}>
                  Banorte {tarjetaNombre}
                  <FaCircleExclamation style={miniIcon} />
                </div>
                <div style={infoDetails}>
                  <div style={infoMessage}>{shortMessage}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ color: "#5C6670" }}>
        Haz click sobre el aviso para ver el detalle
      </div>
    </div>
  );
}

WidgetAvisosTarjetas.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetAvisosTarjetas };
