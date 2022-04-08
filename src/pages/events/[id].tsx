import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { IEventSingle, IComment } from '../../types';
import styles from '../../styles/Home.module.css';
import formStyles from '../../styles/Form.module.css'
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';

const SinglePage = (props: { event: IEventSingle; id: number }) => {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('user')) {
			setLoggedIn(true);
		}
	});

	const postComment = async (e: any) => {
		e.preventDefault();

		const data = { comment: e.target.comment.value };
		console.log('data --> ', data.comment);
		const JSONData = JSON.stringify(data);

		const tokenData = window.localStorage.getItem('user');
		const JSONToken = await JSON.parse(tokenData || '');
		const token = JSONToken.token;

		const endpoint = `https://vef2-20222-v3-synilausn.herokuapp.com/events/${props.id}/register`;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSONData,
		};

		const response = await fetch(endpoint, options);
		if (response.ok) {

		}
		
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{props.event.name}</title>
				<meta
					name="description"
					content="Viðburður sóttur í viðburðarþjónustuna"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className={styles.main}>
				<h1 className={styles.title}>{props.event.name}</h1>
				<p className={styles.description}>{props.event.description}</p>
				<h2>Skráningar:</h2>
				<ul className={styles.commentContainer}>
					{props.event.registrations.map((reg: IComment) => (
						<li key={styles.id} className={styles.comment}>
							<p>
								{reg.name} <span>@{reg.username}</span>
							</p>
							<p>{reg?.comment}</p>
						</li>
					))}
				</ul>
				{loggedIn ? (
					<form className={formStyles.forms} onSubmit={postComment}>
						<input type="text" name="comment" id="comment" />
						<button type="submit">Skrá</button>
					</form>
				) : (
					<p>Til að skrá mætingu þarf að skrá inn</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id = context.params?.id;
	const res = await fetch(
		`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}`
	);
	const event: IEventSingle = await res.json();
	return {
		props: { event, id }, // will be passed to the page component as props
	};
}

export default SinglePage;
