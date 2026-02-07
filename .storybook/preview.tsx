import React from 'react';
import type { Preview } from 'storybook';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import '../styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
