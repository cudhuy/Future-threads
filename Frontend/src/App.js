import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Event from './pages/event/eventInformation';
import Layout from './pages/layout';
import Test from './pages/apitest/test';
import NoPage from './pages/nopage/noPage';
import GameUI from './pages/game/gameUI';
import TimeLine from './pages/timeline/timeLine';
import AddEventForm from './pages/newevent/eventAdd';
import GameEnd from './pages/gameend/gameEnd';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='event/:info' element={<Event />} />
					<Route path='test' element={<Test />} />
					<Route path='newEvent' element={<AddEventForm />} />
					<Route path='newCard' element={<Test />} />
					<Route path='timeline' element={<TimeLine />} />
					<Route path='game' element={<GameUI />} />
					<Route path='gameEnd' element={<GameEnd />} />
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
