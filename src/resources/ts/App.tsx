import React from 'react';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Button, ChakraProvider  } from "@chakra-ui/react";

import theme from './src/theme/theme';
import { Router } from './src/router/Router';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ChakraProvider>
    )
}
