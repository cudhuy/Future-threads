import { useEffect, useRef } from 'react';
import EventWithText from './eventWithText';

const EventDisplay = ({ eventsOccured }) => {
	const divref = useRef(null);

	const scrollToBottom = () => {
		divref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
					side={index % 7 === 2 ? 'left' : 'right'}
				/>
			))}
			<div className='min-h-[155px]' />
			<div ref={divref} />
		</div>
	);
};

export default EventDisplay;
