import { useContext, useState, useEffect } from "react";
import ContentLoader, { Code } from "react-content-loader";
import { Link, useParams } from "react-router-dom";
import { getDataMain } from "../../";
import { AnimaContext } from "../../";
import "./style/main.css";
export const Main = () => {
  const { category } = useParams();
  const {
    type,
    listItem,
    setListItem,
    setMainAnima,
    myAnimaList,
    userProfileData,
  } = useContext(AnimaContext);
  const [index, setIndex] = useState();
  const [loading, setLoading] = useState(true);
  const [onList, setOnList] = useState(false);
  const [mainData, setMainData] = useState(false);
  const handleMyList = () => {
    setListItem([mainData[index]]);
    setOnList(!onList);
  };

  useEffect(() => {
    setMainData(false);
  }, [category]);

  useEffect(() => {
    const alphabet = "abc";
    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)];
    setIndex(randomCharacter);
  }, []);

  useEffect(() => {
    if (!mainData) {
      setMainData(getDataMain(category));
      setMainAnima(mainData[index]);
    }
  }, [mainData]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (userProfileData) {
      let myList =
        JSON.parse(
          localStorage.getItem(
            `myList_${category}_${userProfileData.inputName}`
          )
        ) || [];
      const indexOfObject = myList.findIndex(
        (item) => item.mal_id === mainData[index]?.mal_id
      );
      if (indexOfObject === -1) setOnList(false);
      else setOnList(true);
    }
  }, [mainData]);

  return (
    <>
      {mainData ? (
        <main className="main__container">
          {loading ? (
            <>
              <ContentLoader
                className="content__general"
                speed={1}
                backgroundColor={"#000000"}
                foregroundColor={"#111111"}
              >
                <rect x="0" y="0" width="2000" height="2000" />
              </ContentLoader>
              <ContentLoader
                className="content__loading__text"
                speed={1}
                backgroundColor={"#0F0F0F"}
                foregroundColor={"#111111"}
              >
                <rect x="0" y="0" ry="5" rx="5" width="2000" height="2000" />
              </ContentLoader>
            </>
          ) : (
            <>
              <div className="content__anima__logo__container">
                <img
                  className="content__anima__logo"
                  src="\static\anima-logo.png"
                  alt="anima-logo"
                />
                <p className="content__anima__type">{mainData[index]?.type}</p>
              </div>
              <span className="content__anima__rating">
                {mainData[index]?.rating}
              </span>
              <div className="content__anima__synopsis__container">
                <Link
                  to={`/anima/${mainData[index]?.mal_id}`}
                  state={{ category: mainData[index]?.category }}
                  className="content__anima__button content__button__more"
                >
                  <img
                    src="\static\right-2-svgrepo-com.png"
                    className="content__icon__more"
                    alt="icon read more"
                  />
                  More
                </Link>
                <button
                  className="content__anima__button content__button__mylist"
                  onClick={() => {
                    handleMyList();
                  }}
                >
                  {onList ? (
                    <img
                      src="\static\check-svgrepo-com.png"
                      className="content__icon__plus"
                      alt="check icon"
                    />
                  ) : (
                    <img
                      src="\static\plus-content-svgrepo-com.png"
                      className="content__icon__plus"
                      alt="icon plus"
                    />
                  )}
                  My list
                </button>
                <h2 className="content__anima__title">
                  {mainData[index].name}
                </h2>
                <p className="content__anima__synopsis">
                  {mainData[index]?.synopsis}
                </p>
              </div>
              <img
                alt={mainData[index]?.name}
                className="content__img"
                draggable="false"
                src={mainData[index]?.images.jpg.image_url}
              />
              <img
                alt={`title of ${mainData[index]?.name}`}
                className="content__title"
                draggable="false"
                src={mainData[index]?.name_image}
              />
              <span className="main__cover"></span>
            </>
          )}
        </main>
      ) : (
        <></>
      )}
    </>
  );
};
