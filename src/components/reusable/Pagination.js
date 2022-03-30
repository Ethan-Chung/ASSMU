import _ from 'lodash'; // lodash is the optimized version of a popular js library called underscore
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	// get an integer with Math.ceil
	const pagesCount = Math.ceil(itemsCount / pageSize); // see how many movies we should fit per page

	if (pagesCount === 1) return null; // we don't want a single pagination to display if there is only one, so make it null

	// use lodash to generate an array with these numbers
	const pages = _.range(1, pagesCount + 1); // we need +1 bc this method will not include this end number itself (i.e. if pages
	// count is 4 it will return an array with 3 numbers
	// [1... pagesCount].map()

	return (
		<nav>
			<ul className='pagination'>
				{pages.map(
					(
						page // map items in this array to list items
					) => (
						// check what page the user is on and set it to active or not
						<li
							key={page}
							className={
								page === currentPage ? 'page-item active' : 'page-item'
							}>
							<a
								onClick={() => onPageChange(page)} // call this method onClick to change the page
								className='page-link'>
								{page}
							</a>
						</li>
					)
				)}
			</ul>
		</nav>
	);
};

// define the type check requirements for this component
Pagination.propTypes = {
	// object with props of our component with their types and whether or not they are required
	itemsCount: PropTypes.number.isRequired, // itemsCount is required to be an array
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired, // onPageChange is required to be a function
	currentPage: PropTypes.number.isRequired,
};

export default Pagination;
