import { useEffect, useRef } from 'react';
import EventWithText from './eventWithText';

const EventDisplay = ({ eventsOccured }) => {
	console.log(eventsOccured);
	const divref = useRef(null);

	const scrollToBottom = () => {
		divref.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [eventsOccured]);
	return (
		<div className='event-display'>
			{eventsOccured.map((event, index) => (
				<EventWithText
					key={index}
					event={event}
					side={index % 7 === 0 ? 'left' : 'right'}
					text={'Hello, World!'}
				/>
			))}
			<div ref={divref} />
		</div>
	);
};

export default EventDisplay;
