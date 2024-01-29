# Branded Things API Documentation

## Endpoints :

List of available endpoints:

<!-- Users Endpoints -->

- `POST /login`
- `POST /register`
<!-- Venue Endpoints -->
- `GET /venue`
- `POST /venue`
- `PUT /venue/:id`
- `DELETE /venue/:id`
- `GET /venue/detail/:id`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /register

- Description:
  This endpoint allows an admin user to create new user. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email form should be an E-mail"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Full Name is required"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "This Email is already exist"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 3. GET /venues

Description:

- Get all products with password hidden from database, only users can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
    {
        "id": 1,
        "name": "MANSION SPORTS BOX Pluit",
        "price": 500000,
        "description": "Mansion Sports Box menawarkan beragam fasilitas olahraga lengkap, termasuk lapangan serbaguna untuk futsal dan bola basket.",
        "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMKmAsBsJm-pyyt5tnZNKOaY69yeZd4H3AlSm8k=s1360-w1360-h1020",
        "phoneNumber": 81818866,
        "address": "Jl. Pluit Raya No.123, RT.3/RW.8, Penjaringan, Jakarta, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450Jl. Pluit Raya No.123, RT.3/RW.8, Penjaringan, Jakarta, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450",
        "CategoryId": 1,
        "createdAt": "2023-12-12T14:23:51.704Z",
        "updatedAt": "2023-12-12T14:23:51.704Z"
    },
  ...,
]
```

&nbsp;

## 4. GET /venues/detal/:id

Description:

- Get venues by id, only users can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "MANSION SPORTS BOX Pluit",
  "price": 500000,
  "description": "Mansion Sports Box menawarkan beragam fasilitas olahraga lengkap, termasuk lapangan serbaguna untuk futsal dan bola basket.",
  "imageUrl": "https://fra1.digitaloceanspaces.com/places/uploads/place/image/file/6105804/2020-07-02.jpg",
  "phoneNumber": 81818866,
  "address": "Jl. Pluit Raya No.123, RT.3/RW.8, Penjaringan, Jakarta, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450Jl. Pluit Raya No.123, RT.3/RW.8, Penjaringan, Jakarta, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450",
  "CategoryId": 1,
  "createdAt": "2023-12-14T14:07:14.622Z",
  "updatedAt": "2023-12-14T14:07:14.622Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 5. GET /categories

Description:

- Get all categories, only users can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
    {
        "id": 1,
        "name": "Basketball",
        "createdAt": "2023-12-14T14:07:01.520Z",
        "updatedAt": "2023-12-14T14:07:01.520Z"
    },
    {
        "id": 2,
        "name": "Badminton",
        "createdAt": "2023-12-14T14:07:01.520Z",
        "updatedAt": "2023-12-14T14:07:01.520Z"
    },
  ...,
]
```

&nbsp;

## 6. GET /order/history/:id

Description:

- Get all order, only users can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
    {
        "id": 2,
        "bookingDate": "2023-12-12T14:27:02.016Z",
        "statusPayment": "pending",
        "UserId": 1,
        "VenueId": 1,
        "createdAt": "2023-12-12T14:27:02.016Z",
        "updatedAt": "2023-12-12T14:27:02.016Z"
    },
  ...,
]
```

&nbsp;

&nbsp;

## 7. GET /news

Description:

- Get all news, only users can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
{
    "status": "ok",
    "totalResults": 68,
    "articles": [
        {
            "source": {
                "id": "google-news",
                "name": "Google News"
            },
            "author": "detikSport",
            "title": "Hasil BWF World Tour Finals: Fajar/Rian Menangi 'Perang Saudara' - detikSport",
            "description": null,
            "url": "https://news.google.com/rss/articles/CBMiZWh0dHBzOi8vc3BvcnQuZGV0aWsuY29tL3Jha2V0L2QtNzA4NzMzNS9oYXNpbC1id2Ytd29ybGQtdG91ci1maW5hbHMtZmFqYXItcmlhbi1tZW5hbmdpLXBlcmFuZy1zYXVkYXJh0gFpaHR0cHM6Ly9zcG9ydC5kZXRpay5jb20vcmFrZXQvZC03MDg3MzM1L2hhc2lsLWJ3Zi13b3JsZC10b3VyLWZpbmFscy1mYWphci1yaWFuLW1lbmFuZ2ktcGVyYW5nLXNhdWRhcmEvYW1w?oc=5",
            "urlToImage": null,
            "publishedAt": "2023-12-13T05:58:01Z",
            "content": null
        },
  ...,
        ]
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
