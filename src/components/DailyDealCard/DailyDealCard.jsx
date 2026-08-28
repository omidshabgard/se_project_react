function DailyDealCard() {
	return (
		<div className='overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-orange-800 to-yellow-600 p-5 text-white shadow-lg'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-xl font-bold'>⚡ Daily Deal</h3>

				<span className='rounded-full bg-white/15 px-3 py-1 text-xs font-semibold'>
					TODAY
				</span>
			</div>

			<p className='text-lg font-semibold'>Limited-Time Offers</p>

			<p className='mt-1 text-sm text-white/90'>
				Discover special deals from top fashion brands.
			</p>

			<a
				href='https://www.nike.com/w/sale-3yaep'
				target='_blank'
				rel='noopener noreferrer'
				className='mt-5 inline-flex items-center rounded-xl bg-orange-950/40 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange-950/60'
			>
				Shop today&apos;s deals →
			</a>
		</div>
	);
}

export default DailyDealCard;
