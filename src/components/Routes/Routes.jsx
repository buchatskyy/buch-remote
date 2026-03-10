import {Route, Routes } from "react-router-dom";

import Home from "../Home/Home"
import Weather from "../Weather/Weather";
import Cv from "../Cv/Cv"
import Contacts from "../Contacts/Contacts";
import Landing from "../Landing/Landing";
import PhotoPage from "../Photo/PhotoPage";
import Videogallery from "../Videogallery/Videogallery";
import Support from "../Support/Support";

export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="weather" element={<Weather/>}/>
            <Route path="cv" element={<Cv/>}/>
            <Route path="contacts" element={<Contacts/>}/>
            <Route path="landing" element={<Landing/>}/>
            <Route path="photo" element={<PhotoPage/>}/>
            <Route path="video" element={<Videogallery/>}/>
            <Route path="support" element={<Support/>}/>
        </Routes>
    )
}


