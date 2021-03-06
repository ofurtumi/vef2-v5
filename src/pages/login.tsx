import Head from 'next/head';
import Footer from './components/footer';
import Header from './components/header';
import styles from '../styles/Home.module.css';
import formStyle from '../styles/Form.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', '');
		}
	});

	const loginUser = async (event: any) => {
		event.preventDefault(); // don't redirect the page
		// ! laga þetta, allskonar ekki í lagi
		console.log('event --> ', event.target);
		const data = {
			username: event.target.username.value,
			password: event.target.password.value,
		};
		const JSONdata = JSON.stringify(data);
		// console.log('JSONdata --> ', JSONdata)
		const endpoint =
			'https://vef2-20222-v3-synilausn.herokuapp.com/users/login';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		};
		const response = await fetch(endpoint, options);
		if (response.ok) {
			const userData = await response.json();
			window.localStorage.setItem('isLoggedIn', 'true');
			window.localStorage.setItem('user', JSON.stringify(userData));
			setLoggedIn(true);
			router.push('/');
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{'Innskráning'}</title>
				<meta
					name="description"
					content="Viðburður sóttur í viðburðarþjónustuna"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className={styles.main}>
				<form
					className={formStyle.forms}
					method="post"
					onSubmit={loginUser}
				>
					<input
						placeholder="Notendanafn"
						type="text"
						name="username"
						id="username"
					/>
					<input
						placeholder="Lykilorð"
						type="password"
						name="password"
						id="password"
					/>
					<button value="submit">Skrá inn</button>
				</form>
				<p id="logged">
					{loggedIn ? 'skráð/ur inn' : 'ekki innskráð/ur'}
				</p>
			</main>
			<Footer />
		</div>
	);
};

export default Login;
