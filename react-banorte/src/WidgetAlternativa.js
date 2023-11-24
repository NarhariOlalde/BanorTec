import PropTypes from "prop-types";

const wrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
};

const card = {
  width: "70%",
  height: "8rem",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const circle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  position: "absolute",
  top: "-45px",
  left: "-5px",
};

const circleColorRed = {
  backgroundColor: "#EB0027",
};

const circleColorGold = {
  backgroundColor: "#F1C75A",
};

const cardTitle = {
  color: "#ffffff",
  fontSize: "16px",
  textAlign: "center",
  margin: "0",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  marginTop: "52px",
  paddingBottom: "0",
};

const cardSubtitle = {
  color: "#ffffff",
  fontSize: "12px",
  textAlign: "center",
  margin: "0",
  paddingTop: "0px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "300",
};

const amountContainer = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "1.5rem",
};

const amount = {
  fontSize: "40px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  color: "#000000",
  margin: "0",
  padding: "0",
};

const amountDecimals = {
  fontSize: "1.2rem",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  color: "#000000",
  margin: "0",
  padding: "0",
  paddingBottom: "8px",
};

const moneySimbol = {
  fontSize: "20px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  color: "#000000",
  margin: "0",
  padding: "0",
  paddingTop: "12px",
};

const coin = {
  fontSize: "15px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  color: "#000000",
  margin: "0",
  padding: "0",
  paddingTop: "10px",
  paddingLeft: "5px",
};

const mxn = {
  fontSize: "0.7rem",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "600",
  color: "#000000",
  margin: "0",
  padding: "0",
  paddingTop: "0.5rem",
  marginBottom: "-0.4rem",
};

const cardNumber = {
  position: "absolute",
  top: "30px",
  right: "50%",
  transform: "translateX(50%)",
  zIndex: "99",
  fontSize: "16px",
};

function WidgetAlternativa({ message, webChatInstance }) {
  const saldo = message.user_defined.saldo;
  const tarjeta = message.user_defined.tarjeta;
  const numero = message.user_defined.numero;

  return (
    <div style={wrapper}>
      <div style={card}>
        <div
          style={{
            ...circle,
            ...(tarjeta === "oro" ? circleColorGold : circleColorRed),
          }}
        >
          <div>
            <h1 style={cardTitle}>{tarjeta.toUpperCase()}</h1>
            <h5 style={cardSubtitle}>DIGITAL</h5>
          </div>
        </div>

        <div style={cardNumber}>
          <h5 style={coin}>{numero}</h5>
        </div>

        <div style={amountContainer}>
          <div>
            <h3 style={moneySimbol}>$</h3>
          </div>
          <div>
            <h2 style={amount} id="formatted_balance">
              {saldo}
            </h2>
          </div>

          <div style={{ padding: "0.3rem 0 0 0.2rem" }}>
            <div>
              <h3 style={mxn}>MXN</h3>
            </div>
            <div>
              <h3 style={amountDecimals}>.00</h3>
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
