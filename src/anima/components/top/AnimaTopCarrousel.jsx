import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
("swiper/css");

export const AnimaTopCarrousel = ({ data, title, id, setStatus, setData }) => {
  return (
    <>
      <h2 className="mt-4">{title}</h2>
      <div className="swiper__container__top mt-1">
        <div
          className={`button__next__top-${id} swiper__button__top button__next__top`}
        >
          <MdNavigateNext />
        </div>
        <div
          className={`button__prev__top-${id} swiper__button__top button__prev__top`}
        >
          <MdNavigateBefore />
        </div>
        <Swiper
          className="swiper__top"
          modules={[Navigation]}
          navigation={{
            nextEl: `.button__next__top-${id}`,
            prevEl: `.button__prev__top-${id}`,
            disabledClass: "button__disabled__top",
          }}
          slidesPerGroup={5}
          slidesPerView={6.3}
          spaceBetween={7}
          speed={800}
          breakpoints={{
            320: {
              slidesPerView: 2.5,
              slidesPerGroup: 2,
              spaceBetween: 10,
              speed: 500,
            },
            500: {
              slidesPerView: 3.5,
              slidesPerGroup: 5,
              spaceBetween: 7,
            },
            750: {
              slidesPerView: 4.3,
              slidesPerGroup: 5,
              spaceBetween: 7,
            },
            1000: {
              slidesPerView: 6.5,
              slidesPerGroup: 5,
              spaceBetween: 7,
            },
          }}
        >
          <div className="swiper__wapper">
            {data.map((data) => (
              <SwiperSlide
                key={data.mal_id}
                className="swiper__slide__top"
                onClick={() => {
                  setStatus(true);
                  setData(data);
                }}
              >
                <div className="anima main">
                  <img
                    className="thumb card-img-top"
                    src={data.images.jpg.large_image_url}
                    alt={data.title}
                    title={data.title}
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};
