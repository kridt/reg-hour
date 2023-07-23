import { BrowserRouter, Route, Routes } from "react-router-dom";

import Stempling from "./pages/Stempling";
import Lonkort from "./pages/Lonkort";
import Admin from "./pages/Admin";
import CreateCoworker from "./pages/CreateCoworker";
import Login from "./pages/Login";
import { auth } from "./firebase";
import AllLonKort from "./pages/AllLonKort";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import Menu from "./pages/Menu";

function App() {
  const user = auth.currentUser;

  console.log(user);

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/stempling"
          element={
            <ProtectedRoute user={user}>
              <Stempling user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="/lonkort" element={<Lonkort />} />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/create" element={<CreateCoworker />} />
        <Route path="/allLonkort" element={<AllLonKort />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute user={user}>
              <Menu />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
