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
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import { LangContext } from "./context/LangContext";

function App() {
  const user = auth.currentUser;
  const [language, setLanguage] = useState();

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) {
      localStorage.setItem("language", "false");
    }
    if (language === "true") {
      setLanguage(true);
    } else {
      setLanguage(false);
    }
    console.log(language);
  }, []);

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
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
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LangContext.Provider>
  );
}

export default App;
