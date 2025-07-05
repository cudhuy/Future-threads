import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TimeLine from './pages/timeline/timeLine';
import Event from './pages/event/eventInformation';
import Layout from './pages/layout';
import NoPage from './pages/nopage/noPage';
import GameUI from './pages/game/gameUI';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<TimeLine />} />
					<Route path='event/:info' element={<Event />} />
					<Route path='game' element={<GameUI />} />
					<Route
						path='*'
						element={<NoPage onclick={() => window.history.back()} />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;