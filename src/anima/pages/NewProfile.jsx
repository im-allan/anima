import { useState, useEffect } from "react";
import { getDataProfile } from "../data";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import { Profile } from "../components/profile/Profile";

export const NewProfile = (props) => {
  // Hooks
  const [showPics, setShowPics] = useState(false);
  const [inputName, setInputName] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://i.ibb.co/SnkrGTj/luffy-profile-2.jpg"
  );
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  // router state

  const location = useLocation();
  const userEdit = location?.state?.user;

  useEffect(() => {
    if (!userEdit) return;

    setInputName(userEdit.inputName || "");
    setImageUrl(userEdit.imageUrl || "");
  }, [userEdit]);

  // Data
  const dataProfile = getDataProfile();
  let profiles = dataProfile.profiles;

  const images = profiles.map((item) => {
    return item.img_url;
  });

  const pictures = images.map((url, idx) => (
    <img
      className="panel__images"
      src={url}
      alt=""
      key={idx}
      id="panel-images"
      onClick={() => {
        setImageUrl(url);
      }}
    />
  ));

  // Functions
  const handleShow = () => {
    setShowPics(!showPics);
  };

  const handlePanel = () => {
    const panel = document.getElementById("panel");
    const panelImages = document.querySelectorAll("#panel-images");
    const showPanel = panel.classList.contains("show__panel");

    if (showPanel) {
      panel.classList.replace("show__panel", "hide__panel");
      panelImages.forEach((img) =>
        img.classList.replace("show__images", "hide__images")
      );
    } else if (panel.classList.contains("hide__panel")) {
      panel.classList.replace("hide__panel", "show__panel");
      panelImages.forEach((img) =>
        img.classList.replace("hide__images", "show__images")
      );
    } else {
      panel.classList.add("show__panel");
      panelImages.forEach((img) => img.classList.add("show__images"));
    }
  };

  const handleEdit = () => {
    const users = JSON.parse(localStorage.getItem("profile")) || [];
    const userToModify = users.find(
      (user) => user.inputName === userEdit.inputName
    );
    userToModify.inputName = inputName;
    userToModify.imageUrl = imageUrl;
    localStorage.setItem("profile", JSON.stringify(users));
    handleNavigateBack();
  };

  const handleButtonClick = () => {
    const inputNameTrimmed = inputName.trim();
    const { classList: nameAlert } = document.querySelector("#name-alert");
    const { classList: nameExistAlert } = document.querySelector("#name-exist");

    if (!inputNameTrimmed) {
      nameAlert.add("show__name-alert");
      nameExistAlert.remove("show__name-alert");
      return;
    }

    const profiles = JSON.parse(localStorage.getItem("profile")) || [];
    const isDuplicate = profiles.some(
      (profile) => profile.inputName === inputNameTrimmed
    );

    if (userEdit) {
      if (userEdit.inputName === inputName) {
        nameExistAlert.remove("show__name-alert");
        handleEdit();
        return;
      } else if (isDuplicate) {
        nameExistAlert.add("show__name-alert");
      } else {
        handleEdit();
        return;
      }
    } else {
      if (isDuplicate) {
        nameAlert.remove("show__name-alert");
        nameExistAlert.add("show__name-alert");
        return;
      }

      const updatedProfiles = [
        ...profiles,
        { imageUrl, inputName: inputNameTrimmed },
      ];
      localStorage.setItem("profile", JSON.stringify(updatedProfiles));
      nameExistAlert.remove("show__name-alert");
      handleNavigateBack();
    }

    nameAlert.remove("show__name-alert");
  };

  const handleDelete = () => {
    let listProfile = JSON.parse(localStorage.getItem("profile"));
    let newList = listProfile.filter(
      (profile) => profile.inputName !== userEdit.inputName
    );

    // Guardar la nueva lista de objetos en LocalStorage
    localStorage.setItem("profile", JSON.stringify(newList));

    setShowModal(false);
    handleNavigateBack();
  };

  return (
    <div className="main__new">
      {showModal ? (
        <>
          <div className="delete__modal-background"></div>
          <div className="delete__modal">
            <p className="delete__title text-white">Delete profile?</p>
            <p className="delete__body text-white">
              This profile's history—including My List, ratings, and
              activity—will be permanently deleted, so you won't have access to
              this information later.
            </p>
            <div className="modal__button-container">
              <button
                className="modal__button-delete"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete profile
              </button>
              <button
                className="modal__button-cancel"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <img
        onClick={handleNavigateBack}
        className="back-ico"
        src="\anima\static\arrow-back-sharp-svgrepo-com.png"
        alt=""
      />
      <h2 className="add__prof">Add profile</h2>
      <div className="container__buttons-new">
        <img
          className="check-ico"
          src="\anima\static\check-2-svgrepo-com.png"
          alt=""
          onClick={handleButtonClick}
        />
        <h2
          className="save__profile"
          onClick={() => {
            handleButtonClick();
          }}
        >
          Save
        </h2>
        {userEdit ? (
          <>
            <img
              className="delete-ico"
              src="\anima\static\delete-garbage-office-svgrepo-com.png"
              alt=""
              onClick={() => {
                setShowModal(true);
              }}
            />
            <h2
              className="delete__profile"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Delete
            </h2>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="new__container">
        <button
          className="new__image"
          onClick={() => {
            handlePanel();
            handleShow();
          }}
        >
          <img
            className="image__edit"
            src="\anima\static\pencil-button-svgrepo-com.png"
            alt=""
          />
          <img className="image__button" src={imageUrl} alt="" />
        </button>
        <input
          className="new__name"
          onChange={(e) => setInputName(e.target.value)}
          placeholder={"Name"}
          type="text"
          value={inputName || ""}
        />
        <p className="new__name-alert" id="name-alert">
          Enter a name
        </p>
        <p className="new__name-alert" id="name-exist">
          Profile with the same name already exists
        </p>
      </div>
      <div className="profile__pics" id="panel">
        {pictures}
      </div>
    </div>
  );
};
