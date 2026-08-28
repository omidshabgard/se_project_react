const styles = ['All', 'Casual', 'Sport', 'Work'];

function StyleFilter({ activeStyle, onStyleChange }) {
	return (
		<div className='flex shrink-0 flex-wrap gap-3'>
			{styles.map((style) => {
				const isActive = activeStyle === style;

				return (
					<button
						key={style}
						type='button'
						onClick={() => onStyleChange(style)}
						className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
							isActive
								? 'scale-105 border-orange-400 bg-orange-300 text-black shadow-md'
								: 'border-slate-300 bg-white text-slate-700 hover:scale-105 hover:border-blue-400 hover:bg-blue-100'
						}`}
					>
						{style}
					</button>
				);
			})}
		</div>
	);
}

export default StyleFilter;
