import { useState } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { FaBell } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

// Estilos CSS para el componente
const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "0.5rem",
  paddingBottom: "1rem",
};

const titleContainer = {
  width: "100%",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  backgroundColor: "#5C6670",
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
  backgroundColor: "#EB0029",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "-0.5rem",
  right: "-0.5rem",
};

const dashboard = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
};

const dashboardCard = {
  backgroundColor: "#ffffff",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.05)",
  flex: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  position: "relative",
  color: "#ffffff",
  cursor: "pointer",
};

const dashboardIcon = {
  fontSize: "5rem",
  color: "#5C6670",
};

const selectedDashboardCard = {
  backgroundColor: "#5C6670",
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.05)",
  flex: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  position: "relative",
  color: "#5C6670",
  cursor: "pointer",
};

const selectedDashboardIcon = {
  fontSize: "5rem",
  color: "#ffffff",
};

const dashboardItem = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#5C6670",
  position: "relative",
};

const selectedDashboardItem = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#ffffff",
  position: "relative",
};

const dashboardIconBox = {
  width: "1.2rem",
  height: "1.2rem",
  backgroundColor: "#EB0029",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "-0.5rem",
  right: "-1rem",

  fontSize: "1rem",
  fontWeight: "900",
  color: "#ffffff",
};

function WidgetNotificaciones({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const recordatorios = message.user_defined.recordatorios;
  const avisosTarjetas = message.user_defined.avisos;
  const conteoNotificaciones = avisosTarjetas.length + recordatorios.length;

  const [selectedButton, setSelectedButton] = useState("");

  const onCardClick = useCallback(
    (categoria) => {
      setSelectedButton(categoria);
      webChatInstance.send(
        {
          input: {
            text: `${categoria}`,
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
          <FaBell style={icon} />
          <div style={iconBox}>{conteoNotificaciones}</div>
        </div>
        <div style={title}>Tienes {conteoNotificaciones} notificaciones</div>
      </div>
      <div style={dashboard}>
        <div
          style={
            selectedButton === "aviso" ? selectedDashboardCard : dashboardCard
          }
          onClick={() => onCardClick("aviso")}
        >
          <div style={iconContainer}>
            <FaAddressCard
              style={
                selectedButton === "aviso"
                  ? selectedDashboardIcon
                  : dashboardIcon
              }
            />
          </div>
          <div
            style={
              selectedButton === "aviso" ? selectedDashboardItem : dashboardItem
            }
          >
            Cuentas
            <div style={dashboardIconBox}>{avisosTarjetas.length}</div>
          </div>
        </div>
        <div
          style={
            selectedButton === "recordatorio"
              ? selectedDashboardCard
              : dashboardCard
          }
          onClick={() => onCardClick("recordatorio")}
        >
          <div style={iconContainer}>
            <FaMoneyBillTransfer
              style={
                selectedButton === "recordatorio"
                  ? selectedDashboardIcon
                  : dashboardIcon
              }
            />
          </div>
          <div
            style={
              selectedButton === "recordatorio"
                ? selectedDashboardItem
                : dashboardItem
            }
          >
            Pagos
            <div style={dashboardIconBox}>{recordatorios.length}</div>
          </div>
        </div>
      </div>
      <div style={{ color: "#5C6670" }}>
        Haz click sobre una categoría para ver las notificaciones o realiza una
        pregunta
      </div>
    </div>
  );
}

WidgetNotificaciones.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetNotificaciones };
