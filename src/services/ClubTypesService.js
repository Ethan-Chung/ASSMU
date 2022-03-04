export const clubTypes = [
	{ _id: '1', name: 'Computer Science' },
	{ _id: '2', name: 'Health' },
	{ _id: '3', name: 'Civil Engineering' },
];

export function getClubTypes() {
	return clubTypes.filter((g) => g);
}
