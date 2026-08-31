import { useEffect, useState } from 'react';

function AIOutfitModal({ isOpen, onClose, weatherData, clothItems }) {
	const [generatedOutfit, setGeneratedOutfit] = useState(null);

	useEffect(() => {
		if (!isOpen) {
			setGeneratedOutfit(null);
		}
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	const getCategory = (name = '') => {
		const itemName = name.toLowerCase();

		if (
			itemName.includes('shirt') ||
			itemName.includes('top') ||
			itemName.includes('hoodie') ||
			itemName.includes('sweater')
		) {
			return 'top';
		}

		if (
			itemName.includes('jeans') ||
			itemName.includes('pants') ||
			itemName.includes('shorts')
		) {
			return 'bottom';
		}

		if (
			itemName.includes('shoe') ||
			itemName.includes('sneaker') ||
			itemName.includes('boot')
		) {
			return 'shoes';
		}

		if (itemName.includes('jacket') || itemName.includes('coat')) {
			return 'outerwear';
		}

		return 'other';
	};

	const getRandomItem = (items) => {
		if (!items || items.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * items.length);

		return items[randomIndex];
	};

	const handleGenerateOutfit = () => {
		const currentWeather = weatherData?.type;

		const weatherItems =
			clothItems?.filter((item) => item.weather === currentWeather) || [];

		const availableItems =
			weatherItems.length > 0 ? weatherItems : clothItems || [];

		const tops = availableItems.filter(
			(item) => getCategory(item.name) === 'top',
		);

		const bottoms = availableItems.filter(
			(item) => getCategory(item.name) === 'bottom',
		);

		const shoes = availableItems.filter(
			(item) => getCategory(item.name) === 'shoes',
		);

		const outerwear = availableItems.filter(
			(item) => getCategory(item.name) === 'outerwear',
		);

		const selectedTop = getRandomItem(tops);
		const selectedBottom = getRandomItem(bottoms);
		const selectedShoes = getRandomItem(shoes);

		let selectedOuterwear = null;

		if (currentWeather === 'warm' || currentWeather === 'cold') {
			selectedOuterwear = getRandomItem(outerwear);
		}

		const outfitItems = [
			selectedTop,
			selectedBottom,
			selectedShoes,
			selectedOuterwear,
		].filter(Boolean);

		if (outfitItems.length === 0) {
			setGeneratedOutfit({
				items: [],
				message:
					'I could not find enough matching clothing items for today. Try adding more items to your WTWR wardrobe.',
			});

			return;
		}

		setGeneratedOutfit({
			items: outfitItems,
			message: `This outfit is based on today's ${
				weatherData?.temp?.F || ''
			}°F ${currentWeather || ''} weather and the items available in your WTWR wardrobe.`,
		});
	};

	return (
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4'>
			<div className='relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl'>
				<button
					type='button'
					onClick={onClose}
					aria-label='Close AI Outfit Picker'
					className='absolute right-5 top-4 text-3xl font-bold text-gray-400 transition hover:scale-110 hover:text-black'
				>
					×
				</button>

				<div className='mb-6'>
					<div className='flex items-center gap-3'>
						<span className='text-3xl'>✨</span>

						<h2 className='text-2xl font-bold text-gray-900'>
							AI Outfit Picker
						</h2>
					</div>

					<p className='mt-2 text-sm text-gray-500'>
						Let AI build an outfit from the clothes available in
						WTWR.
					</p>
				</div>

				<div className='mb-4 rounded-2xl bg-blue-50 p-4'>
					<p className='text-sm font-semibold text-gray-500'>
						Today&apos;s weather
					</p>

					<p className='mt-1 text-xl font-bold text-gray-900'>
						🌤️ {weatherData?.temp?.F}°F
						{weatherData?.type ? ` • ${weatherData.type}` : ''}
					</p>
				</div>

				<div className='rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-900 p-5 text-white'>
					<div className='flex items-center gap-2'>
						<span className='text-2xl'>🤖</span>

						<p className='font-bold'>AI Stylist</p>
					</div>

					{!generatedOutfit ? (
						<>
							<p className='mt-3 text-sm leading-6 text-white/90'>
								I can analyze today&apos;s weather and your WTWR
								clothing catalog to recommend an outfit.
							</p>

							<p className='mt-4 text-xs text-white/60'>
								{clothItems?.length || 0} clothing items
								available
							</p>
						</>
					) : (
						<div className='mt-4'>
							{generatedOutfit.items.length > 0 && (
								<>
									<p className='mb-3 text-sm font-semibold text-emerald-200'>
										Today&apos;s outfit
									</p>

									<div className='grid grid-cols-2 gap-3'>
										{generatedOutfit.items.map((item) => (
											<div
												key={item._id}
												className='overflow-hidden rounded-xl bg-white/10'
											>
												<img
													src={item.imageUrl}
													alt={item.name}
													className='h-28 w-full object-cover'
												/>

												<p className='p-2 text-xs font-semibold'>
													{item.name}
												</p>
											</div>
										))}
									</div>
								</>
							)}

							<p className='mt-4 text-sm leading-6 text-white/90'>
								{generatedOutfit.message}
							</p>
						</div>
					)}
				</div>

				<button
					type='button'
					onClick={handleGenerateOutfit}
					className='mt-5 w-full rounded-xl bg-orange-400 px-5 py-3 font-bold text-black shadow-md transition duration-300 hover:scale-[1.02] hover:bg-orange-300'
				>
					{generatedOutfit
						? '✨ Generate another outfit'
						: '✨ Generate my outfit'}
				</button>

				<p className='mt-3 text-center text-xs text-gray-400'>
					AI suggestions use your weather and clothing data.
				</p>
			</div>
		</div>
	);
}

export default AIOutfitModal;
