import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSite from "./pages/LoginSite";
import Rutineliste from "./pages/Rutineliste";
import Stempling from "./pages/Stempling";
import Lonkort from "./pages/Lonkort";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        {/* <Route path="/" element={<LoginSite />} /> */}
        <Route path="/rutineliste/:id" element={<Rutineliste />} />
        <Route path="/" element={<Stempling />} />
        <Route path="/lonkort" element={<Lonkort />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
