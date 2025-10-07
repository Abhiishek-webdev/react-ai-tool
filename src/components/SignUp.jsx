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
      {/* 🔹 Floating Top-Right Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 px-5 py-2 rounded-xl 
        bg-gradient-to-r from-green-600 to-blue-600 
        text-white font-semibold shadow-lg hover:opacity-90 
        active:scale-95 transition-transform duration-150 z-50
        text-sm sm:text-base"
      >
        Sign Up
      </button>

      {/* 🔹 Modal Overlay */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          {/* 🔹 Modal Box */}
          <div
            className="bg-white dark:bg-zinc-800 p-6 sm:p-8 rounded-2xl w-full max-w-md 
            shadow-lg relative animate-fadeIn"
          >
            {/* 🔹 Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold 
              text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* 🔹 Title */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center dark:text-white">
              Create Account
            </h2>

            {/* 🔹 Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 
                dark:bg-zinc-700 dark:text-white outline-none transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 
                dark:bg-zinc-700 dark:text-white outline-none transition"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 
                dark:bg-zinc-700 dark:text-white outline-none transition"
                required
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 sm:py-3 rounded-lg bg-gradient-to-r 
                from-green-600 to-blue-600 text-white font-semibold hover:opacity-90 
                active:scale-95 transition-transform duration-150"
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
