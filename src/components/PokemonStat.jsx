import React from 'react';
import styles from './pokemonProfile.module.css';

// Display the stat value as percentage where the base is 154 because it is the highest stat value of all (Mewtwo special attack).
function countWidthPercentage(number) {
	number = parseInt(number);
	const percentage = Math.round((number / 154) * 100).toString() + '%';
	return percentage;
}

export default function PokemonStat(props) {
	const { statValue, statType } = props;

	return (
		<div className={styles.statContainer} data-stat-type={statType}>
			<div
				className={styles.statBar}
				style={{ width: countWidthPercentage(statValue) }}
				data-stat-type={statType}>
				{statValue}
			</div>
		</div>
	);
}
