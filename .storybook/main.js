/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  typescript: {
    reactDocgen: false
  }
};

export default config;