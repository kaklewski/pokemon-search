import React, { use } from 'react';
import styles from './pokemonProfile.module.css';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

export default function PokemonCard(props) {
	const { selectedPokemon, clearHandler, parentUrl } = props;
	const pokemonUrl = parentUrl + selectedPokemon;

	const data = use(fetchData(pokemonUrl));

	return (
		<div className={styles.card}>
			<div className={styles.headerBar}>
				<h1>{selectedPokemon}</h1>
				<div className={styles.closeBtn} onClick={clearHandler}>
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
						class='icon icon-tabler icons-tabler-outline icon-tabler-x'>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M18 6l-12 12' />
						<path d='M6 6l12 12' />
					</svg>
				</div>
			</div>
			<img src={data.sprites.front_default} alt={selectedPokemon} />
			<h3>Stats</h3>
			{data.stats.map((stat, statIndex) => {
				return (
					<p key={statIndex}>
						<b>{stat.stat.name}: </b>
						{stat.base_stat}
					</p>
				);
			})}
			<h3>Types</h3>
			<div>
				{data.types.map((type, typeIndex) => {
					return <span key={typeIndex}>{type.type.name}, </span>;
				})}
			</div>
		</div>
	);
}
