import PropTypes from "prop-types";

import tarjeta1 from "../assets/Banorte-TDC-Oro-410x290.png";
import tarjeta2 from "../assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta3 from "../assets/Banorte_PorTi_410x290.png";

const urlImageMap = new Map([
  ["Banorte-TDC-Oro-410x290.png", tarjeta1],
  ["Banorte-TDC-Clasica-410x290.png", tarjeta2],
  ["Banorte_PorTi_410x290.png", tarjeta3],
]);

// Estilos CSS para el componente
const wrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
};

const card = {
  width: "80%",
  backgroundColor: "#ffffff",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const imageContainer = {
  transform: "scale(1.1) translateX(0.2rem) translateY(-0.1rem)",
};
const tarjetaImage = {
  width: "100%",
  zIndex: "0",
};

const tarjetaNumero = {
  position: "absolute",
  fontSize: "1.1rem",
  bottom: "2rem",
  left: "2rem",
  color: "white",
  fontWeight: "800",
};

const tarjetaVencimiento = {
  position: "absolute",
  fontSize: "1rem",
  top: "5rem",
  right: "1.5rem",
  color: "white",
  fontWeight: "800",
};

const infoContainer = {
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem 1rem 0.5rem 1rem",
};

const saldoLabel = {
  fontSize: "1rem",
};

function WidgetAlternativa({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const saldo = message.user_defined.saldo;
  const nombre = message.user_defined.tarjeta;
  const numero = message.user_defined.numero;
  const vencimiento = message.user_defined.fechaVencimiento;

  const tarjeta =
    nombre === "Oro" ? tarjeta1 : nombre === "Enlace" ? tarjeta2 : tarjeta3;
  const image = urlImageMap.get(tarjeta) || tarjeta;

  return (
    <div style={wrapper}>
      <div
        style={{
          ...card,
          borderBottom: `0.5rem solid ${
            nombre === "Oro"
              ? "#E3B758"
              : nombre === "Enlace"
              ? "#CF0A2D"
              : "#393939"
          }`,
        }}
      >
        <div style={imageContainer}>
          <img style={tarjetaImage} src={image} alt={nombre} />
          <div style={tarjetaNumero}>{"**** " + numero.slice(-4)}</div>
          <div style={tarjetaVencimiento}>{vencimiento}</div>
        </div>

        <div style={infoContainer}>
          <div style={{ marginTop: "-0.5rem" }}>
            <div
              style={{
                color: "#393939",
                fontSize: "1.4rem",
                fontWeight: "800",
              }}
            >
              Banorte {nombre}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "0.5rem 0 0.5rem 0",
              }}
            >
              <div style={saldoLabel}>Saldo:</div>
              <div
                style={{
                  display: "flex",
                  color: "black",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                  $
                </div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    padding: "0 0.2rem 0 0.1rem",
                    fontWeight: "500",
                  }}
                >
                  {saldo}
                </div>
                <div style={{ fontSize: "0.6rem", lineHeight: "0.6rem" }}>
                  <div>MXN</div>
                  <div>.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WidgetAlternativa.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetAlternativa };
