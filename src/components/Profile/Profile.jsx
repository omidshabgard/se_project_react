import { useContext, useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import './Profile.css';
import ClothesSection from '../ClothesSection/ClothesSection';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ handleAddClick, handleLogout }) {
	const [activeSection, setActiveSection] = useState(() => {
		return localStorage.getItem('activeProfileSection') || 'my-items';
	});

	const [aiAction, setAiAction] = useState('');
	const [aiResponse, setAiResponse] = useState('');

	const { clothItems, weatherData } = useContext(
		CurrentTemperatureUnitContext,
	);

	const { currentUser } = useContext(CurrentUserContext);

	useEffect(() => {
		localStorage.setItem('activeProfileSection', activeSection);
	}, [activeSection]);

	const sameId = (firstId, secondId) => {
		if (!firstId || !secondId) {
			return false;
		}

		return firstId.toString() === secondId.toString();
	};

	const currentUserItems =
		clothItems?.filter(
			(item) => currentUser && sameId(item.owner, currentUser._id),
		) || [];

	const favoriteItems =
		clothItems?.filter(
			(item) =>
				currentUser &&
				item.likes?.some((id) => sameId(id, currentUser._id)),
		) || [];

	const getCategory = (name = '') => {
		const itemName = name.toLowerCase();

		if (
			itemName.includes('shirt') ||
			itemName.includes('top') ||
			itemName.includes('hoodie') ||
			itemName.includes('sweater')
		) {
			return 'tops';
		}

		if (
			itemName.includes('jeans') ||
			itemName.includes('pants') ||
			itemName.includes('shorts')
		) {
			return 'bottoms';
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

		if (
			itemName.includes('hat') ||
			itemName.includes('cap') ||
			itemName.includes('watch') ||
			itemName.includes('sock') ||
			itemName.includes('backpack')
		) {
			return 'accessories';
		}

		return 'other';
	};

	const buildWardrobeAnalysis = () => {
		if (currentUserItems.length === 0) {
			return 'Your wardrobe is empty right now. Add some clothing items and I can analyze your collection.';
		}

		const categoryCounts = {
			tops: 0,
			bottoms: 0,
			shoes: 0,
			outerwear: 0,
			accessories: 0,
			other: 0,
		};

		const weatherCounts = {
			hot: 0,
			warm: 0,
			cold: 0,
		};

		currentUserItems.forEach((item) => {
			const category = getCategory(item.name);

			categoryCounts[category] += 1;

			if (weatherCounts[item.weather] !== undefined) {
				weatherCounts[item.weather] += 1;
			}
		});

		const strongestCategory = Object.entries(categoryCounts).sort(
			(a, b) => b[1] - a[1],
		)[0];

		const strongestWeather = Object.entries(weatherCounts).sort(
			(a, b) => b[1] - a[1],
		)[0];

		return `You currently have ${currentUserItems.length} items in your wardrobe. I found ${categoryCounts.tops} tops, ${categoryCounts.bottoms} bottoms, ${categoryCounts.shoes} shoes, ${categoryCounts.outerwear} outerwear items, and ${categoryCounts.accessories} accessories. Your largest category is ${strongestCategory[0]}, and most of your collection is designed for ${strongestWeather[0]} weather. You also have ${favoriteItems.length} favorite item${favoriteItems.length === 1 ? '' : 's'}.`;
	};

	const buildOutfitSuggestion = () => {
		if (currentUserItems.length === 0) {
			return 'Add some clothing items first, then I can build an outfit from your wardrobe.';
		}

		const currentWeatherType = weatherData?.type;

		const weatherItems = currentWeatherType
			? currentUserItems.filter(
					(item) => item.weather === currentWeatherType,
				)
			: currentUserItems;

		const availableItems =
			weatherItems.length > 0 ? weatherItems : currentUserItems;

		const top = availableItems.find(
			(item) => getCategory(item.name) === 'tops',
		);

		const bottom = availableItems.find(
			(item) => getCategory(item.name) === 'bottoms',
		);

		const shoes = availableItems.find(
			(item) => getCategory(item.name) === 'shoes',
		);

		const outerwear = availableItems.find(
			(item) => getCategory(item.name) === 'outerwear',
		);

		const outfitParts = [];

		if (top) {
			outfitParts.push(top.name);
		}

		if (bottom) {
			outfitParts.push(bottom.name);
		}

		if (shoes) {
			outfitParts.push(shoes.name);
		}

		if (
			outerwear &&
			(currentWeatherType === 'cold' || currentWeatherType === 'warm')
		) {
			outfitParts.push(outerwear.name);
		}

		if (outfitParts.length === 0) {
			return 'I found clothing in your wardrobe, but I need more variety to build a complete outfit.';
		}

		const temperature = weatherData?.temp?.F;

		return `For today's ${
			temperature ? `${temperature}°F ` : ''
		}${currentWeatherType || ''} weather, I suggest: ${outfitParts.join(
			' + ',
		)}. These pieces come directly from your WTWR wardrobe.`;
	};

	const buildStyleInsights = () => {
		if (currentUserItems.length === 0) {
			return 'Once you add clothing to your wardrobe, I can start learning about your style.';
		}

		const casualKeywords = [
			'shirt',
			't-shirt',
			'sneaker',
			'jeans',
			'shorts',
			'hoodie',
		];

		const sportKeywords = [
			'running',
			'sport',
			'gym',
			'training',
			'athletic',
		];

		const workKeywords = ['jacket', 'watch', 'boot', 'dress', 'formal'];

		let casual = 0;
		let sport = 0;
		let work = 0;

		currentUserItems.forEach((item) => {
			const name = item.name.toLowerCase();

			if (casualKeywords.some((word) => name.includes(word))) {
				casual += 1;
			}

			if (sportKeywords.some((word) => name.includes(word))) {
				sport += 1;
			}

			if (workKeywords.some((word) => name.includes(word))) {
				work += 1;
			}
		});

		const styleScores = [
			['casual', casual],
			['sport', sport],
			['work', work],
		].sort((a, b) => b[1] - a[1]);

		const mainStyle = styleScores[0][1] > 0 ? styleScores[0][0] : 'mixed';

		return `Your wardrobe currently leans toward a ${mainStyle} style. I found ${casual} casual-style items, ${sport} sport-related items, and ${work} work/formal-style items. You have ${favoriteItems.length} favorite item${favoriteItems.length === 1 ? '' : 's'}, which can help me improve future recommendations.`;
	};

	const handleAIAction = (action) => {
		setAiAction(action);

		if (action === 'wardrobe') {
			setAiResponse(buildWardrobeAnalysis());
		}

		if (action === 'outfit') {
			setAiResponse(buildOutfitSuggestion());
		}

		if (action === 'insights') {
			setAiResponse(buildStyleInsights());
		}
	};

	return (
		<div className='profile'>
			<section className='profile__sideBar'>
				<SideBar
					handleLogout={handleLogout}
					handleAddClick={handleAddClick}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				<div className='mt-6 w-72 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 p-5 text-white shadow-lg'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<span className='text-xl'>🤖</span>

							<h3 className='text-lg font-bold'>
								AI Style Assistant
							</h3>
						</div>

						<span className='rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide'>
							AI
						</span>
					</div>

					<p className='mt-3 text-sm leading-5 text-white/80'>
						Your personal wardrobe assistant.
					</p>

					<div className='mt-4 flex flex-col gap-2'>
						<button
							type='button'
							onClick={() => handleAIAction('wardrobe')}
							className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${
								aiAction === 'wardrobe'
									? 'bg-orange-300 text-black'
									: 'bg-white/10 text-white hover:bg-white/20'
							}`}
						>
							👕 Analyze my wardrobe
						</button>

						<button
							type='button'
							onClick={() => handleAIAction('outfit')}
							className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${
								aiAction === 'outfit'
									? 'bg-orange-300 text-black'
									: 'bg-white/10 text-white hover:bg-white/20'
							}`}
						>
							✨ Suggest an outfit
						</button>

						<button
							type='button'
							onClick={() => handleAIAction('insights')}
							className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${
								aiAction === 'insights'
									? 'bg-orange-300 text-black'
									: 'bg-white/10 text-white hover:bg-white/20'
							}`}
						>
							📊 My style insights
						</button>
					</div>

					{aiResponse && (
						<div className='mt-4 rounded-xl bg-white/10 p-3'>
							<div className='mb-2 flex items-center gap-2'>
								<span>✨</span>

								<p className='text-xs font-bold text-purple-200'>
									AI Stylist
								</p>
							</div>

							<p className='text-sm leading-5 text-white/90'>
								{aiResponse}
							</p>
						</div>
					)}
				</div>
			</section>

			<section className='profile__clothSection'>
				<ClothesSection
					handleAddClick={handleAddClick}
					activeSection={activeSection}
				/>
			</section>
		</div>
	);
}

export default Profile;
