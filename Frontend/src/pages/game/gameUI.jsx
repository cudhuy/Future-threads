import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsBar from './components/statsBar';
import EventDisplay from './components/eventDisplay';
import CardsDeck from './components/cardsDeck';
import RandomEventPopup from './components/randomEventPopup';

function GameUI() {
	// Game state
	const [stats, setStats] = useState({
		military: 50,
		politics: 50,
		environment: 50,
		qualityOfLife: 50,
		economy: 50,
	});

	const [currentEvent, setCurrentEvent] = useState();
	const [selectedCard, setSelectedCard] = useState({});
	const [eventsHappened, setEventsHappened] = useState([]);

	useEffect(() => {
		async function getData() {
			const initData = await axios.post('http://localhost:5000/api/newGame');

			console.log('INIT DATA:', initData);
			setCurrentEvent(initData.data.content);
			setStats(initData.data.content.stats);
		}
		getData();
	}, []);

	const handleCardClick = (card) => {
		setSelectedCard(card);

		const response = axios('http://localhost:5000/api/incYear', {
			selectedCard: card,
		});
		console.log(response);

		// Animate stat changes after delay
		setTimeout(() => {
			setStats((prev) => {
				const newStats = { ...prev };
				Object.keys(card.effects).forEach((stat) => {
					newStats[stat] = Math.max(
						0,
						Math.min(100, prev[stat] + card.effects[stat]),
					);
				});
				return newStats;
			});

			// Trigger random event
			setTimeout(() => {
				setRandomEvent('Citizens react to your decision!');
				// Load next random event
				setCurrentEvent();
				setEventsHappened((prev) => [...prev, currentEvent]);
				setSelectedCard(null);
			}, 1000);
		}, 500);
	};
	console.log('CURRENT EVENT:', currentEvent);

	return (
		<div className='game-container'>
			<StatsBar stats={stats} />
			<EventDisplay eventsOccured={eventsHappened} />

			{currentEvent && (
				<CardsDeck
					cards={currentEvent.cards}
					onCardClick={handleCardClick}
					selectedCardId={selectedCard?.id}
				/>
			)}

			{
				<RandomEventPopup
					event={randomEvent}
					onClose={() => setRandomEvent(null)}
				/>
			}
		</div>
	);
}

export default GameUI;
