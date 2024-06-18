import React, { use, useState } from 'react';
import styles from './pokemonGrid.module.css';
import logo from '../assets/logo.png';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

function capitalizeFirstLetter(word) {
	if (typeof word !== 'string') return;
	return word.charAt(0).toUpperCase() + word.slice(1);
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

	// console.log(data); // DO WYWALENIA

	return (
		<div className={styles.pokemonGrid}>
			<div className={styles.header}>
				<div className={styles.headerContainer}>
					<img src={logo} />
					<h1>Which Pokémon are you looking for?</h1>
					<div className={styles.searchBar}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
							class='icon icon-tabler icons-tabler-outline icon-tabler-search'>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
							<path d='M21 21l-6 -6' />
						</svg>
						<input
							placeholder='e.g. Pikachu'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							autofocus
						/>
					</div>
				</div>
			</div>

			<div className={styles.listContainer}>
				{data.results
					.filter((value) => {
						return value.name.includes(search);
					})
					.map((pokemon, pokemonIndex) => {
						return (
							<div
								key={pokemonIndex}
								onClick={handleSelectPokemon(pokemon.name)}
								className={styles.pokemon}>
								{capitalizeFirstLetter(pokemon.name)}
							</div>
						);
					})}
			</div>
		</div>
	);
}
