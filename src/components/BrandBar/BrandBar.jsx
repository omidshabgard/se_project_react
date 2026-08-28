import nikeLogo from '../../assets/brands/nike.svg';
import adidasLogo from '../../assets/brands/adidas.svg';
import pumaLogo from '../../assets/brands/puma.svg';
import newBalanceLogo from '../../assets/brands/new-balance.svg';
import underArmourLogo from '../../assets/brands/under-armour.svg';

const brands = [
	{
		name: 'Nike',
		url: 'https://www.nike.com',
		logo: nikeLogo,
	},
	{
		name: 'Adidas',
		url: 'https://www.adidas.com',
		logo: adidasLogo,
	},
	{
		name: 'Puma',
		url: 'https://us.puma.com',
		logo: pumaLogo,
	},
	{
		name: 'New Balance',
		url: 'https://www.newbalance.com',
		logo: newBalanceLogo,
	},
	{
		name: 'Under Armour',
		url: 'https://www.underarmour.com',
		logo: underArmourLogo,
	},
];

function BrandBar() {
	return (
		<section
			className='mx-auto mb-5 w-full max-w-6xl rounded-3xl border px-8 py-3 shadow-sm'
			style={{
				backgroundColor: '#fff7d6',
				borderColor: '#f4d35e',
			}}
		>
			<div className='flex items-center justify-center gap-6'>
				{brands.map((brand) => (
					<a
						key={brand.name}
						href={brand.url}
						target='_blank'
						rel='noopener noreferrer'
						className='group flex h-20 w-28 flex-col items-center justify-center rounded-xl border px-2 py-2 shadow-md transition-all duration-300 ease-in-out hover:scale-125 hover:shadow-xl'
						style={{
							backgroundColor: '#dbeafe',
							borderColor: '#94a3b8',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = '#fdba74';
							e.currentTarget.style.borderColor = '#f97316';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = '#dbeafe';
							e.currentTarget.style.borderColor = '#94a3b8';
						}}
					>
						<div className='flex h-9 w-full items-center justify-center'>
							<img
								src={brand.logo}
								alt={`${brand.name} logo`}
								className='max-h-8 w-20 object-contain transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>

						<span className='mt-1 text-xs font-semibold text-slate-800 transition-colors duration-300 group-hover:text-black'>
							{brand.name}
						</span>
					</a>
				))}
			</div>
		</section>
	);
}

export default BrandBar;
