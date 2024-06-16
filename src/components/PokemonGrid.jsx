import React, { use, useState } from 'react';
import styles from './pokemonGrid.module.css';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

export default function PokemonGrid() {
	const [search, setSearch] = useState('');

	const url = 'https://pokeapi.co/api/v2/pokemon/';

	let data;
	if (localStorage.getItem('pokemon-cards')) {
		data = JSON.parse(localStorage.getItem('pokemon-cards'));
		console.log('FETCHED FROM CACHE', console.log(data));
	} else {
		console.log('FETCHED FROM API');
		data = use(fetchData(url));
		localStorage.setItem('pokemon-cards', JSON.stringify(data));
	}

	return (
		<div className={styles.pokemonGrid}>
			<h1 className={styles.header}>MY POKEMON</h1>
			<div className={styles.listContainer}>
				<input
					placeholder='Search Pokemon'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
        {data.results.filter(value => {
          return value.name.includes(search)
        }).map((pokemon, pokemonIndex) => {
          return(
            <div key={pokemonIndex} className={styles.pokemon}>
              {pokemon.name}
            </div>

          )
        })}
			</div>
		</div>
	);
}
