import React, { use } from 'react';

async function fetchData(url) {
	const response = await fetch(url);
	return response.json();
}

export default function PokemonCard() {
	url = 'https://jsonplaceholder.typicode.com/todos/1';
	const data = use(fetchData(url));
	return <div>{data.title}</div>;
}
