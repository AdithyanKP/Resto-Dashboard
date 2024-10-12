/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',  // Small devices (landscape phones, 640px and up)
      'md': '768px',  // Medium devices (tablets, 768px and up)
      'lg': '1024px', // Large devices (desktops, 1024px and up)
      'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
      '2xl': '1536px', // 2x Extra large devices (larger desktops, 1536px and up)
      // Custom sizes
      'custom': '900px', // Example of a custom size
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
