import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		if (!localStorage.getItem('isLoggedIn')) {
			localStorage.setItem('isLoggedIn', 'false');
		}
        const loggedData = window.localStorage.getItem('isLoggedIn');
        setLoggedIn(loggedData ? JSON.parse(loggedData) : false);
	});
    
	return (
        <header className={styles.header}>
            <a href="/">Heim</a>
            <a href={loggedIn ? '/logout' : '/login'}>{loggedIn ? 'Skrá út' : 'Skrá inn'}</a>
        </header>
    );
};

export default Header;
