import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import { Path } from "../lib/constants/path.constants";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path={Path.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  );
};

export default AuthenticatedRoutes;