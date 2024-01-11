import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginGuard = (Component) => {
  console.log("login guard worked");
  const Wrapper = (props) => {
    console.log("wrapper worked");
    const navigate = useNavigate();
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("is the wrappper working ... yes")
      if (!isUserLoggedIn) {
        navigate("/",{replace:true});
      }
    }, [isUserLoggedIn, navigate]);

    return <Component {...props} />;
  };

  return Wrapper;
};

export default LoginGuard;

