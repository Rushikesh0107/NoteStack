import React, { useState, useEffect } from 'react'
import SmallScreenNavbar from '../../common/SmallScreenNavbar';
import LargeScreenNavbar from '../../common/LargeScreenNavbar';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
    
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            {isMobile ? <SmallScreenNavbar /> : <LargeScreenNavbar />}
        </>
    )
}

export default Header