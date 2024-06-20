import React, { use } from 'react';
import styles from './pokemonProfile.module.css';
import PokemonStat from './PokemonStat';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

function capitalizeFirstLetter(word) {
	if (typeof word !== 'string') return;
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function displayId(id) {
	return '#' + id.toString().padStart(3, '0');
}

export default function PokemonCard(props) {
	const { selectedPokemon, clearHandler, parentUrl } = props;
	const pokemonUrl = parentUrl + selectedPokemon;

	let data;
	if (sessionStorage.getItem(selectedPokemon)) {
		data = JSON.parse(sessionStorage.getItem(selectedPokemon));
	} else {
		data = use(fetchData(pokemonUrl));
		sessionStorage.setItem(selectedPokemon, JSON.stringify(data));
	}

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
							strokeWidth='1.7'
							strokeLinecap='round'
							strokeLinejoin='round'
							>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M5 12l14 0' />
							<path d='M5 12l6 6' />
							<path d='M5 12l6 -6' />
						</svg>
					</button>
					<span>Pokémon Profile</span>
				</div>
			</div>

			<div className={styles.bodyContainer}>
				<div className={styles.infoBox}>
					<h1>
						<span>{capitalizeFirstLetter(selectedPokemon)}</span>
						<span className={styles.id}>{displayId(data.id)}</span>
					</h1>
					<img
						src={
							data.sprites.other['official-artwork'].front_default
						}
						alt={selectedPokemon}
					/>
					<div className={styles.types}>
						{data.types.map((type, typeIndex) => {
							return (
								<span
									key={typeIndex}
									className={styles.type}
									data-type={type.type.name}>
									{capitalizeFirstLetter(type.type.name)}
								</span>
							);
						})}
					</div>
				</div>

				<div className={styles.infoBox}>
					<h3>Size</h3>
					<div className={styles.sizeItems}>
						<div className={styles.sizeItem}>
							<span className={styles.sizeTitle}>Height</span>
							<span className={styles.sizeData}>
								{data.height * 10} cm
							</span>
						</div>
						<div className={styles.sizeItem}>
							<span className={styles.sizeTitle}>Weight</span>
							<span className={styles.sizeData}>
								{data.weight / 10} kg
							</span>
						</div>
					</div>
				</div>

				<div className={styles.infoBox}>
					<h3>Stats</h3>

					<p className={styles.statLabel}>HP</p>
					<PokemonStat
						statValue={data.stats[0].base_stat}
						statType={data.stats[0].stat.name}
					/>

					<p className={styles.statLabel}>Attack</p>
					<PokemonStat
						statValue={data.stats[1].base_stat}
						statType={data.stats[1].stat.name}
					/>

					<p className={styles.statLabel}>Defense</p>
					<PokemonStat
						statValue={data.stats[2].base_stat}
						statType={data.stats[2].stat.name}
					/>

					<p className={styles.statLabel}>Special Attack</p>
					<PokemonStat
						statValue={data.stats[3].base_stat}
						statType={data.stats[3].stat.name}
					/>

					<p className={styles.statLabel}>Special Defense</p>
					<PokemonStat
						statValue={data.stats[4].base_stat}
						statType={data.stats[4].stat.name}
					/>

					<p className={styles.statLabel}>Speed</p>
					<PokemonStat
						statValue={data.stats[5].base_stat}
						statType={data.stats[5].stat.name}
					/>
				</div>

				<div className={styles.infoBox}>
					<h3>Moves</h3>
					<div className={styles.moves}>
						{data.moves.map((move, moveIndex) => {
							return (
								<span
									key={moveIndex}
									className={styles.move}
									data-move={move.move.name}>
									{capitalizeFirstLetter(move.move.name)}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
