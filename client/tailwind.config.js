/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import plugin from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), plugin],
};
