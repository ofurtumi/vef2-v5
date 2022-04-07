import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { IEventSingle, IComment } from '../../types';
import styles from '../../styles/Home.module.css';
import Header from '../components/header';
import Footer from '../components/footer';

const singlePage = (props: { event: IEventSingle }) => {
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
								{reg.name}{' '}
								<span>@{reg.username}</span>
							</p>
							<p>{reg?.comment}</p>
						</li>
					))}
				</ul>
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
		props: { event }, // will be passed to the page component as props
	};
}

export default singlePage;
