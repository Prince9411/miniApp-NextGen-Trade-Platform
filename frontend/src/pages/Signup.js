import { useState } from "react";
import { signup } from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
    idImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "idImage") {
      setForm({ ...form, idImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      const res = await signup(formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <input name="pan" placeholder="PAN Number" onChange={handleChange} required />
        <input name="idImage" type="file" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
