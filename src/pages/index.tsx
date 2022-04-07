import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { IEventArray, IEventOverview } from '../types';
import Footer from './components/footer';
import Header from './components/header';

const Home = (props: { events: IEventArray }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Viðburðarþjónustan</title>
				<meta
					name="description"
					content="Viðburðir frá viðburðarþjónustu"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <Header />
			<main className={styles.main}>
				<h1 className={styles.title}>
					Viðburðir frá{' '}
					<a href="https://vef2-20222-v3-synilausn.herokuapp.com/">
						viðburðarþjónustunni!
					</a>
				</h1>

				<p className={styles.description}>
					Verkefni 5 í 
					<code className={styles.code}>HBV201G - Vefforritun 2</code>
				</p>

        <div className={styles.grid}>
					{props.events.items.map((event) => (
            <a href={"./events/" + event.id} className={styles.card}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
            </a>
          ))}
        </div>
			</main>
      <Footer />
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
