import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Todos from "./components/Todos"


function App() {
 

  return (
    <>
    <Navbar/>
<Routes>
  <Route path="/" element={<Todos/>} />
</Routes>
    </>
  )
}

export default App
