import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";  
import NonVeg from "./components/non_veg";   
import Veg from "./components/veg";
import Welcome from "./components/welcome";
import Add from "./components/add";
import Prof from "./components/profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/non-veg" element={<NonVeg />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/add" element={<Add />}/>
        <Route path="/prof" element={<Prof />}/>
      </Routes>
    </Router>
  );
};

export default App;
