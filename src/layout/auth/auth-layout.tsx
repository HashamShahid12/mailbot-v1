import { Header } from "../dashboard/header-bar";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <div
        className="p-4"
        style={{ height: "calc(100vh - var(--chakra-sizes-8xs))" }}
      >
        <Outlet />
      </div>
    </>
  );
};
