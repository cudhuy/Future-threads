import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterModal from './filterModal.jsx';

function Filter() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');
	const predefinedTags = ['AI', 'Economy', 'Technology', 'Health', 'Science']; // Predefined tags
	const MAX_TAGS = 5; // Limit the number of tags

	// Toggle modal
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	// Handle adding a new tag
	const handleAddTag = (tag) => {
		if (tag && !tags.includes(tag) && tags.length < MAX_TAGS) {
			setTags([...tags, tag]);
			setNewTag(''); // Clear the input after adding
		}
	};

	// Handle removing a tag
	const handleRemoveTag = (tag) => {
		setTags(tags.filter((t) => t !== tag));
	};

	return (
		<>
			<div className='p-4 top-0 sticky z-10 bg-black'>
				<button
					onClick={toggleModal}
					className='bg-blue-500 p-2 rounded-md text-white flex items-center'
				>
					<FaFilter id='filter_button' className='fill-white' />
					<span className='ml-2'>Filter</span>
				</button>
			</div>

			{isModalOpen && (
				<FilterModal
					toggleModal={toggleModal}
					tags={tags}
					handleRemoveTag={handleRemoveTag}
					handleAddTag={handleAddTag}
					newTag={newTag}
					setNewTag={setNewTag}
					predefinedTags={predefinedTags}
					MAX_TAGS={MAX_TAGS}
				/>
			)}
		</>
	);
}

const FilterModal = ({
	toggleModal,
	tags,
	handleRemoveTag,
	handleAddTag,
	newTag,
	setNewTag,
	predefinedTags,
	MAX_TAGS,
}) => {
	// Filter predefined tags based on the input
	const filteredTags = predefinedTags.filter((tag) =>
		tag.toLowerCase().includes(newTag.toLowerCase()),
	);

	return (
		<div className='fixed inset-0 bg-gray-500 text-white  bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-zinc-800 p-6 rounded-lg shadow-lg w-96 max-w-full'>
				<h2 className='text-xl  font-semibold mb-4'>Filter Options</h2>

				{/* Optimism Slider */}
				<div className='mb-4'>
					<label htmlFor='optimism' className='block text-sm font-medium mb-2'>
						Optimism (Apocalypse/Utopia)
					</label>
					<input
						type='range'
						id='optimism'
						min='0'
						max='100'
						className='w-full h-2 bg-blue-200 rounded-lg'
					/>
					<div className='flex justify-between text-xs'>
						<span>Apocalypse</span>
						<span>Utopia</span>
					</div>
				</div>

				{/* Tags Section */}
				<div className='mb-4'>
					<label htmlFor='tags' className='block text-sm font-medium mb-2'>
						Tags
					</label>
					<div className='mb-2'>
						<div className='relative'>
							<input
								type='text'
								id='new-tag'
								className='border text-black p-2 rounded-md flex-grow'
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								placeholder='Add a new tag'
								disabled={tags.length >= MAX_TAGS}
							/>

							{/* Display tag suggestions */}
							{newTag && (
								<div className='absolute left-0 right-0 mt-1 bg-white text-gray-900 border border-gray-300 rounded-md max-h-40 overflow-y-auto z-10'>
									{filteredTags.map((tag, index) => (
										<div
											key={index}
											onClick={() => handleAddTag(tag)}
											className='cursor-pointer p-2 hover:bg-gray-200'
										>
											{tag}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* List of Selected Tags */}
					<div className='flex flex-wrap gap-2'>
						{tags.map((tag, index) => (
							<span
								key={index}
								onClick={() => handleRemoveTag(tag)}
								className='bg-gray-200 text-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
							>
								{tag} &times;
							</span>
						))}
					</div>

					{/* Max Tag Alert */}
					{tags.length >= MAX_TAGS && (
						<div className='text-sm text-red-500 mt-2'>
							You have reached the maximum number of tags ({MAX_TAGS}).
						</div>
					)}
				</div>

				{/* Relevance Slider */}
				<div className='mb-4'>
					<label htmlFor='relevance' className='block text-sm font-medium mb-2'>
						Relevance
					</label>
					<input
						type='range'
						id='relevance'
						min='0'
						max='100'
						className='w-full h-2 bg-blue-200 rounded-lg'
					/>
					<div className='flex justify-between text-xs'>
						<span>Low</span>
						<span>High</span>
					</div>
				</div>

				{/* Date Range */}
				<div className='mb-4 text'>
					<label
						htmlFor='date-range'
						className='block text-sm font-medium mb-2'
					>
						Date Range
					</label>
					<div className='flex space-x-2'>
						<input
							type='date'
							id='start-date'
							className='w-1/2 border text-black p-2 rounded-md'
						/>
						<input
							type='date'
							id='end-date'
							className='w-1/2 border text-black p-2 rounded-md'
						/>
					</div>
				</div>

				{/* Modal Action Buttons */}
				<div className='flex justify-between mt-4'>
					<button
						onClick={toggleModal}
						className='bg-gray-300 p-2 rounded-md text-gray-700'
					>
						Close
					</button>
					<button
						onClick={toggleModal}
						className='bg-blue-500 p-2 text-white rounded-md'
					>
						Apply Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filter;
