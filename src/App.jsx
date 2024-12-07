import { RouterProvider } from 'react-router-dom'
import routeConfig from './route/routeConfig'


function App() {

  return <RouterProvider router={routeConfig} fallbackElement={<p>Loading...</p>}/>
}

export default App
