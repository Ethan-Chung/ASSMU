import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize; // calculates the starting index of the items on this page

	// to call the slice and take methods in lodash using a chain we need to convert the items array to a lodash wrapper
	// _(items) returns a lodash object so we can chain methods
	// .value() converts our lodash object into a regular array
	// .slice(startIndex) will slice our array beginning from startIndex

	return _(items).slice(startIndex).take(pageSize).value();
}
