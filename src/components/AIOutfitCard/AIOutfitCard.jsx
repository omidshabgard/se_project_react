function AIOutfitCard() {
	return (
		<div className='overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-900 p-5 text-white shadow-lg'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-xl font-bold'>✨ AI Outfit Picker</h3>

				<span className='rounded-full bg-white/10 px-3 py-1 text-xs font-semibold'>
					AI
				</span>
			</div>

			<p className='text-lg font-semibold'>Not sure what to wear?</p>

			<p className='mt-1 text-sm text-white/90'>
				Let AI suggest an outfit based on today&apos;s weather.
			</p>

			<button
				type='button'
				className='mt-5 inline-flex items-center rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-emerald-700'
			>
				Find my outfit →
			</button>
		</div>
	);
}

export default AIOutfitCard;
