import Link from 'next/link';
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
            <Link href="/"><a>Heim</a></Link>
            <Link href={loggedIn ? '/logout' : '/login'}><a>{loggedIn ? 'Skrá út' : 'Skrá inn'}</a></Link>
        </header>
    );
};

export default Header;
