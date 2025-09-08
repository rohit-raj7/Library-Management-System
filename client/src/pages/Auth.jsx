import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Input component
function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        {...props}
      />
    </div>
  );
}

// Button component
function Button({ children, disabled, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://assignment20-five.vercel.app/api/auth";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = tab === "login" ? `${API}/login` : `${API}/register`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success(data.message || "Success! ");

      if (data.token && data.user && data.user.id) { 
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);
 
        // navigate(`/${data.user.id}/books`, { replace: true });
        window.location.replace(`/${data.user.id}/books`);
      }

      setForm({ email: "", password: "", name: "" });
    } catch (err) {
      toast.error(err.message || "❌ Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-2">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 font-medium rounded-lg transition ${
                tab === t
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {t === "login" ? "Login" : "Signup"}
            </button>
          ))}
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          )}
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : tab === "login" ? "Login" : "Signup"}
          </Button>
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
