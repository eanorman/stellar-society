import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';


function LandingPage() {
    const [showMenu, setShowMenu] = useState(false);

    const ulRef = useRef();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='landing-container'>
            <h1>Connecting passion, one nebula at a time.</h1>
            <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />} />
        </div>
    )
}

export default LandingPage;