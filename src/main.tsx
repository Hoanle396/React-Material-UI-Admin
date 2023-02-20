import App from '@/App'
import store from '@/redux'
import theme from '@/styles/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import TitleContextProvider from './contexts/title-context'
const queryclient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryclient}>
        <TitleContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
          </TitleContextProvider>
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
