import "./App.css";

// Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

// Hooks
import { useAuth } from "./hooks/useAuth";
import Navbar from './components/common/Navbar';
import Footer from "./components/common/Footer";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const { auth, loading } = useAuth();
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/account/login" />} />
            <Route path="/account/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/account/register" element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path="/account/profile" element={auth ? <EditProfile /> : <Navigate to="/account/login" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
