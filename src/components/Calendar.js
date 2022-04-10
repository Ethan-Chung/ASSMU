import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // daygrid plugin
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import { Google_Api_Key, Client_Id } from '../config.js'; // api key, client id, google calendar id
import React, { useState, useEffect } from 'react';

const Calendar = () => {
	const [events, setEvents] = useState(null);
	const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly'; // permissions

	useEffect(() => {
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
				showDeleted: true,
				singleEvents: true,
			})
			.then(function (response) {
				let events = response.result.items;

				if (events.length > 0) {
					setEvents(formatEvents(events));
				}
			});
	};

	const formatEvents = (list) => {
		return list.map((item) => ({
			title: item.summary,
			start: item.start.dateTime || item.start.date,
			end: item.end.dateTime || item.end.date,
		}));
	};

	// when we click on a date
	// const handleDateClick = (arg) => {
	// 	// bind with an arrow function
	// 	//arg.dayEl.style.backgroundColor = 'blue';
	// };

	return (
		<div>
			<h1 className = "tabHeader">Calendar</h1>
			<div style={{ width: '95%', margin: 'auto' }}>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
					initialView='dayGridMonth'
					headerToolbar={{
						left: 'title',
						//center: 'day,week,month',
						right: 'today prev,next',
					}}
					//dateClick={handleDateClick}
					googleCalendarApiKey={Google_Api_Key}
					eventColor={'green'}
					events={events}

					//backgroundColor="#8ad2ec"
				/>
			</div>
		</div>
	);
};

export default Calendar;
