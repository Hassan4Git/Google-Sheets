import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Form from '@/components/Form'
import Packages from '@/components/Packages'
import Search from '@/components/Search'

export default function Home() {
	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Basic Form</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.header}>
				<Image src='/google_logo.png' height={80} width={80} alt='Google G Icon' />
				<h1>oogle Sheets API</h1>
			</div>
			<div className={styles.container}>
				<div style={{width: '30%'}}>
					<Packages />
				</div>
				<div style={{width: '30%'}}>
					<Form />
				</div>
				<div style={{width: '30%'}}>
					<Search />
				</div>
			</div>
			<div className={styles.instructions}>
				<h2>Overview</h2>
				<p>This interface allows you to interact with a Google Sheet database through an API.</p>
				<p>You can perform all 4 CRUD operations. Create, Read, Update, Delete.</p>
				<p>Create an order through the form. Search for it, and update or delete it.</p>
				<p>There are existing orders under the name 'Hassan'. </p>
			</div>
		</div>
	)
}
