import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimaContext } from "./AnimaContext";

export const AnimaProvider = ({ children }) => {
  const { category } = useParams();
  const [status, setStatus] = useState(false);
  const [introStatus, setIntroStatus] = useState(false);
  const [data, setData] = useState({});
  const [userProfileData, setUserProfileData] = useState();
  const [type, setType] = useState();
  const [listItem, setListItem] = useState([]);
  const [onList, setOnList] = useState(false);
  const [mainAnima, setMainAnima] = useState();
  const [listLike, setListLike] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [myAnimaList, setMyAnimaList] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem(`myList_${category}_${userProfileData?.inputName}`)
      ) || []
    );
  });
  const [myAnimaListLike, setMyAnimaListLike] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem(`myList_${category}_${userProfileData?.inputName}`)
      ) || []
    );
  });

  const dataProvider = {
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
    onList,
    setOnList,
    mainAnima,
    setMainAnima,
    myAnimaList,
    listLike,
    setListLike,
    modalData,
    setModalData,
    setMyAnimaList,
    myAnimaListLike,
    setMyAnimaListLike,
  };
  return (
    <AnimaContext.Provider value={dataProvider}>
      {children}
    </AnimaContext.Provider>
  );
};
