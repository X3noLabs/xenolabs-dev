// Tailwind v3 runs as a plain PostCSS plugin (Vite picks this file up
// automatically). This replaces the deprecated @astrojs/tailwind integration,
// which did exactly this under the hood.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
