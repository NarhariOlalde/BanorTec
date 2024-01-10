// Widget para mostrar las tarjetas con el diseño actualizado
import { CaretLeft16, CaretRight16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Tile, Button } from "carbon-components-react";
import { useCallback, useState } from "react";
import cx from "classnames";

import tarjeta1 from "../assets/Banorte-TDC-Oro-410x290.png";
import tarjeta2 from "../assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta3 from "../assets/Banorte_PorTi_410x290.png";

const urlImageMap = new Map([
  ["lendyr-everyday-card.jpg", tarjeta1],
  ["lendyr-preferred-card.jpg", tarjeta2],
  ["lendyr-topaz-card.jpg", tarjeta3],
]);

function ContentCarousel({ message, webChatInstance }) {
  // Informacion de las tarjetas recuperados del asistente de WatsonX
  const tarjetas = message.user_defined.data;
  // Almacena el elemento actual en la barra de navegacion
  const [navigationElement, setNavigationElement] = useState();

  const onCardClick = useCallback(
    (text) => {
      webChatInstance.send({ input: { text: `${text}` } }, { silent: true });
    },
    [webChatInstance]
  );

  // Crea una tarjeta de presentacion para cada una de las tarjetas disponibles
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
            const tarjeta =
              Tarjeta === "Oro"
                ? tarjeta1
                : Tarjeta === "Enlace"
                ? tarjeta2
                : tarjeta3;
            const image = urlImageMap.get(tarjeta) || tarjeta;

            return (
              <SwiperSlide className="swiper-slide" key={Tarjeta}>
                <Tile
                  className="Carousel__Card"
                  style={{ position: "relative" }}
                >
                  <img
                    className="Carousel__CardImage"
                    style={{ transform: "scale(1.1) translateX(0.2rem)" }}
                    src={image}
                    alt={Tarjeta}
                  />
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
                    {Numero.replace(/(.{4})/, "$1 ")}
                  </div>
                  <div
                    className="Carousel__CardText"
                    style={{ marginTop: "-0.5rem" }}
                  >
                    <div
                      className="Carousel__CardTitle"
                      style={{
                        color:
                          Tarjeta === "Oro"
                            ? "#E3B758"
                            : Tarjeta === "Enlace"
                            ? "#CF0A2D"
                            : "#393939",
                      }}
                    >
                      Banorte {Tarjeta}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div className="Carousel__CardDescription">Saldo:</div>
                      <div
                        style={{
                          display: "flex",
                          color: "black",
                          alignItems: "flex-end",
                        }}
                      >
                        <div
                          style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}
                        >
                          $
                        </div>
                        <div
                          style={{
                            fontSize: "1.6rem",
                            padding: "0 0.2rem 0 0.1rem",
                            fontWeight: "500",
                          }}
                        >
                          {Disponible}
                        </div>
                        <div
                          style={{ fontSize: "0.6rem", lineHeight: "0.6rem" }}
                        >
                          <div>MXN</div>
                          <div>.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* This button will send a message to the assistant and web chat will respond with more info. */}
                  <Button
                    className="Carousel__CardButton Carousel__CardButtonMessage"
                    style={{
                      backgroundColor:
                        Tarjeta === "Oro"
                          ? "#E3B758"
                          : Tarjeta === "Enlace"
                          ? "#CF0A2D"
                          : "#393939",
                    }}
                    onClick={() => onCardClick(Tarjeta)}
                  >
                    Seleccionar
                  </Button>
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
    </>
  );
}

function renderBullet(_, className) {
  return `<span class="${className}"></span>`;
}

ContentCarousel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { ContentCarousel };