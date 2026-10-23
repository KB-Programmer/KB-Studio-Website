import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from '../hooks/useLocale.jsx'
import AppRoutes from './router.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <AppRoutes />
      </LocaleProvider>
    </BrowserRouter>
  )
}
