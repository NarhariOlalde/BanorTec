import PropTypes from "prop-types";
import { BiSolidDollarCircle } from "react-icons/bi";
import PiggyBankIcon from "../assets/piggybank.png";

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
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.1rem rgba(0,0,0,0.15)",
  minWidth: "100%",
};

const header = {
  padding: "1rem 2rem 1rem 2rem",
  background: "#FC1E7B",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "1rem 1rem 0 0",
  color: "white",
  position: "relative",
};

const dinero = {
  display: "flex",
  alignItems: "flex-end",
  paddingBottom: "0.3rem",
};

const dineroSimbolo = {
  fontSize: "1.2rem",
};

const dineroCantidad = {
  fontSize: "2.3rem",
  fontWeight: "600",
  lineHeight: "0.9",
};

const dineroContenedor = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0.5rem",
};

const dineroMxn = {
  fontSize: "0.6rem",
};

const dineroCero = {
  fontSize: "1.2rem",
};

const body = {
  backgroundColor: "#F9F9F9",
  borderRadius: "0 0 1rem 1rem",
  display: "flex",
};

const ingresos = {
  width: "50%",
  padding: "1rem",
  borderRight: "0.1rem solid rgba(210, 215, 211)",
  color: "#855698",
};

const gastos = {
  width: "50%",
  padding: "1rem",
  color: "#FEAE1F",
};

const elementoTitle = {
  display: "flex",
  justifyContent: "center",
  fontWeight: "600",
};

const elementoIcon = {};

const elementoTexto = {
  paddingLeft: "0.3rem",
};

const elementoContainer = {
  display: "flex",
  alignItems: "flex-end",
};

const elementoContainerSimbolo = {
  fontSize: "0.8rem",
};

const elementoContainerCantidad = {
  fontSize: "1.2rem",
  lineHeight: "0.9",
  fontWeight: "600",
};

const elementoContainerContenedor = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};

const elementoContainerMxn = {
  fontSize: "0.45rem",
  lineHeight: "0.1rem",
};

const elementoContainerCero = {
  fontSize: "0.8rem",
  lineHeight: "0.9rem",
};

const icon = {
  fontSize: "1.2rem",
};

const piggyBankImage = {
  width: "2.2rem",
  position: "absolute",
  top: "1.2rem",
  left: "1rem",
};

function WidgetSaludFinanciera({ message, webChatInstance }) {
  // Informacion acerca del tip financiero. Ademas se parsea el objeto de JSON a un objeto de JS
  const jsonObj = message.user_defined.data.replace(/'/g, '"');
  const datosBancarios = JSON.parse(jsonObj);

  // Modifica el string del saldo, ingresos y gastos
  const saldoTotal = `${
    datosBancarios.ingresos - datosBancarios.gastos
  }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const ingresosTotales = `${datosBancarios.ingresos}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  const gastosTotales = `${datosBancarios.gastos}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={header}>
          <img src={PiggyBankIcon} style={piggyBankImage}></img>
          <div style={dinero}>
            <div style={dineroSimbolo}>$</div>
            <div style={dineroCantidad}>{saldoTotal}.</div>
            <div style={dineroContenedor}>
              <div style={dineroMxn}>MXN</div>
              <div style={dineroCero}>00</div>
            </div>
          </div>

          <div>Saldo total</div>
        </div>

        <div style={body}>
          <div style={ingresos}>
            <div style={elementoTitle}>
              <div style={elementoIcon}>
                <BiSolidDollarCircle style={icon} />
              </div>
              <div style={elementoTexto}>Ingresos</div>
            </div>

            <div style={elementoContainer}>
              <div style={elementoContainerSimbolo}>$</div>
              <div style={elementoContainerCantidad}>{ingresosTotales}.</div>
              <div style={elementoContainerContenedor}>
                <div style={elementoContainerMxn}>MXN</div>
                <div style={elementoContainerCero}>00</div>
              </div>
            </div>
          </div>

          <div style={gastos}>
            <div style={elementoTitle}>
              <div style={elementoIcon}>
                <BiSolidDollarCircle style={icon} />
              </div>
              <div style={elementoTexto}>Gastos</div>
            </div>

            <div style={elementoContainer}>
              <div style={elementoContainerSimbolo}>$</div>
              <div style={elementoContainerCantidad}>{gastosTotales}.</div>
              <div style={elementoContainerContenedor}>
                <div style={elementoContainerMxn}>MXN</div>
                <div style={elementoContainerCero}>00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WidgetSaludFinanciera.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetSaludFinanciera };
