import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import history from '/router/history'
import { store } from '/store'

import App from './App'

const root = document.getElementById('root')
ReactDOM.render(
    <ChakraProvider>
        <StoreProvider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </StoreProvider>
    </ChakraProvider>,
    root,
)
