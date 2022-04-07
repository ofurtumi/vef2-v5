import Head from 'next/head';
import Footer from './components/footer';
import Header from './components/header';
import styles from '../styles/Home.module.css';
import React, { FormEvent, useEffect, useState } from 'react';

const Login = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		if (!localStorage.getItem('isLoggedIn')) {
			localStorage.setItem('isLoggedIn', 'false');
		}
        const loggedData = window.localStorage.getItem('isLoggedIn');
        setLoggedIn(loggedData ? JSON.parse(loggedData) : false);
	});

	const loginUser = async (event: any) => {
		event.preventDefault(); // don't redirect the page
		// ! laga þetta, allskonar ekki í lagi
		console.log('event --> ', event.target)
		const data = {
			username: event.target.username.value,
			password: event.target.password.value,
		};
		const JSONdata = JSON.stringify(data);
		const endpoint =
			'https://vef2-20222-v3-synilausn.herokuapp.com/users/login';
		const options = {
			// The method is POST because we are sending data.
			method: 'POST',
			// Tell the server we're sending JSON.
			headers: {
				'Content-Type': 'application/json',
			},
			// Body of the request is the JSON data we created above.
			body: JSONdata,
		};
		const response = await fetch(endpoint, options);
		const userNotif = document.querySelector('#logged');
		if (response.ok) {
			console.log('response --> ', response);
			window.localStorage.setItem("isLoggedIn","true");
			setLoggedIn(true);
		}
		else {

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
				<form method="post" onSubmit={loginUser}>
					<input type="text" name="username" id="username" />
					<input type="password" name="password" id="password" />
					<button value="submit">Skrá inn</button>
				</form>
				<p id='logged'>{loggedIn ? 'skráð/ur inn' : 'ekki innskráð/ur'}</p>
			</main>
			<Footer />
		</div>
	);
};

export default Login;
