import "./style/profile.css";
export const Profile = ({ dataProfile }) => {
  console.log(dataProfile);
  console.log("componente");
  return (
    <>
      <img
        className="profile__pictures"
        src={dataProfile.img_url}
        alt={dataProfile.name}
      />
    </>
  );
};
