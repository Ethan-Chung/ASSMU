import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // daygrid plugin
import axios from 'axios';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import { Google_Api_Key, Client_Id } from '../config.js'; // api key, client id, google calendar id
import React, { useState, useEffect } from 'react';

const url = 'http://localhost:3002';

const Calendar = () => {
	const [events, setEvents] = useState('');
	const [info, setInfo] = useState('');

	useEffect(() => {
		// when the component is mounted into the DOM
		axios
			.get(url, {
				'Content-Type': 'application/json',
			})
			.then((response) => {
				setInfo(response.data);
				console.log(response.data);
				setEvents(formatEvents(response.data));
			});
	}, []);

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
			<h1 className='tabHeader'>Calendar</h1>
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
