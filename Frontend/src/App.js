import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home'
import Event from './pages/event/eventInformation'
import Layout from "./pages/layout";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="event/:info" element={<Event/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
export default App
