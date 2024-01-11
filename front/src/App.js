import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/profile/Profile";
import InfoForm from "./components/infoForm/InfoForm";
import DietPlan from "./pages/dietPlan/DietPlan";
import Favorite from "./pages/favorite/Favourite";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route path="/infoForm" element={<InfoForm />} />
        <Route path="/dietPlan" element={<DietPlan />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/Search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
