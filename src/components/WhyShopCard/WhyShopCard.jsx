function WhyShopCard() {
	const benefits = [
		{ icon: '🚚', title: 'Free Shipping', text: 'On orders $50+' },
		{ icon: '🔒', title: 'Secure Payment', text: 'Protected checkout' },
		{ icon: '↩️', title: 'Easy Returns', text: '30-day return' },
		{ icon: '🎧', title: '24/7 Support', text: "We're here" },
	];

	return (
		<div className='rounded-2xl bg-white p-5 shadow-lg'>
			<h3 className='text-center text-xl font-bold text-gray-900'>
				Why shop with us?
			</h3>

			<div className='mt-5 grid grid-cols-2 gap-4'>
				{benefits.map((benefit) => (
					<div
						key={benefit.title}
						className='rounded-xl bg-gray-50 p-3 text-center'
					>
						<div className='text-2xl'>{benefit.icon}</div>

						<p className='mt-2 text-sm font-bold text-gray-900'>
							{benefit.title}
						</p>

						<p className='mt-1 text-xs text-gray-500'>
							{benefit.text}
						</p>
					</div>
				))}
			</div>

			<p className='mt-5 text-center text-sm italic text-gray-500'>
				Style made easy. Every day. 😊
			</p>
		</div>
	);
}

export default WhyShopCard;
