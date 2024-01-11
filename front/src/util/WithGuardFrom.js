import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGGEDIN, LOGGEDOUT } from "./constants";
const WithGuardFrom = (Component, from) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
      if (from === LOGGEDOUT && !isUserLoggedIn) {
        navigate("/", { replace: true });
      }
      if (from === LOGGEDIN && isUserLoggedIn) {
        navigate("/", { replace: true });
      }
    }, [isUserLoggedIn, navigate]);

    return <Component {...props} />;
  };

  return Wrapper;
};

export default WithGuardFrom;
