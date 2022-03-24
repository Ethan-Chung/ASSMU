export const clubTypes = [
	{ _id: '1', name: 'Computer Science' },
	{ _id: '2', name: 'Health' },
	{ _id: '3', name: 'Civil Engineering' },
	{ _id: '4', name: 'Natural Sciences' },
	{ _id: '5', name: 'Athletics' },
	{ _id: '6', name: 'Cultural' },
	{ _id: '7', name: 'Mental Health' },
];

export function getClubTypes() {
	return clubTypes.filter((g) => g);
}
