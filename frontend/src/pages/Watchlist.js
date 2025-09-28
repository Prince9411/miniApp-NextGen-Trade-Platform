import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../services/api";

export default function Watchlist() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await getWatchlist(token);
      setProducts(res.data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWatchlist({ productId }, token);
      fetchWatchlist();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  if (!products.length) return <p>No products in watchlist.</p>;

  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: "10px" }}>
            {p.name} - ₹{p.price}{" "}
            <button onClick={() => handleRemove(p._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
