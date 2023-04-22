import "./style/modal.css";
import { useContext, useEffect, useState } from "react";
import { AnimaContext, getEllipsis } from "../../";
import { Link } from "react-router-dom";
export const Modal = ({ data, category }) => {
  const [itemLiked, setitemLiked] = useState([]);
  const [listedItem, setListedItem] = useState([]);
  const {
    setModalData,
    setListLike,
    myAnimaList,
    myAnimaListLike,
    setListItem,
  } = useContext(AnimaContext);

  const handleMyListLike = () => {
    setListLike([{ mal_id: data.mal_id, name: data.title }]);
  };
  const handleMyList = () => {
    setListItem([
      {
        category,
        demographics: data.demographics,
        images: data.images,
        mal_id: data.mal_id,
        name: data.title,
        name_image: null,
        rating: data.rating,
        synopsis: data.synopsis,
        title: data.title,
        type: category,
      },
    ]);
  };

  useEffect(() => {
    setListedItem(myAnimaList.map((item) => item.mal_id));
  }, [myAnimaList]);

  useEffect(() => {
    setitemLiked(myAnimaListLike.map((item) => item.mal_id));
  }, [myAnimaListLike]);

  useEffect(() => {
    setModalData(data);
  }, [data]);

  const { status, setStatus } = useContext(AnimaContext);

  return (
    <>
      <div className="modal__container">
        <div
          className="modal__cover__first"
          onClick={() => {
            setStatus(false);
          }}
        ></div>
        <div
          className="modal__cover__third"
          onClick={() => {
            setStatus(false);
          }}
        ></div>
        <div className="modal__anima">
          <div className="anima__cover"></div>
          <div className="anima__cover__top"></div>
          <div className="modal__header">
            <img
              className="modal__img"
              src={data.images.jpg.large_image_url}
              alt=""
            />
            <button
              type="button"
              className="modal__close"
              onClick={() => {
                setStatus(false);
              }}
            >
              <img src="\static\close-svgrepo-com.svg" alt="Close button" />
            </button>
            <div className="header__content">
              <div className="header__title">
                <h2 className="title__h2">{data.title}</h2>
              </div>
            </div>
          </div>
          <div className="modal__body">
            <div className="modal__description">
              <div className="description__match">
                {data.score ? (
                  <span className="description__popularity">
                    Score {data.score}
                  </span>
                ) : (
                  <></>
                )}
                {data.aired ? (
                  <span className="description__release">
                    {data.aired.prop.from.year}
                  </span>
                ) : (
                  <></>
                )}
                {data.rating ? (
                  <span className="description__badge">
                    {data.rating.slice(0, 6)}
                  </span>
                ) : (
                  <></>
                )}
                {data.demographics[0] ? (
                  <span className="description__demographics">
                    {data.demographics[0]?.name}
                  </span>
                ) : (
                  <></>
                )}
                {data.type ? (
                  <span className="description__type">{data.type}</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="description__general">
              {data.synopsis ? (
                <p className="description__synopsis description__text">
                  {getEllipsis(data.synopsis)}
                </p>
              ) : (
                <></>
              )}
              {data.studios ? (
                <p className="description__text description__studio">
                  Studio: {data.studios[0]?.name}
                </p>
              ) : (
                <></>
              )}
              {data.genres ? (
                <p className="description__text">
                  Genre(s):
                  {data.genres.map((genre, i, { length }) =>
                    i + 1 === length
                      ? genre.name + "."
                      : " " + genre.name + ", "
                  )}
                </p>
              ) : (
                <></>
              )}
              {data.status ? (
                <p className="description__text description__status">
                  Status: {data.status}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="description__buttons">
              <button className="description__button" onClick={handleMyList}>
                {listedItem.includes(data.mal_id) ? (
                  <img
                    className="description__button__img"
                    src="\static\check-svgrepo-com.svg"
                    alt="Plus image"
                    onClick={handleMyList}
                  />
                ) : (
                  <img
                    className="description__button__img"
                    src="\static\plus-svgrepo-com.svg"
                    alt="Plus image"
                    onClick={handleMyList}
                  />
                )}
                My list
              </button>
              <button
                className="description__button"
                onClick={handleMyListLike}
              >
                {itemLiked.includes(data.mal_id) ? (
                  <img
                    className="description__button__img"
                    src="\static\like-complete-svgrepo-com.svg"
                    alt="Like image"
                    onClick={handleMyListLike}
                  />
                ) : (
                  <img
                    className="description__button__img"
                    src="\static\like-svgrepo-com.svg"
                    alt="Like image"
                    onClick={handleMyListLike}
                  />
                )}
                Vote
              </button>
              <Link to={`/anima/${data.mal_id}`} state={{ category: category }}>
                <button
                  className="description__button"
                  onClick={() => {
                    setStatus(false);
                  }}
                >
                  <img
                    className="description__button__img ellipsis__img"
                    src="\static\more-h-svgrepo-com.svg"
                    alt="Ellipsis image"
                  />
                  More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
