function StyleDropCard() {
	return (
		<div className='overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-purple-700 to-cyan-500 p-5 text-white shadow-lg'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-xl font-bold'>✨ Style Drop</h3>

				<span className='rounded-full bg-white/20 px-3 py-1 text-xs font-semibold'>
					NEW
				</span>
			</div>

			<p className='text-lg font-semibold'>New Arrivals This Week</p>

			<p className='mt-1 text-sm text-white/90'>
				Fresh styles just landed. Don’t miss out.
			</p>

			<a
				href='https://www.adidas.com'
				target='_blank'
				rel='noopener noreferrer'
				className='mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-md transition hover:scale-105 hover:bg-gray-100'
			>
				Shop new arrivals →
			</a>
		</div>
	);
}

export default StyleDropCard;
