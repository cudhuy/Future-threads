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
				<div className='flex'>
					<EventWithText
						key={index}
						event={event}
						side={index % 2 === 0 ? 'left' : 'right'}
					/>
				</div>
			))}
			<div className='min-h-[155px]' />
			<div ref={divref} />
		</div>
	);
};

export default EventDisplay;
