import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/about/About';
import Error from './pages/Error';
import SingleAbout from './pages/about/SingleAbout';
import AboutLayout from './pages/about/AboutLayout';
import PhysiciansLayout from './pages/physicians/PhysiciansLayout';
import SinglePhysician from './pages/physicians/SinglePhysician';
import Physicians from './pages/physicians/Physicians';
import Services from './pages/services/Services';
import ServicesLayout from './pages/services/ServicesLayout';
import SingleService from './pages/services/SingleService';
function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);
    let elementHeight = document.getElementById('myElement');
    let elementWidth = document.getElementById('myElement');
    
    
    console.log('height', window.innerHeight + 'px');
    console.log('width', window.innerWidth + 'px');
    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />

                <Route path='about-us' element={<AboutLayout />}>
                    <Route index element={<About />} />
                    <Route path=':aboutId' element={<SingleAbout />} />
                </Route>
                <Route path='physicians' element={<PhysiciansLayout />}>
                    <Route index element={<Physicians />} />
                    <Route path=':physicianId' element={<SinglePhysician />} />
                </Route>
                <Route path='services' element={<ServicesLayout />}>
                    <Route index element={<Services />} />
                    <Route path=':serviceId' element={<SingleService />} />
                </Route>
                <Route path='locations' element={<Locations />} />
                <Route path='about' element={<AboutLayout />} />
                <Route path='providers' element={<PhysiciansLayout />} />
                <Route path='*' element={<Home />} />
            </Routes>
            <Footer />
        </>
    );
}
export default App;
