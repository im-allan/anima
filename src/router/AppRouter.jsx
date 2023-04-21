import { Route, Routes } from "react-router-dom";
import { AnimaRoutes } from "../anima";
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<AnimaRoutes />} />
      </Routes>
    </>
  );
};
