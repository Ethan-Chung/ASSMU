const ListGroup = ({
	items,
	textProperty,
	valueProperty,
	onItemSelect,
	selectedItem,
}) => {
	return (
		<ul className='list-group'>
			{/* map each item to this list element */}
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item[valueProperty]} // unique attribute for each item
					className={
						item === selectedItem ? 'list-group-item active' : 'list-group-item'
					}>
					{/* text of the item */}
					{item[textProperty]}
					{/* with brackets we are not coupled to our genres and we can reuse this list group with any type of list */}
				</li>
			))}
		</ul>
	);
};

// in this object we add our props and their default value
ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id',
};

export default ListGroup;
