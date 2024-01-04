// Componente demo de un carrusel

import { CaretLeft16, CaretRight16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Tile, Button } from "carbon-components-react";
import { useCallback, useState } from "react";
import cx from "classnames";

import tarjeta1 from "../assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta2 from "../assets/Banorte-TDC-Oro-410x290.png";
import tarjeta3 from "../assets/Banorte_PorTi_410x290.png";

// Normally these images would be hosted on an external server but we are just going to hard-code them into this
// example to keep things simple. We're going to look at the hard-coded image data based on the URL that's returned
// in the message data.
const urlImageMap = new Map([
  ["lendyr-everyday-card.jpg", tarjeta1],
  ["lendyr-preferred-card.jpg", tarjeta2],
  ["lendyr-topaz-card.jpg", tarjeta3],
]);

/**
 * This is the component that renders our content carousel.
 */
function ContentCarousel({ message, webChatInstance }) {
  const carouselData = message.user_defined.carousel_data;
  console.log(carouselData);

  const [navigationElement, setNavigationElement] = useState();

  const onCardClick = useCallback(
    (text) => {
      webChatInstance.send(
        { input: { text: `Tell me about ${text}` } },
        { silent: true }
      );
    },
    [webChatInstance]
  );

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
          {carouselData.map((cardData) => {
            const { url, title, description, alt } = cardData;
            const image = urlImageMap.get(url) || url;

            return (
              <SwiperSlide className="swiper-slide" key={url}>
                <Tile
                  className="Carousel__Card"
                  style={{ position: "relative" }}
                >
                  <img
                    className="Carousel__CardImage"
                    style={{ transform: "scale(1.1) translateX(0.2rem)" }}
                    src={image}
                    alt={alt}
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
                    **** 1234
                  </div>
                  <div
                    className="Carousel__CardText"
                    style={{ marginTop: "-0.5rem" }}
                  >
                    <div
                      className="Carousel__CardTitle"
                      style={{ color: "#CF0A2D" }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div className="Carousel__CardDescription">
                        {description}
                      </div>
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
                          9,000
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
                    style={{ backgroundColor: "#CF0A2D" }}
                    onClick={() => onCardClick(title)}
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

/**
 * Renders a custom bullet to be displayed in the pagination element.
 */
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
