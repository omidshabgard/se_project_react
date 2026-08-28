function ClothesSearch({ searchTerm, onSearchChange }) {
	return (
		<div className='w-full'>
			<div className='relative w-full'>
				<span className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg'>
					🔍
				</span>

				<input
					type='text'
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder='Search clothes...'
					className='w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200'
				/>
			</div>
		</div>
	);
}

export default ClothesSearch;
