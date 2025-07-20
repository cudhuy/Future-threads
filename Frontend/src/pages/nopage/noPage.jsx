const NoPage = ({ onclick }) => {
	return (
		<div className='bg-black text-white flex items-center justify-center min-h-screen min-w-full '>
			<h1 className='text-4xl flex justify-center'>404 - Page Not Found</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
			<button
				className='bg-white text-black py-2 px-4 rounded'
				onClick={onclick}
			>
				Go Back
			</button>
		</div>
	);
};

export default NoPage;
