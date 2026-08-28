import { useEffect, useState } from 'react';

function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleBackToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (!isVisible) {
		return null;
	}

	return (
		<button
			type='button'
			onClick={handleBackToTop}
			aria-label='Back to top'
			className='fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-2xl font-bold text-black shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-300'
		>
			↑
		</button>
	);
}

export default BackToTop;
