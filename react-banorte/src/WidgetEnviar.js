import PropTypes from "prop-types";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

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
  justifyContent: "center",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.1rem rgba(0,0,0,0.15)",
  minWidth: "100%",
  padding: "2rem 1rem 2rem 1rem",
  gap: "1rem",
  alignItems: "center",
  backgroundColor: "white",
};

const info = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};

const dineroContainer = {
  display: "flex",
  alignItems: "flex-end",
};

const dineroSimbolo = {
  fontSize: "1.2rem",
};

const dineroCantidad = {
  fontSize: "2.5rem",
  fontWeight: "900",
  lineHeight: "2.0rem",
};

const dineroCont = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const dineroMxn = {
  fontSize: "0.5rem",
  lineHeight: "0.1rem",
};

const dineroCeros = {
  fontSize: "1.1rem",
};

const dineroCard = {
  borderRadius: "1rem",
  color: "white",
  padding: "0.5rem 1rem 0.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.1rem",
  alignItems: "center",
  width: "100%",
};

const dineroDesde = {
  fontSize: "0.7rem",
};

const dineroTarjeta = {
  textTransform: "uppercase",
  fontWeight: "400",
  fontSize: "1.2rem",
};

const dineroDigital = {
  fontSize: "0.6rem",
  textTransform: "uppercase",
};

const icon = {
  fontSize: "2rem",
  color: "#E659AD",
};

const perfil = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const perfilFoto = {
  fontSize: "4rem",
  paddingBottom: "0.2rem",
};

const perfilNombre = {
  textTransform: "uppercase",
  fontSize: "1.1rem",
};

const colorRed = {
  backgroundColor: "#EB0027",
};

const colorGold = {
  backgroundColor: "#F1C75A",
};

function WidgetEnviar({ message, webChatInstance }) {
  const nombreTarjeta = message.user_defined.data;

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={info}>
          <div style={dineroContainer}>
            <div style={dineroSimbolo}>$</div>
            <div style={dineroCantidad}>700</div>
            <div style={dineroCont}>
              <div style={dineroMxn}>MXN</div>
              <div style={dineroCeros}>.00</div>
            </div>
          </div>

          <div
            style={{
              ...dineroCard,
              ...(nombreTarjeta === "Oro" ? colorGold : colorRed),
            }}
          >
            <div style={dineroDesde}>desde</div>
            <div style={dineroTarjeta}>{nombreTarjeta}</div>
            <div style={dineroDigital}>digital</div>
          </div>
        </div>

        <MdOutlineArrowForwardIos style={icon} />

        <div style={perfil}>
          <IoPerson style={perfilFoto} />
          <div style={perfilNombre}>Valeria</div>
        </div>
      </div>
    </div>
  );
}

WidgetEnviar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetEnviar };
