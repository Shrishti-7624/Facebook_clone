import Feed from "./Feed/Feed";
import Signup from "./SignUp/SignUp";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
