import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';


function LandingPage() {
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);


    const ulRef = useRef();

    if (sessionUser) history.push('/feed')
    
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
