import { useContext, useState } from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import AdCarousel from '../AdCarousel/AdCarousel';
import TrendingCard from '../TrendingCard/TrendingCard';
import StyleDropCard from '../StyleDropCard/StyleDropCard';
import AIOutfitCard from '../AIOutfitCard/AIOutfitCard';
import DailyDealCard from '../DailyDealCard/DailyDealCard';
import WhyShopCard from '../WhyShopCard/WhyShopCard';
import StyleFilter from '../StyleFilter/StyleFilter';
import ClothesSearch from '../ClothesSearch/ClothesSearch';
import AIOutfitModal from '../AIOutfitModal/AIOutfitModal';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function Main({ weatherData, handleCardClick, children }) {
	const { currentTemperatureUnit, clothItems } = useContext(
		CurrentTemperatureUnitContext,
	);

	const [activeStyle, setActiveStyle] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');
	const [isAIOutfitOpen, setIsAIOutfitOpen] = useState(false);

	const matchesStyle = (item) => {
		if (activeStyle === 'All') {
			return true;
		}

		const name = item.name.toLowerCase();

		if (activeStyle === 'Casual') {
			return (
				name.includes('shirt') ||
				name.includes('jeans') ||
				name.includes('hoodie') ||
				name.includes('sneaker')
			);
		}

		if (activeStyle === 'Sport') {
			return (
				name.includes('running') ||
				name.includes('shorts') ||
				name.includes('cap') ||
				name.includes('shoe')
			);
		}

		if (activeStyle === 'Work') {
			return (
				name.includes('jacket') ||
				name.includes('watch') ||
				name.includes('shirt') ||
				name.includes('boot')
			);
		}

		return true;
	};

	const filteredItems = clothItems
		?.filter((item) => item.weather === weatherData.type)
		.filter(matchesStyle)
		.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
		);

	return (
		<main className='main'>
			<div className='flex items-start gap-6'>
				<aside className='w-72 shrink-0 space-y-6 pt-2'>
					<AdCarousel />
					<TrendingCard />
					<StyleDropCard />

					<AIOutfitCard onOpen={() => setIsAIOutfitOpen(true)} />

					<DailyDealCard />
					<WhyShopCard />
				</aside>

				<div className='min-w-0 flex-1'>
					<WeatherCard weatherData={weatherData} />

					<section className='cards'>
						<p className='cards__text'>
							Today is &nbsp;
							{currentTemperatureUnit === 'F' ? (
								<>{`${weatherData.temp.F}`} &deg; F</>
							) : (
								<>{`${weatherData.temp.C}`} &deg; C</>
							)}
							&nbsp; / You may want to wear:
						</p>

						<div className='mb-6 flex w-full items-center gap-4'>
							<StyleFilter
								activeStyle={activeStyle}
								onStyleChange={setActiveStyle}
							/>

							<div className='min-w-0 flex-1'>
								<ClothesSearch
									searchTerm={searchTerm}
									onSearchChange={setSearchTerm}
								/>
							</div>
						</div>

						<ul className='cards__list main__cards-list'>
							{filteredItems?.map((item) => (
								<ItemCard
									key={item._id}
									item={item}
									onCardClick={handleCardClick}
								/>
							))}
						</ul>

						{filteredItems?.length === 0 && (
							<p className='mt-8 text-center text-lg font-semibold text-gray-500'>
								No matching clothes found.
							</p>
						)}
					</section>
				</div>
			</div>

			{children}

			<AIOutfitModal
				isOpen={isAIOutfitOpen}
				onClose={() => setIsAIOutfitOpen(false)}
				weatherData={weatherData}
				clothItems={clothItems}
			/>
		</main>
	);
}

export default Main;
