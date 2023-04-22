import { useContext, useEffect } from "react";
import { AnimaContext, getAnimaById } from "../";
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "animate.css";
export const AnimaPageProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "visible";
  }, []);

  const location = useLocation();
  const { category } = location.state;

  const { isLoading, resource, hasError } = getAnimaById(id, category);
  const months = [
    "Januay",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {isLoading ? (
        <h2 className="text-white loading-text">L O A D I N G . . .</h2>
      ) : hasError ? (
        <h2 className="text-white loading-text">
          We're sorry! we couldn't find your search
        </h2>
      ) : (
        <>
          <Container className="mt-5 product-container">
            <Row className="row-product"></Row>
            <Row className="d-flex justify-content-lg-center justify-content-md-center product-container">
              <Col lg="4" xs="9" className="p-lg-5">
                <Row>
                  <h2 className="h3 mt-5 text-white">{resource.data?.title}</h2>
                  <hr className="anima__description__hr" />
                  <Row className="align-middle">
                    <p className="anima__description__var">RANK</p>
                    <a
                      href=""
                      target="_blank"
                      className="anima__description__link"
                    >
                      <img
                        src="\static\question-mark-svgrepo-com.svg"
                        alt="Question image"
                        className="link__question__image"
                      />
                    </a>
                    {resource.data.rank ? (
                      <p className="anima__raking  anima__description__text">
                        {resource.data?.rank}
                      </p>
                    ) : (
                      <p className="anima__ranking anima__description__text">
                        ?
                      </p>
                    )}
                    <p className="mt-xs-5 anima__description__text">
                      Rank based on MyAnimeList Score
                    </p>
                    <hr className="anima__description__hr" />
                    <p className="anima__description__var">SCORE</p>
                    <a
                      href=""
                      target="_blank"
                      className="anima__description__link"
                    >
                      <img
                        src="\static\question-mark-svgrepo-com.svg"
                        alt="Question image"
                        className="link__question__image"
                      />
                    </a>
                    {resource.data.score ? (
                      <p className="anima__score">
                        {resource.data.score?.toFixed(1)}
                      </p>
                    ) : (
                      <p className="anima__score">?</p>
                    )}
                    <p className="mt-xs-5 anima__description__text">
                      Score based on MyAnimeList reviews
                    </p>
                    <p className="text-warning">
                      DATE RELEASE:
                      {resource.data.aired ? (
                        <span className="anima__description__text">
                          {`
                        ${months[resource.data.aired.prop.from?.month - 1]}
                        ${resource.data.aired.prop.from?.day},
                        ${resource.data.aired.prop.from?.year}
                        `}
                        </span>
                      ) : (
                        <span className="anima__description__text">
                          {" "}
                          Mothn Day, Year.
                        </span>
                      )}
                    </p>
                  </Row>
                </Row>
              </Col>
              <Col lg="5" xs="10" className="p-lg-5">
                {resource.data.trailer ? (
                  resource.data.trailer.url ? (
                    <h2 className="mb-4 mt-5">
                      Trailer: {resource.data.title}
                    </h2>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}

                {resource.data.trailer ? (
                  resource.data.trailer.url ? (
                    <div className="ratio ratio-16x9">
                      <iframe
                        allowFullScreen
                        frameBorder="0"
                        src={resource.data.trailer?.url?.replace(
                          "watch?v=",
                          "embed/"
                        )}
                      ></iframe>
                    </div>
                  ) : (
                    <img
                      className=""
                      src={resource.data.images.jpg.large_image_url}
                      alt=""
                    />
                  )
                ) : (
                  <img
                    className=""
                    src={resource.data.images.jpg.large_image_url}
                    alt=""
                  />
                )}
              </Col>
            </Row>
          </Container>
          <Container fluid className="container__white__cover">
            <Row className="d-flex justify-content-lg-center justify-content-md-center product-container">
              <Col lg="2" className="d-none d-sm-block product-container">
                <img
                  className="credits__image pt-5 ps-4 mt-5"
                  src={resource.data.images.jpg.large_image_url}
                  alt=""
                />
              </Col>
              <Col lg="8" xs="11" className="mt-5 product-container">
                <h2 className="credits__text mb-1 h4">Details and Credits</h2>
                <p className="credits__subtitle mb-4">
                  {`
                    ${
                      resource.data.producers
                        ? resource.data.producers[0]
                          ? `${resource.data.producers[0].name}`
                          : "No data"
                        : "No data"
                    }
                     | 
                  Date release:
                    ${
                      resource.data.aired
                        ? months[resource.data.aired.prop.from.month - 1]
                        : "Month"
                    } ${
                    resource.data.aired
                      ? resource.data.aired.prop.from.day
                      : "Day"
                  }, ${
                    resource.data.aired
                      ? resource.data.aired.prop.from.year
                      : "Year"
                  }
                  `}
                </p>
                <div className="credits__text">
                  <p>
                    <strong>Synopsis: </strong>
                    {resource.data.synopsis}
                  </p>
                </div>
                <div className="credits__text">
                  <p>
                    <strong>Genre(s): </strong>
                    {resource.data.genres.map((genre, i, { length }) =>
                      i + 1 === length
                        ? genre.name + "."
                        : " " + genre.name + ", "
                    )}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="product-container">
              <Col lg="11" xs="10">
                <button
                  className="btn-back mt-5 mb-5 float-end"
                  onClick={onNavigateBack}
                >
                  <img
                    className="btn-back-ico"
                    src="\static\left-2-svgrepo-com.svg"
                    alt=""
                  />
                  Back
                </button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
