import Head from 'next/head';
import Footer from './components/footer';
import Header from './components/header';
import styles from '../styles/Home.module.css';
import formStyles from '../styles/Form.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
	const [registration, setRegistration] = useState(false);

	const registerUser = async (event: any) => {
		event.preventDefault(); // don't redirect the page
		// ! laga þetta, allskonar ekki í lagi
		console.log('event --> ', event.target);
		const data = {
			name: event.target.name.value,
			username: event.target.username.value,
			password: event.target.password.value,
		};
		const JSONdata = JSON.stringify(data);
		// console.log('JSONdata --> ', JSONdata)
		const endpoint =
			'https://vef2-20222-v3-synilausn.herokuapp.com/users/register';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		};
		const response = await fetch(endpoint, options);
		console.log('response --> ', response)
		if (response.ok) {
			const userData = await response.json();
			setRegistration(true);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{'Ný skráning'}</title>
				<meta
					name="description"
					content="Viðburður sóttur í viðburðarþjónustuna"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className={styles.main}>
				<form autoComplete="off" className={formStyles.forms} method="post" onSubmit={registerUser}>
					<input placeholder='Fullt Nafn' type="text" name="name" id="name" />
					<input placeholder='Notendanafn' type="text" name="username" id="username" />
					<input placeholder='Lykilorð' type="password" name="password" id="password" />
					<button value="submit">Skrá Notanda</button>
				</form>
				<p id="logged">
					{registration ? <Link href='/login'><a>Nýskráning tókst vinsamlegast skráðu þig inn</a></Link> : 'ekki innskráð/ur'}
				</p>
			</main>
			<Footer />
		</div>
	);
};

export default Register;
