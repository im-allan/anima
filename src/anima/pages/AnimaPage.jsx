import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AnimaCarrousel,
  getData,
  useFetch,
  Footer,
  AnimaTopCarrousel,
  Main,
  Modal,
  AnimaContext,
  Intro,
} from "../";
import "../components/main/style/main.css";
import "../components/carrousel/style/carrousel.css";
import "../components/top/style/top.css";
import Container from "react-bootstrap/Container";

export const AnimaPage = (props) => {
  const { category } = useParams();
  const { name } = useParams();
  const {
    status,
    setStatus,
    introStatus,
    setIntroStatus,
    data,
    setData,
    userProfileData,
    setUserProfileData,
    type,
    setType,
    listItem,
    setListItem,
    myAnimaList,
    setMyAnimaList,
    myAnimaListLike,
    setMyAnimaListLike,
    onList,
    setOnList,
    mainAnima,
    listLike,
    setListLike,
    modalData,
  } = useContext(AnimaContext);

  const animaData = getData(category);

  const navigate = useNavigate();

  useEffect(() => {
    const storageObject = JSON.parse(localStorage.getItem("profile"));
    const foundObject =
      name && storageObject?.find((obj) => obj.inputName === name);

    if (!foundObject) {
      // Redirigir al usuario a la página de error
      navigate("/anima/choose");
    } else {
      setUserProfileData(foundObject);
    }
  }, [name, navigate]);

  useEffect(() => {
    props.setIsChoose(true);
  }, []);

  useEffect(() => {
    if (!userProfileData) return; // Retorna si userProfileData es undefined
    const myList =
      JSON.parse(
        localStorage.getItem(`myList_${category}_${userProfileData.inputName}`)
      ) || [];
    const item = listItem[0];
    const isObjectInList = myList.some(
      (listItem) => listItem.mal_id === item?.mal_id
    );

    const updatedList = isObjectInList
      ? myList.filter((listItem) => listItem?.mal_id !== item?.mal_id)
      : [...myList, ...listItem];

    localStorage.setItem(
      `myList_${category}_${userProfileData.inputName}`,
      JSON.stringify(updatedList)
    );
    if (listItem.length > 0) {
      setListItem([]);
      return;
    }
  }, [listItem, userProfileData]);

  useEffect(() => {
    userProfileData &&
      setMyAnimaList(
        JSON.parse(
          localStorage.getItem(
            `myList_${category}_${userProfileData.inputName}`
          )
        )
      );
  }, [listItem, userProfileData]);

  useEffect(() => {
    if (!userProfileData) return;

    const myListLike =
      JSON.parse(
        localStorage.getItem(
          `myListLike_${category}_${userProfileData.inputName}`
        )
      ) || [];

    const isObjectInList = myListLike.some(
      (item) => item.mal_id === listLike[0]?.mal_id
    );

    const updatedList = isObjectInList
      ? myListLike.filter((item) => item?.mal_id !== listLike[0]?.mal_id)
      : [...myListLike, ...listLike];

    localStorage.setItem(
      `myListLike_${category}_${userProfileData.inputName}`,
      JSON.stringify(updatedList)
    );
    if (listLike.length > 0) {
      setListLike([]);
      return;
    }
  }, [listLike, userProfileData]);

  useEffect(() => {
    userProfileData &&
      setMyAnimaListLike(
        JSON.parse(
          localStorage.getItem(
            `myListLike_${category}_${userProfileData.inputName}`
          )
        )
      );
  }, [listLike, userProfileData]);

  useEffect(() => {
    setType(category);
  }, [category]);

  useEffect(() => {
    if (status == true) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "visible";
    }
  }, [status]);

  useEffect(() => {
    if (introStatus == true) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "visible";
    }
  }, [introStatus]);

  useEffect(() => {
    setTimeout(() => {
      setIntroStatus(false);
    }, 5000);
  }, []);

  return (
    <>
      {introStatus ? <Intro /> : <></>}

      <Main />
      {status ? (
        <Modal
          category={category}
          data={data}
          setStatus={setStatus}
          status={status}
        />
      ) : (
        <></>
      )}
      <Container fluid className="container-anima">
        {animaData.anima_upcoming ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_upcoming.data}
            id="swiper-1"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_upcoming.title}
          />
        ) : (
          <></>
        )}
        {animaData.anima_comedy ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_comedy.data}
            id="swiper-2"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_comedy.title}
          />
        ) : (
          <></>
        )}
        {animaData.top_10_anima ? (
          <AnimaTopCarrousel
            category={category}
            data={animaData.top_10_anima.data}
            id="swiper-3"
            setData={setData}
            setStatus={setStatus}
            title={animaData.top_10_anima.title}
          />
        ) : (
          <></>
        )}
        {animaData.anima_special ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_special.data}
            id="swiper-4"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_special.title}
          />
        ) : (
          <></>
        )}
        {animaData.anima_gore ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_gore.data}
            id="swiper-5"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_gore.title}
          />
        ) : (
          <></>
        )}
        {animaData.anima_isekai ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_isekai.data}
            id="swiper-6"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_isekai.title}
          />
        ) : (
          <></>
        )}
        {animaData.anima_horror ? (
          <AnimaCarrousel
            category={category}
            data={animaData.anima_horror.data}
            id="swiper-7"
            setData={setData}
            setStatus={setStatus}
            title={animaData.anima_horror.title}
          />
        ) : (
          <></>
        )}
        {animaData.top_anima_movie ? (
          <AnimaTopCarrousel
            category={category}
            data={animaData.top_anima_movie.data}
            id="swiper-8"
            setData={setData}
            setStatus={setStatus}
            title={animaData.top_anima_movie.title}
          />
        ) : (
          <></>
        )}
        {myAnimaList.length > 0 ? (
          <AnimaCarrousel
            category={category}
            data={myAnimaList}
            id="swiper-9"
            setData={setData}
            setStatus={setStatus}
            title={`Mi Lista  ${
              category.charAt(0).toUpperCase() + category.slice(1)
            }`}
          />
        ) : (
          <></>
        )}
      </Container>
      <Footer />
    </>
  );
};
