import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		if (localStorage.getItem('user')) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<header className={styles.header}>
			<Link href="/">
				<a>Heim</a>
			</Link>
			<Link href={loggedIn ? '/logout' : '/login'}>
				<a>{loggedIn ? 'Skrá út' : 'Skrá inn'}</a>
			</Link>
			{loggedIn ? (
				''
			) : (
				<Link href="/register">
					<a>Nýskráning</a>
				</Link>
			)}
		</header>
	);
};

export default Header;
