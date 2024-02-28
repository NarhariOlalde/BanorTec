import { CaretLeft16, CaretRight16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Tile, Button } from "carbon-components-react";
import { useCallback, useState } from "react";
import cx from "classnames";
import { FaCircleExclamation } from "react-icons/fa6";

import tarjeta1 from "../assets/Banorte-TDC-Oro-410x290.png";
import tarjeta2 from "../assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta3 from "../assets/Banorte_PorTi_410x290.png";

const urlImageMap = new Map([
  ["Oro", tarjeta1],
  ["Enlace", tarjeta2],
  ["Nomina", tarjeta3],
]);

// Estilos CSS para el componente
const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
};

const titleContainer = {
  borderRadius: "0.5rem",
  boxShadow: "0.1rem 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1)",
  backgroundColor: "#5C6670",
  color: "#ffffff",
  padding: "0.5rem 1rem 0.5rem 1rem",
  fontSize: "1.1rem",
  fontWeight: "700",
  width: "80%",
};

function WidgetAvisosCarrusel({ message, webChatInstance }) {
  // Datos de la tarjeta del usuario
  const tarjetasData = message.user_defined.data;
  const [navigationElement, setNavigationElement] = useState();

  const [selectedMessage, setSelectedMessage] = useState();

  const avisosTarjetas = tarjetasData.reduce((acc, curr) => {
    const existingItem = acc.find((item) => item.numero === curr.numero);
    if (existingItem) {
      existingItem.fechaVencimiento.push(curr.fechaVencimiento);
      existingItem.message.push(curr.message);
      existingItem.saldo.push(curr.saldo);
      existingItem.shortMessage.push(curr.shortMessage);
      existingItem.tarjetaNombre.push(curr.tarjetaNombre);
    } else {
      acc.push({
        numero: curr.numero,
        fechaVencimiento: [curr.fechaVencimiento],
        message: [curr.message],
        saldo: [curr.saldo],
        shortMessage: [curr.shortMessage],
        tarjetaNombre: [curr.tarjetaNombre],
      });
    }
    return acc;
  }, []);

  const onCardClick = useCallback(
    (shortMessage) => {
      setSelectedMessage(shortMessage);
      const index = tarjetasData.findIndex(
        (item) => item["shortMessage"] === shortMessage
      );
      webChatInstance.send(
        {
          input: {
            text: `${index}`,
          },
        },
        { silent: true }
      );
    },
    [webChatInstance]
  );

  return (
    <div style={wrapper}>
      <div style={titleContainer}>Recordatorios de cuentas</div>
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
          {avisosTarjetas.map((aviso) => {
            const tarjetaNombre = aviso.tarjetaNombre[0];
            const shortMessages = aviso.shortMessage;
            const numero = aviso.numero;
            const saldo = aviso.saldo[0];
            const fechaVencimiento = aviso.fechaVencimiento[0];

            const tarjeta =
              tarjetaNombre === "Oro"
                ? tarjeta1
                : tarjetaNombre === "Enlace"
                ? tarjeta2
                : tarjeta3;
            const image = urlImageMap.get(tarjeta) || tarjeta;

            return (
              <SwiperSlide className="swiper-slide" key={tarjetaNombre}>
                <Tile
                  className="Carousel__Card"
                  style={{ position: "relative", height: "100%" }}
                >
                  <img
                    className="Carousel__CardImage"
                    style={{ transform: "scale(1.1) translateX(0.2rem)" }}
                    src={image}
                    alt={tarjetaNombre}
                  />

                  <div
                    style={{
                      position: "absolute",
                      fontSize: "1.2rem",
                      top: "6rem",
                      right: "1.5rem",
                      color: "white",
                      fontWeight: "800",
                    }}
                  >
                    {`$${saldo}.00`}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      fontSize: "1.2rem",
                      top: "4.5rem",
                      right: "1.5rem",
                      color: "white",
                      fontWeight: "800",
                    }}
                  >
                    {fechaVencimiento}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      fontSize: "1.2rem",
                      top: "7.5rem",
                      left: "1.5rem",
                      color: "white",
                      fontWeight: "800",
                    }}
                  >
                    {"**** " + numero.slice(-4)}
                  </div>

                  <div
                    className="Carousel__CardText"
                    style={{ marginTop: "-0.5rem" }}
                  >
                    <div
                      style={{
                        color: "#393939",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                      }}
                    >
                      Banorte {tarjetaNombre}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div className="Carousel__CardDescription">
                        {shortMessages.map((message) => {
                          return (
                            <div
                              style={{
                                borderBottom: "1px solid rgba(0,0,0,0.2)",
                                padding: "0.3rem",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                position: "relative",
                                backgroundColor:
                                  selectedMessage === message
                                    ? "#5C6670"
                                    : "rgba(0,0,0,0.05)",
                                borderRadius: "0.3rem",
                                marginTop: "0.3rem",
                                cursor: "pointer",
                                color:
                                  selectedMessage === message
                                    ? "#ffffff"
                                    : "#5C6670",
                              }}
                              key={message}
                              onClick={() => onCardClick(message)}
                            >
                              <FaCircleExclamation
                                style={{
                                  fontSize: "0.8rem",
                                  color:
                                    selectedMessage === message
                                      ? "#ffffff"
                                      : "#EB0029",
                                  padding: "0 0.5rem 0 0",
                                }}
                              />

                              {message}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        color: "rgba(0,0,0,0.5)",
                        justifySelf: "flex-end",
                      }}
                    >
                      Haz clic para saber más
                    </div>
                  </div>
                </Tile>
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
    </div>
  );
}

function renderBullet(_, className) {
  return `<span class="${className}"></span>`;
}

WidgetAvisosCarrusel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetAvisosCarrusel };
