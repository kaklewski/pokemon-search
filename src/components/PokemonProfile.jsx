import React, { use } from 'react';
import styles from './pokemonProfile.module.css';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

function capitalizeFirstLetter(word) {
	if (typeof word !== 'string') return;
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function displayId(id){
return '#' + id.toString().padStart(3,'0')
}

export default function PokemonCard(props) {
	const { selectedPokemon, clearHandler, parentUrl } = props;
	const pokemonUrl = parentUrl + selectedPokemon;

	const data = use(fetchData(pokemonUrl));

	// console.log(data); // DO WYWALENIA

	return (
		<div>
			<div className={styles.navBar}>
				<div className={styles.navBarContainer}>
					<button className={styles.closeBtn} onClick={clearHandler}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='1.7'
							stroke-linecap='round'
							stroke-linejoin='round'
							class='icon icon-tabler icons-tabler-outline icon-tabler-arrow-left'>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M5 12l14 0' />
							<path d='M5 12l6 6' />
							<path d='M5 12l6 -6' />
						</svg>
					</button>
					<h1>{capitalizeFirstLetter(selectedPokemon)} {displayId(data.id)}</h1>
				</div>
			</div>

			<div className={styles.bodyContainer}>
				<div className={styles.infoBox}>
					<img
						src={
							data.sprites.other['official-artwork'].front_default
						}
						alt={selectedPokemon}
					/>
				</div>

				<div className={styles.infoBox}>
					<h3>Stats</h3>
					{data.stats.map((stat, statIndex) => {
						return (
							<p key={statIndex}>
								<b>{stat.stat.name}: </b>
								{stat.base_stat}
							</p>
						);
					})}
				</div>

				<div className={styles.infoBox}>
					<h3>Types</h3>
					<div className={styles.types}>
						{data.types.map((type, typeIndex) => {
							return (
								<span key={typeIndex} className={styles.type} data-type={type.type.name} >
									{capitalizeFirstLetter(type.type.name)}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
