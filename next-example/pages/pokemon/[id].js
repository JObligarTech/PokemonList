/* eslint-disable @next/next/no-img-element */
import {useRouter} from 'next/router'
import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Details.module.css'

export default function Details() {
    const {query: {id}} = useRouter();

    const [pokemon, setPokemon] = useState({});
    const url = 'https://jherr-pokemon.s3.us-west-1.amazonaws.com/';
  
    useEffect(() => {
      async function getPokemon() {
        const res = await fetch(`${url}pokemon/${id}.json`);
        setPokemon(await res.json());
      }
      if(id) {
          getPokemon();
      }
    }, [id])

    return (
        <div>
            <Head>
                <title>Pokemon: {pokemon.name}</title>
            </Head>
            <div>
                <Link href='/'>
                    <button type='button'><a>Back To List</a></button>
                </Link>
            </div>
           <div className={styles.layout}>
                <div>
                    <img
                        className={styles.picture}
                        src={url + pokemon.image}
                        alt={pokemon.name}
                    />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>Type: {pokemon.type?.join(", ")}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th><u>Stats</u></th>
                                <th><u>Value</u></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats?.map(({ name, value })=> (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    )
}