import { useState, useEffect, useContext } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AnimaContext } from "../../anima";
export const NavbarAnime = () => {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const [navListLike, setNavListLike] = useState([]);
  const {
    setListItem,
    listItem,
    setOnList,
    mainAnima,
    userProfileData,
    setUserProfileData,
    type,
    myAnimaList,
    myAnimaListLike,
  } = useContext(AnimaContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleClose = () => setMenuOpen(false);
  // HandleScroll -> cambiar de color navbar
  const [y, setY] = useState(0);

  const handleScroll = (e) => {
    const navEl = document.querySelector(".navbar");
    setY(e.scrollY);
    if (y >= 50) navEl?.classList.add("navbar-scrolled");
    else if (y < 50) navEl?.classList.remove("navbar-scrolled");
  };

  const handleOnList = () => {
    let myList =
      JSON.parse(
        localStorage.getItem(`myList_${category}_${userProfileData.inputName}`)
      ) || [];
    setTimeout(() => {
      const indexOfObject = myList.findIndex(
        (item) => item.mal_id === mainAnima.mal_id
      );
    }, 1000);
    if (indexOfObject === -1) {
      setOnList(false);
    } else {
      setOnList(true);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (e) => handleScroll(e.currentTarget),
      true
    );
    return () => {
      window.removeEventListener(
        "scroll",
        (e) => handleScroll(e.currentTarget),
        true
      );
    };
  }, [y]);

  useEffect(() => {
    setNavList(myAnimaList);
  }, [myAnimaList]);

  useEffect(() => {
    setNavListLike(myAnimaListLike);
  }, [myAnimaListLike]);

  return (
    <>
      <Navbar
        className="justify-content-start"
        expand={false}
        as="nav"
        fixed="top"
        collapseOnSelect
      >
        <Nav.Item>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            onClick={toggleMenu}
          />
        </Nav.Item>

        <Nav.Item>
          <Navbar.Brand className="brand-navbar">
            <img
              className="navbar-brand-img"
              src="\img\anima-logo.ico"
              alt=""
            />
          </Navbar.Brand>
        </Nav.Item>
        <Nav.Item className="nav-type">
          <Nav.Link>
            {type ? (
              <span className="text-warning subrand align-top">
                {type.toUpperCase()}
              </span>
            ) : (
              <></>
            )}
          </Nav.Link>
        </Nav.Item>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbar"
          placement="start"
          restoreFocus={false}
          show={menuOpen}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expanded}`}>
              <div className="offcanvastitle__container">
                <h2 className="text-white offcanvas__username">
                  <img
                    className="nav__user-img"
                    src={userProfileData?.imageUrl}
                    alt=""
                  />
                  {userProfileData?.inputName}
                </h2>
                <Link
                  className="offcanvas__change-link"
                  to="/anima/choose"
                  onClick={() => {
                    setUserProfileData(null);
                    setListItem([]);
                  }}
                >
                  <img
                    src="\static\left-right-arrow-svgrepo-com.svg"
                    alt=""
                    className="offcanvas__change"
                  />
                </Link>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="justify-content-end flex-grow-1 ">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active offcanvas-a ps-4 " : "offcanvas-a ps-4 "
                  }`
                }
                to={`/${userProfileData?.inputName}/browse/anime`}
                onClick={() => {
                  toggleMenu();
                  // handleOnList();
                }}
              >
                Anime
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active offcanvas-a ps-4" : "offcanvas-a ps-4"
                  }`
                }
                to={`/${userProfileData?.inputName}/browse/manga`}
                onClick={() => {
                  toggleMenu();
                  // handleOnList();
                }}
              >
                Manga
              </NavLink>
              <p
                className="navbar-text pt-3 mb-0 ps-2 text-white navbar-my-list navbar-border"
                title="¡Una vez añadas un Anima a tu lista aparecerá acá!"
              >
                <img
                  className="navbar-list-icon pb-1"
                  src="\static\list-check-svgrepo-com.svg"
                  alt="List icon"
                />
                My list
              </p>
              {navList ? (
                navList.map((item) => (
                  <Link
                    to={`/anima/${item.mal_id}`}
                    state={{ category: type }}
                    key={`nav-list-${item.mal_id}`}
                    className="nav-link nav-link-list text-white ps-4 mt-0 list-item"
                    title="¡Haz click aquí!"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <></>
              )}
              <p
                className="navbar-text pt-3 mb-0 ps-2 text-white navbar-my-list navbar-border"
                title="¡Una vez le des me gusta a un Anima aparecerá acá!"
              >
                <img
                  className="navbar-like-icon pb-1"
                  src="\static\like-svgrepo-com.svg"
                  alt="List icon"
                />
                Vote
              </p>
              {navListLike ? (
                navListLike.map((item) => (
                  <Link
                    to={`/anima/${item.mal_id}`}
                    state={{ category: type }}
                    key={`nav-list-${item.mal_id}`}
                    className="nav-link nav-link-list text-white ps-4 mt-0 list-like"
                    title="¡Haz click aquí!"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <></>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
};
