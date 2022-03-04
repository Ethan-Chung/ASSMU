import React, { useState, useEffect } from 'react';
import { Google_Api_Key, Client_Id } from '../config.js';
import { getClubTypes } from '../services/ClubTypesService';
import ListGroup from './reusable/ListGroup.js';

const Events = () => {
	// we should initialize some of these properties to non null values because it will take some time until we
	// get the data from the server. during this time we need to make sure they are not undefined
	// otherwise we will get a runtime error
	const [selectedClubType, setSelectedClubType] = useState(null);
	const [clubTypes, setClubTypes] = useState([]);
	const [events, setEvents] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	let pluralOrSingular = '';
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly'; // permissions

	useEffect(() => {
		// clone existing array and add new clubType item to it
		const clubTypes = [{ _id: '', name: 'All Clubs' }, ...getClubTypes()];

		// setting state of clubTypes available
		setClubTypes(clubTypes);

		// when the component is mounted into the DOM
		const script = document.createElement('script');
		script.async = true;
		script.defer = true;
		script.src = 'https://apis.google.com/js/api.js';

		document.body.appendChild(script);

		script.addEventListener('load', () => {
			if (window.gapi) handleClientLoad();
		});
	}, []);

	const handleClientLoad = () => {
		window.gapi.load('client:auth2', initClient);
	};

	const handleClubTypeSelect = (clubType) => {
		// set state of the clubType we clicked on
		// controlled components cannot be null or undefined, hence why searchQuery is ''
		setSelectedClubType(clubType);
		setSearchQuery('');
	};

	const openSignInPopup = () => {
		window.gapi.auth2.authorize(
			{ client_id: Client_Id, scope: SCOPES },
			(res) => {
				if (res) {
					if (res.access_token)
						localStorage.setItem('access_token', res.access_token);

					// Load calendar events after authentication
					window.gapi.client.load('calendar', 'v3', listUpcomingEvents);
				}
			}
		);
	};

	const initClient = () => {
		if (!localStorage.getItem('access_token')) {
			openSignInPopup();
		} else {
			// Get events if access token is found without sign in popup
			fetch(
				`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${Google_Api_Key}&orderBy=startTime&singleEvents=true`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
				.then((res) => {
					// Check if unauthorized status code is return open sign in popup
					if (res.status !== 401) {
						return res.json();
					} else {
						localStorage.removeItem('access_token');

						openSignInPopup();
					}
				})
				.then((data) => {
					if (data?.items) {
						setEvents(formatEvents(data.items));
						console.log(data.items);
					}
				});
		}
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
			attachments: item.attachments, // image for our event
			description: item.description,
		}));
	};

	// format our url so we are able to see the image
	const formatUrl = (url) => {
		return url.replace('open', 'uc');
	};

	return (
		<div className='row'>
			{/* club types on left side */}
			<div className='col-3'>
				<ListGroup
					items={clubTypes}
					onItemSelect={handleClubTypeSelect} // when our item is selected
					selectedItem={selectedClubType}
				/>
			</div>

			{/* events on right side */}
			<div className='col'>
				{/* proper grammar for having a plural or singular amount of events */}
				{events.length === 1
					? (pluralOrSingular = '')
					: (pluralOrSingular = 's')}
				<p>{`Showing ${events.length} event${pluralOrSingular} from our calendar.`}</p>

				{/* map their contents out */}
				{Object.values(events).map((item, index) => {
					return (
						<div key={index}>
							<div>{item.title}</div>
							<div>{item.start.toLocaleDateString('en-us', options)}</div>
							<img
								src={formatUrl(item.attachments[index].fileUrl)}
								style={{ width: '60%' }}></img>
							<div>{item.description}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Events;
