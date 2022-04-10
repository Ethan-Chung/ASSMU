import React, { useState, useEffect } from 'react';
import { Google_Api_Key, Client_Id } from '../config.js';
import { getClubTypes } from '../services/ClubTypesService';
import axios from 'axios';
import { paginate } from '../utils/paginate.js';
import ListGroup from './reusable/ListGroup.js';
import Pagination from './reusable/Pagination.js';
import SearchBox from './reusable/searchBox.js';

const Events = () => {
	// we should initialize some of these properties to non null values because it will take some time until we
	// get the data from the server. during this time we need to make sure they are not undefined
	// otherwise we will get a runtime error
	const [selectedClubType, setSelectedClubType] = useState(null);
	const [clubTypes, setClubTypes] = useState([]);
	const [events, setEvents] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [pageSize, setPageSize] = useState(3);
	const [currentPage, setCurrentPage] = useState(1);
	const [info, setInfo] = useState('');
	const url = 'http://localhost:3002';

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	const noSecondsOptions = {
		hour: '2-digit',
		minute: '2-digit',
	};

	useEffect(() => {
		axios
			.get(url, {
				'Content-Type': 'application/json',
			})
			.then((response) => {
				setInfo(response.data);
				console.log(response.data);
			});
		// clone existing array and add new clubType item to it
		const clubTypes = [{ _id: '', name: 'All Clubs' }, ...getClubTypes()];

		// setting state of clubTypes available
		setClubTypes(clubTypes);
	}, []);

	const handleClubTypeSelect = (clubType) => {
		// set state of the clubType we clicked on
		// controlled components cannot be null or undefined, hence why searchQuery is ''
		setSelectedClubType(clubType);
		setSearchQuery('');
		setCurrentPage(1); // reset current page to 1
	};

	const handlePageChange = (page) => {
		setCurrentPage(page); // change the page in our state to the current page
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		setSelectedClubType(null);
		setCurrentPage(1);
	};

	// list events on Google Calendar
	const listUpcomingEvents = () => {
		window.gapi.client.calendar.events
			.list({
				// Fetch events from user's primary calendar
				calendarId: 'primary',
				singleEvents: true,
			})
			.then(function (response) {
				let events = response.result.items;

				if (events.length > 0) {
					setEvents(formatEvents(events));
				}
			});
	};

	// setting our values
	const formatEvents = (list) => {
		return list.map((item) => ({
			title: item.summary,
			start: new Date(item.start.dateTime), // formatting our date
			end: new Date(item.end.dateTime),
			attachments: item.attachments, // image for our event
			description: item.description,
			location: item.location,
		}));
	};

	// format our url so we are able to see the image
	const formatUrl = (url) => {
		return url.replace('open', 'uc');
	};

	const listGroupStyles = {
		marginLeft: '3%',
		marginTop: '3%',
	};

	const eventStyles = {
		marginRight: '3%',
		marginTop: '3%',
		marginLeft: '2%',
		textAlign: 'left',
	};

	const eventCountStyles = {
		marginBottom: '2%',
		fontWeight: '400',
		fontSize: '25px',
	};

	const eventImageStyles = {
		marginBottom: '2%',
		marginTop: '1%',
		width: '90%',
	};

	const eventTitleStyles = {
		fontSize: '25px',
		color: '#BA0C2F',
		fontWeight: '500',
	};

	const eventDateStyles = {
		fontSize: '18px',
	};

	const eventBodyStyles = {
		fontSize: '18px',
		marginBottom: '8%',
	};

	const searchBar = {
		marginBottom: '3%',
	};

	let filteredEvents = Object.values(events);
	if (searchQuery)
		filteredEvents = Object.values(events).filter((m) =>
			m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
		);
	else if (
		// shows specified events when club types are clicked on
		selectedClubType &&
		selectedClubType.name &&
		selectedClubType.name !== 'All Clubs'
	)
		filteredEvents = Object.values(events).filter(
			(m) =>
				m.attachments[1].title.replace('.txt', '') === selectedClubType.name
		);

	const paginateEvents = paginate(filteredEvents, currentPage, pageSize);
	const totalCount = filteredEvents.length;

	return (
		<div>
			<h1 className = "tabHeader">Events</h1>
			<div className='row'>
				{/* club types on left side */}
				<div className='col-3' style={listGroupStyles}>
					<ListGroup
						items={clubTypes}
						onItemSelect={handleClubTypeSelect} // when our item is selected
						selectedItem={selectedClubType}
					/>
				</div>

				{/* events on right side */}
				<div className='col' style={eventStyles}>
					{/* proper grammar for having a plural or singular amount of events */}
					<div style={eventCountStyles}>{`Showing ${totalCount} event${
						totalCount === 1 ? '' : 's'
					} from our calendar.`}</div>

					{/* controlled component (gets all data from props and raises events to change data) it is directly
						controlled by its parent. We encapsulate this input field in a component so we have a simpler interface
						to work with */}
					<div style={searchBar}>
						<SearchBox value={searchQuery} onChange={handleSearch} />
					</div>

					{/* filter and map their contents out */}
					{paginateEvents.map((item, index) => {
						return (
							<div key={index}>
								<div style={eventTitleStyles}>{item.title}</div>
								<div style={eventDateStyles}>
									{`Date: ${item.start.toLocaleTimeString(
										[],
										noSecondsOptions
									)} - ${item.end.toLocaleTimeString(
										[],
										noSecondsOptions
									)}, ${item.start.toLocaleDateString('en-us', options)}`}
								</div>
								<div style={eventDateStyles}>{`Location: ${item.location}`}</div>
								<img
									alt=''
									src={formatUrl(
										// give the correct attachment url to img tag
										item.attachments[0].mimeType.includes('image')
											? item.attachments[0].fileUrl
											: item.attachments[1].fileUrl
									)}
									style={eventImageStyles}></img>
								<div style={eventBodyStyles}>{item.description}</div>
							</div>
						);
					})}

					<Pagination
						itemsCount={totalCount} // total number of events
						pageSize={pageSize} // total number of pages
						onPageChange={handlePageChange} // when the page changes
						currentPage={currentPage} // the current page the user is on
					/>
				</div>
			</div>
		</div>
	);
};

export default Events;
