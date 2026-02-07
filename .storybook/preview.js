import '../styles/globals.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ChakraProvider value={defaultSystem}>
      <Story />
    </ChakraProvider>
  ),
];
