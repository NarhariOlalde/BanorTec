import { CaretLeft16, CaretRight16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Button } from "carbon-components-react";
import { useState } from "react";
import cx from "classnames";
import MasterCardLogo from "./assets/Mastercardlogo.png";

/**
 * This is the component that renders our content carousel.
 */

const card = {
  width: "240px",
  height: "150px",
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
  paddingTop: "17px",
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
  fontSize: "20px",
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

const cardNumber = {
  position: "absolute",
  top: "30px",
  right: "50%",
  transform: "translateX(50%)",
  zIndex: "99",
  fontSize: "16px",
};

const img = {
  width: "40px",
  position: "absolute",
  bottom: "8px",
  right: "8px",
};

function WidgetTarjetas({ message, webChatInstance }) {
  const tarjetas = message.user_defined.data;

  const [navigationElement, setNavigationElement] = useState();

  // Create a slide for each credit card in the message custom data.
  return (
    <>
      {navigationElement && (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            el: navigationElement.querySelector(".Carousel__BulletContainer"),
            clickable: true,
            bulletClass: "Carousel__Bullet",
            bulletActiveClass: "Carousel__Bullet--selected",
            renderBullet,
          }}
          navigation={{
            prevEl: navigationElement.querySelector("button:nth-of-type(1)"),
            nextEl: navigationElement.querySelector("button:nth-of-type(2)"),
          }}
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          rewind
        >
          {tarjetas.map((cardData) => {
            const { Tarjeta, Disponible, Numero } = cardData;
            console.log(Disponible);

            return (
              <SwiperSlide className="swiper-slide" key={Numero}>
                <div style={card}>
                  <div
                    style={{
                      ...circle,
                      ...(Tarjeta === "Oro" ? circleColorGold : circleColorRed),
                    }}
                  >
                    <div>
                      <h1 style={cardTitle}>{Tarjeta}</h1>
                      {Tarjeta === "Enlace" ? (
                        <h5 style={cardSubtitle}>DIGITAL</h5>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div style={cardNumber}>
                    <h5 style={coin}>{Numero}</h5>
                  </div>

                  <div style={amountContainer}>
                    <div>
                      <h3 style={moneySimbol}>$</h3>
                    </div>
                    <div>
                      <h2 style={amount} id="formatted_balance">
                        {Disponible}
                      </h2>
                    </div>

                    <div>
                      <div>
                        <h3 style={coin}>MXN</h3>
                      </div>
                      <div>
                        <h3 style={amountDecimals}>.00</h3>
                      </div>
                    </div>
                  </div>

                  <img src={MasterCardLogo} style={img} alt="arrow" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div
        ref={setNavigationElement}
        className={cx("Carousel__Navigation", {
          "Carousel__Navigation--hidden": !navigationElement,
        })}
      >
        <Button className="Carousel__NavigationButton" kind="ghost">
          <CaretLeft16 />
        </Button>
        <div className="Carousel__BulletContainer" />
        <Button className="Carousel__NavigatFionButton" kind="ghost">
          <CaretRight16 />
        </Button>
      </div>
    </>
  );
}

/**
 * Renders a custom bullet to be displayed in the pagination element.
 */
function renderBullet(_, className) {
  return `<span class="${className}"></span>`;
}

WidgetTarjetas.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetTarjetas };
