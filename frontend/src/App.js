import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div style={{ padding: "10px", marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
        <Link to="/products" style={{ marginRight: "15px" }}>Products</Link>
        <Link to="/portfolio" style={{ marginRight: "15px" }}>Portfolio</Link>
        <Link to="/watchlist" style={{ marginRight: "15px" }}>Watchlist</Link>
        <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        <Link to="/signup">Signup</Link>
      </div>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
