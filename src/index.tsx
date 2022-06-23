import { ChakraProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';

import App from './App';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <ChakraProvider>
    <CSSReset />
    <ColorModeScript />
    <App />
  </ChakraProvider>
);
