import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { SnackbarProvider } from './ultit/SnackbarProvider.jsx';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
  <App />
</SnackbarProvider>,
document.getElementById('root')
)
