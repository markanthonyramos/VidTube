module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "default-border-color": "var(--default-border-color)",
        "body-background": "var(--body-background)",
        "white-background": "var(--white-background)",
        "black-background": "var(--black-background)",
        "white-text": "var(--white-text)",
        "black-text": "var(--black-text)",
      }
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
    },
  },
  plugins: [],
}
