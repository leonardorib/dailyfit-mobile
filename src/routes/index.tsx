import React, { useContext } from "react";

import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";

import AuthContext from "../contexts/auth";

const Routes: React.FC = () => {
  const { user } = useContext(AuthContext);
  return user ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
