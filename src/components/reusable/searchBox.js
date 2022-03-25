import Input from './input';

const SearchBox = ({ value, onChange }) => {
	return (
		<Input
			type='text'
			name='query'
			className='form-control my-3' // margin y axis (top and bottom) of 3 ml
			placeholder='Search'
			value={value} // based on what we get from our props object
			onChange={(e) => onChange(e.currentTarget.value)} // raise a custom event with the value of the input field
		/>
	);
};

export default SearchBox;
