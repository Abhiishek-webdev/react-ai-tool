import React, { useState } from "react";

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    alert("Signup successful 🎉");
    setOpen(false);
  };

  return (
    <div>
      {/* 🔹 Top Right Button */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-5 right-5 px-5 py-2 rounded-xl 
        bg-gradient-to-r from-green-600 to-blue-600 
        text-white font-semibold shadow-lg hover:opacity-90"
      >
        Sign Up
      </button>

      {/* 🔹 Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl w-96 shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-lg dark:bg-zinc-700 dark:text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded-lg dark:bg-zinc-700 dark:text-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border rounded-lg dark:bg-zinc-700 dark:text-white"
                required
              />
              <button
                type="submit"
                className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold hover:opacity-90"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
