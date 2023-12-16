import PropTypes from "prop-types";
import { FaLightbulb } from "react-icons/fa";
import Tip from "./assets/tip.png";

const wrapper = {
  margin: "0",
  padding: "0",
  display: "flex",
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
  width: "70%",
  alignItems: "center",
  textTransform: "uppercase",
  fontStyle: "italic",
  padding: "1rem",
  backgroundColor: "white",
};

const header = {
  display: "flex",
  gap: "0.5rem",
  color: "#C72380",
  alignItems: "center",
  paddingBottom: "0.6rem",
};

const headerTitle = {
  fontSize: "1.5rem",
  fontWeight: "900",
};

const headerIcon = {
  width: "2.5rem",
};

const body = {
  fontSize: "1.3rem",
  lineHeight: "1.5rem",
  fontWeight: "900",
  textAlign: "center",
  color: "#8B8B8B",
};

function WidgetTipFinanciero({ message, webChatInstance }) {
  // const mensaje = message.user_defined.data;

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={header}>
          <div style={headerTitle}>Tip</div>
          <div style={headerIcon}>
            <img src={Tip} style={headerIcon} alt="tip" />
          </div>
        </div>
        <div style={body}>Crece tus ahorros hasta 10% con una inversión</div>
      </div>
    </div>
  );
}

WidgetTipFinanciero.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetTipFinanciero };
