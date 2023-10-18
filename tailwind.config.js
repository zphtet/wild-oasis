/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-grey-0": "#18212f",
        "color-grey-50": "#111827",
        "color-grey-100": "#1f2937",
        "color-grey-200": "#374151",
        "color-grey-300": "#4b5563",
        "color-grey-400": "#6b7280",
        "color-grey-500": "#9ca3af",
        "color-grey-600": "#d1d5db",
        "color-grey-700": "#e5e7eb",
        "color-grey-800": "#f3f4f6",
        "color-grey-900": "#f9fafb",
        " color-blue-100": "#075985",
        "color-blue-700": "#e0f2fe",
        "color-green-100": "#166534",
        "color-green-700": " #dcfce7",
        "color-yellow-100": "#854d0e",
        "color-yellow-700": "#fef9c3",
        "color-silver-100": "#374151",
        "color-silver-700": "#f3f4f6",
        "color-indigo-100": "#3730a3",
        "color-indigo-700": " #e0e7ff",
        "color-red-100": "#fee2e2",
        "color-red-700": "#b91c1c",
        "color-red-800": "#991b1b",
      },
    },
  },
  plugins: [],
};
