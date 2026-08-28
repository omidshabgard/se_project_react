function TrendingCard() {
	return (
		<div className='overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-pink-600 to-orange-400 p-5 text-white shadow-lg'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-xl font-bold'>🔥 Trending Now</h3>

				<span className='rounded-full bg-white/20 px-3 py-1 text-xs font-semibold'>
					HOT
				</span>
			</div>

			<p className='text-lg font-semibold'>Retro Vibes</p>

			<p className='mt-1 text-sm text-white/90'>
				Styles everyone is loving right now.
			</p>

			<a
				href='https://www.nike.com'
				target='_blank'
				rel='noopener noreferrer'
				className='mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-md transition hover:scale-105 hover:bg-gray-100'
			>
				Explore the look →
			</a>
		</div>
	);
}

export default TrendingCard;
