import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AnimaProvider, AnimaContext } from "../context";
import { AnimaPage, AnimaPageProduct, ChoosePage, NewProfile } from "../";
import { NavbarAnime } from "../../ui";

import { useEffect, useState, useContext } from "react";
export const AnimaRoutes = () => {
  const handleScroll = () => {
    window.addEventListener("scroll", () => {
      console.log("scrolling");
    });
  };

  const [isChoose, setIsChoose] = useState(false);

  return (
    <>
      <AnimaProvider>
        {isChoose ? <NavbarAnime /> : <></>}
        <Container fluid className="p-0">
          <Routes>
            <Route path="/*" element={<Navigate to="anima/choose" />} />
            <Route path="/anima/:id" element={<AnimaPageProduct />} />
            <Route
              path="/:name/browse/:category"
              element={<AnimaPage setIsChoose={setIsChoose} />}
            />
            <Route
              path="anima/choose"
              element={<ChoosePage setIsChoose={setIsChoose} />}
            />
            <Route path="/anima/new/:name?" element={<NewProfile />} />
          </Routes>
        </Container>
      </AnimaProvider>
    </>
  );
};
