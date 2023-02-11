import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import '@/styles/global.scss'
function App() {
  const allPages = useRoutes(routes);
  return (
    <>{allPages}</>
  )
}

export default App
