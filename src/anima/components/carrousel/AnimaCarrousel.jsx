import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style/carrousel.css";
import { Navigation, Controller } from "swiper";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

export const AnimaCarrousel = ({
  data,
  title,
  id,
  category,
  setStatus,
  setData,
}) => {
  return (
    <>
      <h2 className="mt-4">{title}</h2>
      <div className="swiper__container">
        <div
          className={`button__next-${id} swiper__button button__next`}
          id={id}
        >
          <MdNavigateNext />
        </div>
        <div
          className={`button__prev-${id} swiper__button button__prev`}
          id={id}
        >
          <MdNavigateBefore />
        </div>
        <Swiper
          className={`${id}`}
          id={id}
          modules={[Navigation, Controller]}
          navigation={{
            nextEl: `.button__next-${id}`,
            prevEl: `.button__prev-${id}`,
            disabledClass: "button__disabled",
          }}
          slidesPerGroup={8}
          slidesPerView={8}
          spaceBetween={7}
          speed={800}
          breakpoints={{
            320: {
              slidesPerView: 3.5,
              slidesPerGroup: 3,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 12,
            },
            640: {
              slidesPerGroup: 4,
              slidesPerView: 4,
              spaceBetween: 11,
              speed: 800,
            },
            768: {
              slidesPerGroup: 5,
              slidesPerView: 5,
              spaceBetween: 10,
              speed: 800,
            },
            900: {
              slidesPerGroup: 6,
              slidesPerView: 6,
              spaceBetween: 7,
              speed: 800,
            },
            1000: {
              slidesPerGroup: 8,
              slidesPerView: 8,
              spaceBetween: 7,
              speed: 800,
            },
          }}
        >
          {data.map((data) => (
            <SwiperSlide
              key={data.mal_id}
              className="swiper__slide"
              onClick={() => {
                setStatus(true);
                setData(data);
              }}
            >
              <img
                src={data.images.jpg.large_image_url}
                alt={data.title}
                title={data.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
