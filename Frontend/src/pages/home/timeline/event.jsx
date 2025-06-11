const Event = ({ event, side }) => {
	return (
		<div
			className={`event relative flex ${
				side === 'left' ? 'justify-start' : 'justify-end'
			} w-full py-8`}
		>
			{/* Event Content */}
			<div className='event-content bg-white p-4 rounded-lg shadow-lg w-full md:w-3/4'>
				<h2 className='text-xl font-semibold'>{event.title}</h2>
				{event.image && (
					<img
						src={event.image}
						alt={event.title}
						className='my-4 w-full rounded-lg'
					/>
				)}
				<p>{event.content}</p>
				{event.url && (
					<p>
						<a
							href={event.url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-orange-500 underline'
						>
							Read more
						</a>
					</p>
				)}
				<small className='text-gray-500'>{event.date}</small>
			</div>

			{/* Circle indicator */}
			<div
				className={`absolute top-0 ${
					side === 'left' ? 'left-[-12px]' : 'right-[-12px]'
				} transform -translate-x-1/2 bg-white border-4 border-orange-500 rounded-full w-6 h-6 z-20`}
			></div>
		</div>
	);
};

export default Event;

'px-4 py-2 bg-orange-500 text-white rounded-lg focus:outline-none hover:bg-orange-600';