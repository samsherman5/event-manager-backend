
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




