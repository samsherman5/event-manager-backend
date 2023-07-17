
# event-manager-backend

This is the express API for the [event-manager-frontend](https://github.com/charleywolf/event-manager-frontend/blob/main/README.md), currently in use at the SummerTech coding camp.



## API Reference

#### Get status

```http
  GET /status
```


#### Get weather

```http
  GET /weather
```

#### Get events (in viewer mode)

```http
  GET /viewer_events
```


#### Login

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of login. |
| `password`      | `string` | **Required**. Password of login. |



### All routes below this require an authentication cookie

#### Create account

```http
  POST /create_account
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of new account. |
| `password`      | `string` | **Required**. Password of new account. |

#### Get events

```http
  GET /events
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `(header) day`      | `string` | **Required**. Day to retrieve events for. "Monday" |

#### Add event

```http
  POST /create_event
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the event. |
| `organizer`      | `array` | **Required**. Organizers, each one is a string. |
| `time`      | `string` | **Required**. Time the event is for. (6:30PM) |
| `day`      | `string` | **Required**. Day the event is for. (Monday) |

#### Remove event

```http
  DELETE /remove_event
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. ID of event to delet.e |

#### Edit event

```http
  PUT /edit_event
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. ID of event to delete. |
| `title`      | `string` | **Required**. Title of the event. |
| `organizer`      | `array` | **Required**. Organizers, each one is a string. |
| `time`      | `string` | **Required**. Time the event is for. (6:30PM) |
| `day`      | `string` | **Required**. Day the event is for. (Monday) |

#### Clear events

```http
  DELETE /clear_events
```

#### Import JSON

```http
  POST /import_events
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `events`      | `JSON object` | **Required**. Object of events to import. |

#### Export JSON

```http
  GET /export_json
```





## Used By

This project is used by the following companies:

- [SummerTech](https://summertech.net/)


## Deployment

To deploy this project run

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`WEATHER_API_KEY`
API Key for weather, sign up [here](https://www.weatherapi.com/signup.aspx).


`DATABASE_URI`
The URI to your [MongoDB](https://www.mongodb.com) Database.

`FRONTEND_ADDRESS`
The address of your frontend, for CORS. Example: `http://localhost:3000`

`BACKEND_DOMAIN`
The domain of your backend, which is needed for cookies. Example: `localhost`



[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
