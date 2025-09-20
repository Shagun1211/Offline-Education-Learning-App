import { useState } from "react";
import { login } from "../api/api";
export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.data.success) setLoggedIn(true);
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >
        {" "}
        <h1 className="text-2xl font-bold mb-4">Teacher Login</h1>{" "}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {error && <p className="text-red-500">{error}</p>}{" "}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
          {" "}
          Login{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
