import React, { useState, useMemo, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AnimaContext } from "../";

export const ChoosePage = ({ setIsChoose }) => {
  const [title, setTitle] = useState("Who is watching now?");
  const [icon, setIcon] = useState("/anima/static/pencil-ui-svgrepo-com.png");
  const [buttonText, setButtonText] = useState("Manage");
  const [numProfiles, setNumProfiles] = useState(0);
  const [manage, setManage] = useState(false);
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("profile")) || [];
  });

  const { setIntroStatus, introStatus, setStatus } = useContext(AnimaContext);

  // Function

  const handleClick = useMemo(
    () => () => {
      setButtonText((prevText) => (prevText === "Manage" ? "Ready" : "Manage"));
      setIcon((prevIcon) =>
        prevIcon === "/anima/static/pencil-ui-svgrepo-com.png"
          ? "/anima/static/close-md-svgrepo-com.png"
          : "/anima/static/pencil-ui-svgrepo-com.png"
      );
    },
    [setIcon, setButtonText]
  );

  const handleEdit = () => {
    const icons = document.querySelectorAll(".edit__pencil__ico");
    const background = document.querySelectorAll(".edit__pencil__background");

    icons.forEach((icon, index) => {
      icon.classList.toggle("show__edit");
      background[index].classList.toggle("show__edit");
    });
  };

  const handleStatus = () => {
    setIntroStatus(true);
  };

  useEffect(() => {
    const userProfileButton = document.getElementById("user-profile");
    const screenWidth = window.innerWidth;

    if (userProfileButton) {
      if (
        users.length >= (screenWidth <= 480 ? 2 : 5) && // cambia la longitud máxima dependiendo del ancho de la pantalla
        !userProfileButton.classList.contains("disable__button")
      ) {
        userProfileButton.classList.add("disable__button");
      } else if (
        users.length < (screenWidth <= 480 ? 2 : 5) && // cambia la longitud máxima dependiendo del ancho de la pantalla
        userProfileButton.classList.contains("disable__button")
      ) {
        userProfileButton.classList.remove("disable__button");
      }
    }

    if (users.length <= 0) {
      setManage(false);
    } else {
      setManage(true);
    }
  }, [users]);

  useEffect(() => {
    setIsChoose(false);
  }, []);

  return (
    <div className="main__choose">
      {manage ? (
        <h2
          className="text-white main__manage"
          onClick={() => {
            setTitle("Manage profiles");
            handleEdit();
            handleClick();
          }}
        >
          <img className="manage__ico" src={icon} alt="" />
          {buttonText}
        </h2>
      ) : (
        <></>
      )}
      <img className="choose__ico" src="\img\anima-logo.png" alt="anima-ico" />
      <div className="container__choose">
        <p className="text-white choose__question">{title}</p>
        <div className="container__users">
          {users.map((user, idx) => {
            return (
              <div className="container__user" key={`profile-${idx}`}>
                <Link
                  className="edit__pencil__background"
                  onClick={() => {}}
                  to={`/anima/new/${user.inputName}`}
                  state={{ user }}
                >
                  <img
                    className="edit__pencil__ico"
                    src="\anima\static\pencil-button-svgrepo-com.png"
                    alt=""
                  />
                </Link>
                <Link
                  className="user__img-container"
                  to={`/${user.inputName}/browse/anime/`}
                  onClick={handleStatus}
                  state={{ user }}
                >
                  <img className="user__img" src={user.imageUrl} alt="" />
                </Link>
                <span className="user__name text-white">{user.inputName}</span>
              </div>
            );
          })}

          <Link to={`/anima/new`} className="container__user" id="user-profile">
            <p className="add__profile">Add profile</p>
            <button className="user__button">
              <img
                className="button__img"
                src="\anima\static\plus-profile-svgrepo-com.png"
                alt=""
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
