import React from 'react';
import styles from './pokemonProfile.module.css';

function countWidthPercentage(number) {
	number = parseInt(number);
	const percentage = Math.round((number / 154)*100).toString() + '%';
	return percentage;
}

export default function PokemonStat(props) {
	const { statValue, statType } = props;

	return (
		<div className={styles.statContainer} data-statType={statType}>
			<div
				className={styles.statBar}
				style={{ width: countWidthPercentage(statValue) }}
				data-statType={statType}>
				{statValue}
			</div>
		</div>
	);
}
