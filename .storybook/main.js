module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon"
  ],
  "features": {
    emotionAlias: false
  },
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {
      builder: {
        useSWC: false
      }
    }
  },
  "typescript": {
    "reactDocgen": false,
    "check": false
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      ['@babel/preset-typescript', { allowDeclareFields: true }]
    ]
  })
}