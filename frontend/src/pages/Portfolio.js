import { useEffect, useState } from "react";
import { getPortfolio } from "../services/api";

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await getPortfolio(token);
      setPortfolioData(res.data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  if (!portfolioData) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Portfolio</h2>
      <p>Total Invested: ₹{portfolioData.totalInvested}</p>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units</th>
            <th>Price/Unit</th>
            <th>Current Value</th>
            <th>Returns</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.portfolio.map((p) => (
            <tr key={p.productName}>
              <td>{p.productName}</td>
              <td>{p.units}</td>
              <td>₹{p.pricePerUnit}</td>
              <td>₹{p.currentValue}</td>
              <td>₹{p.returns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
