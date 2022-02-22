import React from "react";
import { Google_Api_Key, Client_Id, Calendar_Id } from "../config.js";

function Events() {

  var gapi = window.gapi
  var CLIENT_ID = Client_Id
  var API_KEY = Google_Api_Key
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {  // get api and permissions
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3')

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {  
        
        //  an event we create to pass to our Google Calendar 
        // var event = {
        //   'summary': 'Awesome Event!',
        //   'location': '800 Howard St., San Francisco, CA 94103',
        //   'description': 'Really great refreshments',
        //   'start': {
        //     'dateTime': '2023-06-28T09:00:00-07:00',
        //     'timeZone': 'America/Los_Angeles'
        //   },
        //   'end': {
        //     'dateTime': '2023-06-28T17:00:00-07:00',
        //     'timeZone': 'America/Los_Angeles'
        //   },
        //   'recurrence': [
        //     'RRULE:FREQ=DAILY;COUNT=2'
        //   ],
        //   'attendees': [
        //     {'email': 'lpage@example.com'},
        //     {'email': 'sbrin@example.com'}
        //   ],
        //   'reminders': {
        //     'useDefault': false,
        //     'overrides': [
        //       {'method': 'email', 'minutes': 24 * 60},
        //       {'method': 'popup', 'minutes': 10}
        //     ]
        //   }
        // }

        // used to create and update the Google Calendar with events we created
        // var request = gapi.client.calendar.events.insert({
        //   'calendarId': 'primary',
        //   'resource': event,
        // })

        // request.execute(event => {
        //   console.log(event)
        //   window.open(event.htmlLink)
        // })
        

        // get future events from Google calendar as an array
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events);
        })    
      })
    })
  }


  return (
    <div>
        {/* button initiates Google authentication then gets Calendar if successful */}
        <button 
            style={{width: 100, height: 50}} 
            onClick={handleClick}
            >
            View Events
        </button>
    </div>
  );
}

export default Events;