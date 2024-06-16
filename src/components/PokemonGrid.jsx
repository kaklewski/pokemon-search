import React, { use, useState } from 'react';
import styles from './pokemonGrid.module.css';
import logo from '../assets/logo.png';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

export default function PokemonGrid(props) {
	const { handleSelectPokemon, url } = props;
	const [search, setSearch] = useState('');

	let data;
	if (localStorage.getItem('pokemon-cards')) {
		data = JSON.parse(localStorage.getItem('pokemon-cards'));
	} else {
		data = use(fetchData(url));
		localStorage.setItem('pokemon-cards', JSON.stringify(data));
	}

	return (
		<div className={styles.pokemonGrid}>
			<h1 className={styles.header}>
				<img src={logo} />
			</h1>
			<div className={styles.listContainer}>
				<input
					className={styles.search}
					placeholder='Search Pokemon'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div>
					{data.results
						.filter((value) => {
							return value.name.includes(search);
						})
						.map((pokemon, pokemonIndex) => {
							return (
								<div
									onClick={handleSelectPokemon(pokemon.name)}
									key={pokemonIndex}
									className={styles.pokemon}>
									{pokemon.name.charAt(0).toUpperCase() +
										pokemon.name.slice(1)}
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
