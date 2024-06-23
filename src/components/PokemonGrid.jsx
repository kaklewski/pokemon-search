import React, { use, useState } from 'react';
import styles from './pokemonGrid.module.css';
import logo from '../assets/logo.png';

// Fetch data from the URL
async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(word) {
	if (typeof word !== 'string') return;
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Display pokemon number as 3 digit long ID with a hashtag. It increases the initial number by 1, because the numbers come from the pokemonNames array
function displayId(number) {
	return '#' + (number + 1).toString().padStart(3, '0');
}

export default function PokemonGrid(props) {
	const { handleSelectPokemon, url } = props;
	const [search, setSearch] = useState('');

	// Check if pokemon data is available in the local storage. If so, load it. If not, fetch it and save to the local storage
	let data;
	if (localStorage.getItem('pokemon-cards')) {
		data = JSON.parse(localStorage.getItem('pokemon-cards'));
	} else {
		data = use(fetchData(url));
		localStorage.setItem('pokemon-cards', JSON.stringify(data));
	}

	// Make an array of all pokemon names. It is necessary to display pokemon IDs
	const pokemonNames = data.results.map((pokemon) => pokemon.name);

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
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
							<path d='M21 21l-6 -6' />
						</svg>
						<input
							placeholder='e.g. Pikachu'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							autoFocus
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
								<span className={styles.pokeId}>
									{displayId(
										pokemonNames.indexOf(pokemon.name)
									)}
								</span>
								<span>
									{capitalizeFirstLetter(pokemon.name)}
								</span>
							</div>
						);
					})}
			</div>
		</div>
	);
}
