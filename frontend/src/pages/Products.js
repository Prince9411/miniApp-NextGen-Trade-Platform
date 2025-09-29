import { useEffect, useState } from "react";
import { getProducts, buyProduct, addToWatchlist, removeFromWatchlist, getWatchlist } from "../services/api";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Products() {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchWatchlist();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const fetchWatchlist = async () => {
    const res = await getWatchlist(token);
    const watchIds = res.data.map(p => p._id);
    setWatchlist(watchIds);
  };

  const handleBuy = async (productId) => {
    const units = parseInt(prompt("Enter units to buy:"));
    if (!units || units <= 0) return;
    try {
      const res = await buyProduct({ productId, units }, token);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const toggleWatchlist = async (productId) => {
    try {
      if (watchlist.includes(productId)) {
        await removeFromWatchlist({ productId }, token);
      } else {
        await addToWatchlist({ productId }, token);
      }
      fetchWatchlist();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{p.name}</h3>
          <p>Category: {p.category}</p>
          <p>Price: ₹{p.price}</p>
          <p>Key Metric: {p.metric}</p>

          {/* Dummy Chart */}
          <Chart
            type="line"
            data={{
              labels: p.chartData?.map(c => c.date) || [],
              datasets: [
                {
                  label: "Price Trend",
                  data: p.chartData?.map(c => c.value) || [],
                  borderColor: "blue",
                  tension: 0.3,
                },
              ],
            }}
          />

          <button onClick={() => handleBuy(p._id)}>Buy</button>
          <button onClick={() => toggleWatchlist(p._id)}>
            {watchlist.includes(p._id) ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      ))}
    </div>
  );
}
