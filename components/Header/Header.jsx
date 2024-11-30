import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { headerData } from './HeaderData';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.getElementById('header');
            if (header) {
                setHeaderHeight(header.clientHeight);
            }
        };

        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);

        // Check if there's a saved theme preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            setIsDarkMode(savedDarkMode === 'true');
        } else {
            // If no saved preference, set dark mode as default
            setIsDarkMode(true);
            localStorage.setItem('darkMode', 'true');
        }

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
        };
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-light');
        } else {
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-dark');
        }
    }, [isDarkMode]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', !isDarkMode);
    };

    const currentYear = new Date().getFullYear();

    return (
        <div>
            {/* Toggle Menu */}
            <div className={`toggle-menu ${isMenuOpen ? 'show' : ''} bg-black`}>
                <button className="toggle-close" onClick={closeMenu}>
                    <i className="bi bi-x"></i>
                </button>
                {/* Close button */}
                <h6 className="mono-heading fw-normal mb-2">Contact:</h6>
                <ul className="list-inline-sm mt-3">
                    <li>
                        <Link href={`mailto:${headerData.mainData.email}`} className="button-circle button-circle-sm button-circle-white">
                            <i className="bi bi-envelope"></i>
                        </Link>
                    </li>
                    <li>
                        <Link href={headerData.mainData.linkedinURL} className="button-circle button-circle-sm button-circle-white">
                            <i className="bi bi-linkedin"></i>
                        </Link>
                    </li>
                </ul>
                <div className="mt-4 mt-lg-5">
                    <ul className="list-circle">
                        <li>
                            <button className="mono-heading link-decoration" onClick={toggleDarkMode}>
                                {isDarkMode ? 'Light Version' : 'Dark Version'}
                            </button>
                        </li>
                        {headerData.links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.url} className="mono-heading link-decoration">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tm-bottom">
                    <p>&copy; {currentYear} {headerData.mainData.copywriter}.</p>
                </div>
            </div>
            {/* End Toggle Menu */}

            {/* Header */}
            <div id="header">
                <div className="row">
                    <div className="col-12 col-lg-4 col-xl-3 order-lg-2 text-end">
                        <div className="d-inline-flex align-items-center">
                            {/* Social Links */}
                            <ul className="list-inline d-inline-block mono-heading fw-medium">
                                <li>
                                    <Link href={headerData.mainData.linkedinURL} className="link-decoration">
                                        <i className="bi bi-linkedin"></i>
                                    </Link>
                                </li>
                            </ul>
                            {/* Theme Switcher */}
                            <div className="header__button">
                                <button
                                    className={`theme-switcher-button ${isDarkMode ? 'dark' : 'light'}`}
                                    onClick={toggleDarkMode}
                                    aria-label="Theme Switcher"
                                >
                                    <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 order-lg-1 col-xl-9">
                        <div className="py-4">
                            <h1 className="display-2 fw-semi-bold m-0">{headerData.mainData.firstName} <span className="stroke-text">{headerData.mainData.secondName}</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Header */}
        </div>
    );
};

export default Header;
