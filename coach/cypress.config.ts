import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    supportFile: false,
    specPattern: "**/*.{,spec}.{js,jsx,ts,tsx}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
