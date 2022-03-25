import React from 'react';

function EventsMapped(events, dateFormat) {
	return (
		<div>
			{/* this map out contents of our events*/}
			{eObject.values(events).map((item, index) => {
				return (
					<div key={index}>
						<div>{item.title}</div>
						<div>{item.start.toLocaleDateString('en-us', dateFormat)}</div>
						<img src={item.attachments[index].fileUrl}>
							{item.attachments[index]}
						</img>
						<div>{item.description}</div>
					</div>
				);
			})}
		</div>
	);
}

export default EventsMapped;
