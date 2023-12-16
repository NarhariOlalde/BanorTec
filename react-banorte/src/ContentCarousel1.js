import { CaretLeft16, CaretRight16 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Tile, Button } from "carbon-components-react";
import { useCallback, useState } from "react";
import cx from "classnames";

import tarjeta1 from "./assets/Banorte-TDC-Clasica-410x290.png";
import tarjeta2 from "./assets/Banorte-TDC-Oro-410x290.png";
import tarjeta3 from "./assets/Banorte-TDC-Platinum-410x290px.png";

const urlImageMap = new Map([
  ["lendyr-everyday-card.jpg", tarjeta1],
  ["lendyr-preferred-card.jpg", tarjeta2],
  ["lendyr-topaz-card.jpg", tarjeta3],
]);

const cardContainer = {
  position: "relative",
  color: "white",
};

const card = {
  transform: "scale(1.1) translateX(0.15rem)",
  marginBottom: "-0.2rem",
};

const cardSaldo = {
  position: "absolute",
  fontSize: "2rem",
  fontWeight: "700",
  bottom: "4rem",
  right: "1rem",
};

const cardNumero = {
  position: "absolute",
  fontSize: "1.2rem",
  bottom: "1.5rem",
  left: "1rem",
};

function ContentCarousel1({ message, webChatInstance }) {
  const carouselData = message.user_defined.carousel_data;

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
            const { url, title, alt } = cardData;
            const image = urlImageMap.get(url) || url;

            return (
              <SwiperSlide className="swiper-slide" key={url}>
                <Tile className="Carousel__Card">
                  <div style={cardContainer}>
                    <img
                      className="Carousel__CardImage"
                      src={image}
                      style={card}
                      alt={alt}
                    />
                    <div style={cardSaldo}>$9,000</div>
                    <div style={cardNumero}>**** 1234</div>
                  </div>

                  <Button
                    className="Carousel__CardButton Carousel__CardButtonMessage"
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

function renderBullet(_, className) {
  return `<span class="${className}"></span>`;
}

ContentCarousel1.propTypes = {
  message: PropTypes.object.isRequired,
  webChatInstance: PropTypes.object.isRequired,
};

export { ContentCarousel1 };
