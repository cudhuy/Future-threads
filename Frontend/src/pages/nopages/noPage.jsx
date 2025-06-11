const NoPage = ({ onclick }) => {
	return (
		<div className='bg-black'>
			<h1>404 - Page Not Found</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
			<button onClick={onclick}>Go Back</button>
		</div>
	);
};

export default NoPage;
