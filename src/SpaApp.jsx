import { AppRouter } from "./router/AppRouter";
import { useState } from "react";
export const SpaApp = () => {
  const [loading, setLoading] = useState(true);
  const loader = document.getElementById("loaderAnima");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
      setLoading(false);
    }, 800);
  }
  return (
    !loading && (
      <>
        <AppRouter />
      </>
    )
  );
};
