import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? <Navigate to="/dashboard" replace /> : <Auth />
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
