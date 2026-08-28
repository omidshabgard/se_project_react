import { useEffect, useState } from 'react';

const ads = [
	{
		title: 'Nike Running Shoes',
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
		url: 'https://www.nike.com',
	},
	{
		title: 'Adidas Sportswear',
		image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f',
		url: 'https://www.adidas.com',
	},
	{
		title: 'Puma Training Gear',
		image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3',
		url: 'https://us.puma.com',
	},
	{
		title: 'New Balance Sneakers',
		image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
		url: 'https://www.newbalance.com',
	},
	{
		title: 'Under Armour Activewear',
		image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
		url: 'https://www.underarmour.com',
	},
];

function AdCarousel() {
	const [currentAd, setCurrentAd] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentAd((prev) => (prev + 1) % ads.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	const ad = ads[currentAd];

	return (
		<div className='w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-md'>
			<a
				href={ad.url}
				target='_blank'
				rel='noopener noreferrer'
				className='block'
			>
				<img
					src={ad.image}
					alt={ad.title}
					className='h-80 w-full object-cover'
				/>

				<div className='p-4'>
					<p className='text-lg font-bold text-gray-900'>
						{ad.title}
					</p>

					<p className='mt-1 text-sm text-gray-500'>Shop now →</p>
				</div>
			</a>

			<div className='flex justify-center gap-2 pb-4'>
				{ads.map((_, index) => (
					<button
						key={index}
						type='button'
						onClick={() => setCurrentAd(index)}
						className={`h-2.5 w-2.5 rounded-full ${
							index === currentAd ? 'bg-black' : 'bg-gray-300'
						}`}
						aria-label={`Show advertisement ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

export default AdCarousel;
