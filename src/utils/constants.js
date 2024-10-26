export const weatherOperations = [
	{
		day: true,
		condition: 'clear',
		url: new URL('../assets/day/clear.png', import.meta.url).href,
	},
	{
		day: true,
		condition: 'clouds',
		url: new URL('../assets/day/clouds.png', import.meta.url).href,
	},
	{
		day: true,
		condition: 'fog',
		url: new URL('../assets/day/fog.png', import.meta.url).href,
	},
	{
		day: true,
		condition: 'rain',
		url: new URL('../assets/day/rain.png', import.meta.url).href,
	},
	{
		day: true,
		condition: 'snow',
		url: new URL('../assets/day/snow.png', import.meta.url).href,
	},
	{
		day: false,
		condition: 'clear',
		url: new URL('../assets/night/clear.png', import.meta.url).href,
	},
	{
		day: false,
		condition: 'clouds',
		url: new URL('../assets/night/clouds.png', import.meta.url).href,
	},
	{
		day: false,
		condition: 'fog',
		url: new URL('../assets/night/fog.png', import.meta.url).href,
	},
	{
		day: false,
		condition: 'rain',
		url: new URL('../assets/night/rain.png', import.meta.url).href,
	},
	{
		day: false,
		condition: 'snow',
		url: new URL('../assets/night/snow.png', import.meta.url).href,
	},
];

export const defaultWeatherOptions = {
	day: {
		url: new URL('../assets/day/default.png', import.meta.url).href,
	},

	night: {
		url: new URL('../assets/night/default.png', import.meta.url).href,
	},
};

export const defaultClothingItems = [
	{
		_id: 0,
		name: 'Cap',
		weather: 'hot',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591',
	},
	{
		_id: 1,
		name: 'Hoodie',
		weather: 'warm',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8',
	},
	{
		_id: 2,
		name: 'Jacket',
		weather: 'cold',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad',
	},
	{
		_id: 3,
		name: 'Sneakers',
		weather: 'cold',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f',
	},
	{
		_id: 4,
		name: 'T-Shirt',
		weather: 'hot',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09',
	},
	{
		_id: 5,
		name: 'Coat',
		weather: 'cold',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4',
	},
];

export const coordinates = {
	latitude: 42.773022,
	longitude: -73.697861,
};

export const APIkey = 'e2f4df9f704d5ba121f0146027e02177';

// Updated BASE_URL
export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'http://api.lovese.jumpingcrab.com'
		: 'http://localhost:3001';
