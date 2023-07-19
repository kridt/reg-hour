import { BrowserRouter, Route, Routes } from "react-router-dom";

import Stempling from "./pages/Stempling";
import Lonkort from "./pages/Lonkort";
import Admin from "./pages/Admin";
import CreateCoworker from "./pages/CreateCoworker";
import Login from "./pages/Login";
import { auth } from "./firebase";
import AllLonKort from "./pages/AllLonKort";

function App() {
  const user = auth.currentUser;

  console.log(user);

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stempling" element={<Stempling user={user} />} />
        <Route path="/lonkort" element={<Lonkort />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create" element={<CreateCoworker />} />
        <Route path="/allLonkort" element={<AllLonKort />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
