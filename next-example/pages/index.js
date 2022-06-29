/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const url = 'https://jherr-pokemon.s3.us-west-1.amazonaws.com/';
  const res = await fetch(`${url}index.json`);

  return {
    props: {
      pokemons: await res.json()
    }
  }
}

export default function Home({pokemons}) {
  const url = 'https://jherr-pokemon.s3.us-west-1.amazonaws.com/';
  if (!pokemons) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokemon List</h1>
        <div className={styles.grid}>
            {pokemons?.map((pokemon) => (
              <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
               <a>
               <img 
                src={url + pokemon.image}  
                alt={pokemon.name}
              />
              <h3 className={styles.description}>{pokemon.name}</h3>
               </a>
              </Link>
            ))}
        </div>
      </main>
    </div>
    )
  }
