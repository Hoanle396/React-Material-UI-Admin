import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import TitleContextProvider from './contexts/title-context'
import store from './redux'
import theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TitleContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </TitleContextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
