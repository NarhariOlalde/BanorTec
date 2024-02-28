import PropTypes from "prop-types";
import Usuario5678 from "../assets/5678.png";
import Usuario9101 from "../assets/9101.png";

const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const titleContainer = {
  alignSelf: "flex-end",
  borderRadius: "1rem 1rem 0 0",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  backgroundColor: "#5C6670",
  color: "#ffffff",
  padding: "0.5rem 1rem 0.5rem 1rem",
  fontSize: "1.1rem",
  fontWeight: "700",
  width: "70%",
  display: "flex",
  justifyContent: "center",
};

const card = {
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "0.5rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  position: "relative",
  padding: "0.3rem",
  display: "flex",
  gap: "0.5rem",
};

const usuarioFoto = {
  width: "5rem",
};

function WidgetRecordatorioDetalles({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const fechaRecordatorio = message.user_defined.fechaRecordatorio;
  const predMonto = message.user_defined.predMonto;
  const accountDestination = message.user_defined.accountDestination;

  return (
    <div style={wrapper}>
      <div style={titleContainer}>{fechaRecordatorio}</div>
      <div style={card}>
        <div>
          <img
            src={
              accountDestination === "Valeria Fernandez"
                ? Usuario5678
                : Usuario9101
            }
            style={usuarioFoto}
            alt="perfil"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "1rem" }}>
            ¿Quieres pagar&nbsp;
            <span style={{ fontWeight: "700", fontStyle: "italic" }}>
              ${predMonto}
              .00
            </span>
            &nbsp;a la cuenta de&nbsp;
            <span style={{ fontStyle: "italic", fontWeight: "700" }}>
              "{accountDestination}"
            </span>{" "}
            como cada mes?
          </div>
        </div>
      </div>
    </div>
  );
}

WidgetRecordatorioDetalles.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetRecordatorioDetalles };
