import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface RestrictedRouteProps {
  children: ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if ('/' == location.pathname && user) {
  //     console.log(location.state)
  //     if (location.state && location.state.isForceFull) {
  //       console.log('okay here')
  //       navigate('/')
  //       // return <Navigate to="/" state={{ from: location }} replace />;
  //     }else{
  //       console.log('here!')
  //     }
  //   } else {
  //     console.log('we are here?')
  //   }

  if (user) {
    // navigate('/dashboard')
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  // }, [user, location]);

  return <>{children}</>;
};

export default RestrictedRoute;
