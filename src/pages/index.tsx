import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { IEventArray, IEventOverview } from '../types';

const Home = (props: { events: IEventArray }) => {
	// console.log('events --> ', props.events.items[0]);
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Viðburðir frá viðburðarþjónustu"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Viðburðir frá{' '}
					<a href="https://vef2-20222-v3-synilausn.herokuapp.com/">
						viðburðarþjónustunni!
					</a>
				</h1>

				<p className={styles.description}>
					Síða aðgengileg í
					<code className={styles.code}>pages/index.tsx</code>
				</p>

        <div className={styles.grid}>
					{props.events.items.map((event) => (
            <a href={"./events/" + event.slug} className={styles.card}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
            </a>
          ))}
        </div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
};

export async function getServerSideProps() {
	const res = await fetch(
		`https://vef2-20222-v3-synilausn.herokuapp.com/events`
	);
	const events: IEventArray = await res.json();
	return {
		props: { events }, // will be passed to the page component as props
	};
}

export default Home;
