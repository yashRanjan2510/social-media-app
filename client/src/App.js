import Login from "./pages/login/Login";
import { Route,Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element= {<Login/>} />
      <Route path="/signup" element= {<Signup/>} />
        </Routes>  
    </div>
  );
}

export default App;
