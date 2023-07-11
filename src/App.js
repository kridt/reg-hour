import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSite from "./pages/LoginSite";
import Rutineliste from "./pages/Rutineliste";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<LoginSite />} />
        <Route path="/rutineliste/:id" element={<Rutineliste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
