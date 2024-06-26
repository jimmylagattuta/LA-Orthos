import { NavLink, Link } from 'react-router-dom';
import { navMenu } from '../data';
import { useState } from 'react';
import RequestAppointmentForm from './helpers/RequestAppointmentForm';
const Navbar = () => {
    const [isMobileMenuopen, setIsMobileMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
    const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false); // State to manage appointment form visibility
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuopen);
    };
    const submenuOpen = (menuName) => {
        isSubmenuOpen === menuName
            ? setIsSubmenuOpen(null)
            : setIsSubmenuOpen(menuName);
    };

    const resetMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsSubmenuOpen(null);
    };
    const toggleAppointmentForm = () => {
        console.log('toggleAppointmentForm');
        setIsAppointmentFormOpen(!isAppointmentFormOpen);
    };
    return (
        <header className='main-header'>
            <div className='header-top'>
                <button
                    className='mobile-menu-button'
                    onClick={toggleMobileMenu}>
                    <i
                        className={
                            isMobileMenuopen ? 'fa fa-times' : 'fa fa-bars'
                        }
                        aria-hidden='true'></i>
                </button>
                <div className='header-image-container'>
                    <Link to='/' className='logo-link'>
                        <img
                            src='https://i.imgur.com/3FM3KUI.webp'
                            alt='LA Ortho Associates'
                            className='header-image'
                            style={{ width: '300px', height: '120px' }}
                        />

                    </Link>
                    <div className="header-title-div">
                        <h1 className="header-title">Los Angeles Orthopedic Surgery Specialists & Advanced Orthopedics</h1>
                    </div>
                </div>
                <div className='header-buttons-container'>
                    <NavLink className='btn header-button-dark' to='/locations'>
                        Call Us
                    </NavLink>
                    <div
                        onClick={() => {
                            toggleAppointmentForm();
                            window.open('https://www.zocdoc.com/practice/los-angeles-orthopedic-surgery-specialists-86604?lock=true&isNewPatient=false&referrerType=widget', '_blank');
                        }}
                        className='btn header-button-yellow'
                    >
                        Request Appointment
                    </div>

                    {/* {isAppointmentFormOpen && (
                        <div className="appointment-form-overlay">
                            <RequestAppointmentForm toggleAppointmentForm={toggleAppointmentForm} setShowThankYouMessage={setShowThankYouMessage} />
                        </div>
                    )} */}
                    {showThankYouMessage && (
                        <div className="thank-you-message">
                            Thank you for the message! We will be with you shortly.
                        </div>
                    )}
                </div>
            </div>
            <nav
                className={`navbar ${isSubmenuOpen}-open ${
                    isMobileMenuopen ? 'mobile-menu-show' : ''
                }`}>
                {navMenu.map((item, index) => {
                    return (
                        <div key={index} className={`nav-link-container ${item.menu}-nav`}>
                            <div className='link-items'>
                                <NavLink
                                    onClick={resetMobileMenu}
                                    key={item.menu}
                                    to={item.link}
                                    alt={`Visit the ${item.menu} Page To Navigate To That Page`}
                                    aria-label={`Visit the ${item.menu} Page To Navigate To That Page`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }>
                                    {item.menu}<span style={{ display: 'none' }}>Visit the {item.menu} page</span>
                                </NavLink>
                                {item.subMenuItems && (
                                    <button
                                        className='mobile-toggle-submenu'
                                        onClick={() => submenuOpen(item.menu)}>
                                        {isSubmenuOpen === item.menu ? (
                                            <i className='fas fa-minus'></i>
                                        ) : (
                                            <i className='fas fa-plus'></i>
                                        )}
                                    </button>
                                )}
                            </div>
                            {item.subMenuItems && (
                                <div className='submenu'>
                                    <NavLink
                                        onClick={resetMobileMenu}
                                        key={item.menu}
                                        to={item.link}
                                        alt={`Visit the ${item.menu} Page To Navigate To That Page`}
                                        aria-label={`Visit the ${item.menu} Page To Navigate To That Page`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'sub-link mobile-nav-link active'
                                                : 'sub-link mobile-nav-link'
                                        }
                                        end>
                                        All {item.menu}
                                    </NavLink>
                                    <div className={`submenu-list ${item.subMenuItems.length > 16 ? 'submenu-multi-column' : item.subMenuItems.length > 6 ? 'submenu-two-column' : ''}`}>
                                    {item.subMenuItems.sort().map((subItem) => {
                                        return (
                                            <NavLink
                                                onClick={resetMobileMenu}
                                                key={subItem}
                                                to={`${item.link}/${subItem.toLowerCase().split(' ').join('-')}`}
                                                className={({ isActive }) =>
                                                    isActive ? 'sub-link active' : 'sub-link'
                                                }>
                                                {subItem}
                                            </NavLink>
                                        );
                                    })}

                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
};
export default Navbar;
