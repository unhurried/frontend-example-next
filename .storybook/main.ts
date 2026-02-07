import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../components/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
};

export default config;
