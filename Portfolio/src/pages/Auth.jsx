import { useState } from "react";
import Input from '../components/Input';
import Button from '../components/Buttom'

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      console.log("Login with", form);
    } else {
      console.log("Signup with", form);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("login")}
            className={`px-6 py-2 font-medium rounded-l-lg ${tab === "login"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`px-6 py-2 font-medium rounded-r-lg ${tab === "signup"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit}>
          {tab === "signup" && (
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          )}
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <Button type="submit">{tab === "login" ? "Login" : "Signup"}</Button>
        </form>

        {/* Extra links */}
        {tab === "login" && (
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => setTab("signup")}
            >
              Signup
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
