import { useState, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

function App() {
	const [count, setCount] = useState(0);

	return (
		<ErrorBoundary fallback={<div>Error...</div>}>
			<Suspense fallback={<div>Loading...</div>}>
				<div className='App'></div>
			</Suspense>
		</ErrorBoundary>
	);
}

export default App;
