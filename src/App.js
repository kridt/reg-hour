import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSite from "./pages/LoginSite";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<LoginSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
