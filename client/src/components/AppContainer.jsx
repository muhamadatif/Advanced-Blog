import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterComp from "./Footer";

const AppContainer = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterComp />
    </>
  );
};

export default AppContainer;
