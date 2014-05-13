# Google Calendar API Sample ( JavaScript )

## Developer Site
https://developers.google.com/api-client-library/javascript/

## Client Repository
https://code.google.com/p/google-api-javascript-client/


## How to call Calendar API

### Create Google App

1. access [Developer Console Site](https://cloud.google.com/console/project).
2. click `CREATE PROJECT` button.
3. click `APIs & auth > APIs` menu in left column.
4. trun on `Calendar API` button.
5. click `Credential` menu in left column.
6. copy `client ID` in `Client ID for web application` section.

![create app](http://kashiro.github.io/google-calendar-api-sample/images/create-app.png)

### Create HTML

load Javascript client.
`onload` parameter is to set a callback method name which will be called when client is initialized.

	<script src="https://apis.google.com/js/client.js?onload=onLoadGapiClient"></script>
	
	
### Auth

Following method is to auth.
You can check about calendar auth [information](https://developers.google.com/google-apps/calendar/auth) and auth [method](https://developers.google.com/api-client-library/javascript/reference/referencedocs).

	var config = {
		'client_id': clientId,
        'scope'    : 'https://www.googleapis.com/auth/calendar',
        'immediate': false
    };
    gapi.auth.authorize(config, $.proxy(this.handleAuthResult, this));
    
### Get Calendar Information

Following method is to get calendar information.
You can check about client [method](https://developers.google.com/google-apps/calendar/v3/reference/calendarList/list) (`gapi.client.calendar`)

    var config = {
            minAccessRole: 'owner'
        },
        request = gapi.client.calendar.calendarList.list(config);

    request.execute(function(res){
        console.log(res); // calendar informatino :)
    });
    
## My Sample Code

[here!](https://kashiro.github.io/google-calendar-api-sample) :)
