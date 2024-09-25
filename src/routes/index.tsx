import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import Login from "../pages/Login";
import { Path } from "../lib/constants/path.constants";
import { useAuthentication } from "../lib/contexts/AuthenticationContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    <AuthenticatedRoutes />
  ) : (
    <Routes>
      <Route path={Path.LOGIN} element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
