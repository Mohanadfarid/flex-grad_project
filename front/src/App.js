import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import { Profile } from "./pages/profile/Profile";
import * as Apis from "./api_handller";
import { useState } from "react";
import InfoForm from "./components/infoForm/InfoForm";
import DietPlan from "./pages/dietPlan/DietPlan";
import Favorite from "./pages/favorite/Favourite";
import Search from "./pages/Search/Search";

function App() {
  const [currentPage, setcurrentPage] = useState("");
  const [IP, setIP] = useState();
  const [userINFO, setuserINFO] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : ""
  );

  //clearing the token and user data after 30 min
  setTimeout(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("userData", "");
    Apis.getData(`logout`); // test later
  }, 1000 * 60 * 30);

  const setToken = (received_token) => {
    localStorage.setItem("token", received_token);
  };
  const setUserData = async (received_user_data) => {
    setuserINFO(received_user_data);
    localStorage.setItem("userData", JSON.stringify(received_user_data));
  };

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              IP={IP}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />
        <Route
          exact
          path="profile"
          element={
            <Profile
              IP={IP}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />
        <Route
          exact
          path="login"
          element={
            <LoginForm
              IP={IP}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              setToken={setToken}
              setUserData={setUserData}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />
        <Route
          exact
          path="register"
          element={
            <RegisterForm
              IP={IP}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />

        <Route
          path="infoForm"
          element={
            <InfoForm
              IP={IP}
              setUserData={setUserData}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />

        <Route
          path="dietPlan"
          element={
            <DietPlan
              IP={IP}
              currentPage={currentPage}
              setUserData={setUserData}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />

        <Route
          path="favorite"
          element={
            <Favorite
              IP={IP}
              currentPage={currentPage}
              setUserData={setUserData}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />

        <Route
          path="Search"
          element={
            <Search
              IP={IP}
              currentPage={currentPage}
              setUserData={setUserData}
              setcurrentPage={setcurrentPage}
              token={localStorage.getItem("token")}
              userData={userINFO}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
