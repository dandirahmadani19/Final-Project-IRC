# Movie API Documentation

## Endpoints

List of available endpoints:

- POST /crowdfunding/add
- GET /crowdfunding/status-pending
- GET /crowdfunding/get-final-product-price
- UPDATE /crowdfunding/get-final-product-price
- UPDATE /crowdfunding/status-to-deny
<!-- - POST /movies/add
- GET /movies/:id
- GET /movies/delete/:id
- POST /movies/update/:id
- POST /users/register
- POST /users/login
- POST /users/login-google
- GET /users/detail-profile
- GET /genres
- PATCH /movies/update-status/:id
- GET /histories
- POST /public/customer/register
- POST /public/customer/login
- GET /public/movies
- GET /public/movies/count-movies
- GET /public/movies/movies-pagination
- GET /public/movies/genres
- POST /public/favorites/add-to-favorite
- GET /public/favorites/ -->

## 1. POST /crowdfunding/add

Description:

- User mengajukan crowdfunding

Request

- headers:

```js
    {
        access_token: "string"
    }
```
- body :

```js
    {
        productName: "string"
        targetQuantity: "string"
        initialProductPrice: "integer"
        initialQuantity: "integer"
        expiredDay: "integer"
        manufactureName: "string"
        linkProduct: "string"
        imageProduct: "string"
    }
```

- _Response (200 - OK)_

```js
    {
        statusCode: 200,
        message: "Pengajuan anda telah kami terima dan sedang diverifikasi."
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 2. GET /crowdfunding/status-pending

Description:

- get crowdfunding dengan status pending

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (201 - Created)_

```js
    {
        statusCode: 200,
        data: [
            {
                productName: "string"
                targetQuantity: "string"
                initialProductPrice: "integer"
                initialQuantity: "integer"
                expiredDay: "integer"
                manufactureName: "string"
                linkProduct: "string"
                imageProduct: "string"
                status: "string"
            }
        ]
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 3. UPDATE /crowdfunding/get-final-product-price

Description:

- Melakukan semua perhitungan biaya impor, beacukai, pengiriman serta keuntungan. Lalu mendapatkan
    harga product final. dan lakukan update harga final  product di table crowdfundings, serta mengirimkan pesan
    ke user melalui email dan push notification

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- body:

```js
    {
        finalProductPrice: 'integer',
        currentQuantity: 'integer'
    }
```

- _Response (200 - OK)_

```js
    {
        statusCode: 200,
        data: {
           finalProductPrice: 'integer',
           currentQuantity: 'integer'
           productName: "string"
           targetQuantity: "string"
           manufactureName: "string"
           imageProduct: "string"
           linkProduct: "string"
        }
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 4. - UPDATE /crowdfunding/status-to-deny

Description:

- Update status crowdfunding menjadi 'deny' saat user tidak setuju dengan final harga product serta s&k yang diberikan.
    Dan mengirimkan email serta push notif ke user terkait

Request:

- headers:

```js
    {
        access_token: "string"
    }
```

- body:

```js
    {
        
    }
```

- body:

```js
    {
        status: "string",
    }
```

- _Response (200 - Ok)_

```js
    {
        "statusCode": 200,
        "message": ""
    }
```


- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

<!-- ## 5. GET /movies/delete/:id

Description:

- Delete movie by id

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer (required)"
    }
```

- _Response (200 - OK)_

```js
    {
       "message": "Movie <movie.title> success to delete"
    }
```

- *Response (404 - Not Found)*

```js
    {
        "statusCode": 404,
        "message": "Movie not found"
    }
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
``` -->

## 6. POST /users/register

Description:

- Create a new user.

Request:

- body:

```js
   {
       "email": "string"
       "password": "string"
   }
```

- _Response (201 - Created)_

```js
   {
       "statusCode": 201,
       "message": "Add new user succesfully",
   }
```

- _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Invalid email input"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Password minimum 5 characters"
        },
        OR
        {
            "message": "Email has been registered",
        }
    ]
```

- _Response (500 - Internal Server Error)_

```js
  {
    statusCode: 500,
    message: "Internal Server Error",
  }
```

## 7. POST /users/login

Description:

- Login to homepage.

Request:

- body:

```js
   {
       "email": "string"
       "password": "string"
   }
```

- _Response (200 - Ok)_

```js
   {
       "statusCode": 200,
       "access_token": "generatedToken"
   }
```

- _Response (401 - Unauthorized)_

```js
  {
        statusCode: 401,
        message: "Error user not found or password not matched"
  }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 8. POST /users/login-google

Description:

- Login to homepage with google account.

Request:

- body:

```js
{
  token: string;
}
```

- _Response (200 - Ok)_

```js
   {
       statusCode: 200,
       access_token: "string"
   }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 9. GET /users/detail-profile

Description:

- Find detail data user

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
    {
        "statusCode": 200,
        "data": {
            "id": 1,
            "username": null,
            "email": "admin@gmail.com",
            "role": "admin",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-05-09T15:21:35.732Z",
            "updatedAt": "2022-05-09T15:21:35.732Z"
        }
    }
```

- _Response (404 - Not Found)_

```js
    {
        "statusCode": 404,
        "message": "User not found"
    }
```

- _Response (500 - Internal Server Error)_

```js
    "message": "Internal Server Error"
```

## 10. GET /genres/

Description:

- Get all genre from database

Request

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
{
    {
        statusCode: 200,
        data: [
            {
                "id": 1,
                "name": "Drama",
                "createdAt": "2022-05-09T15:16:46.575Z",
                "updatedAt": "2022-05-09T15:16:46.575Z"
            },
            {
                "id": 2,
                "name": "Comedy",
                "createdAt": "2022-05-09T15:16:46.575Z",
                "updatedAt": "2022-05-09T15:16:46.575Z"
            },
            ...,
        ]
    }
}
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 11. PATCH /movies/update-status/:id

Description:

- Update status movie

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer (required)"
    }
```

- body:

```js
    {
        "status": "string",
    }
```

- _Response (200 - Ok)_

```js
    {
        "statusCode": 200,
        "message": "Update status movie successfully"
    }
```

-_Response (404 - Not Found)_

```js
    {
        statusCode: 404,
        message: "Movie not found"
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 12. GET /histories

Description:

- Get all log histories of action user

Request

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
{
    {
        statusCode: 200,
        data: [
            {
            "id": 1,
            "movieId": 1,
            "title": "Spider-Man: No Way Home",
            "description": "New movie with id 1 is created",
            "updatedBy": 1,
            "createdAt": "2022-05-09T15:22:40.503Z",
            "updatedAt": "2022-05-09T15:22:40.503Z",
            "User": {
                "email": "admin@gmail.com"
            },
            "Movie": {
                "id": 1,
                "title": "Spider-Man: No Way Home",
                "synopsis": "Identitas Spider-Man sekarang sudah terungkap, dan Peter meminta bantuan Doctor Strange. namun sebuah kesalahan terjadi, dan itu justru mengundang musuh berbahaya dari dunia lain, mereka mulai bermunculan. Hal itu memaksa Peter mencari apa makna sebenarnya menjadi Spider-Man.",
                "trailerUrl": "https://youtube.com/embed/ZYzbalQ6Lg8",
                "imgUrl": "https://static.republika.co.id/uploads/images/inpicture_slide/poster-terbaru-film-spider-man-no-way_211116160111-504.jpeg",
                "rating": 7,
                "genreId": 12,
                "authorId": 1,
                "status": "inactive",
                "createdAt": "2022-05-09T15:22:40.482Z",
                "updatedAt": "2022-05-09T15:27:49.452Z"
            }
        },
            ...,
        ]
    }
}
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 13. POST /public/customer/register

Description:

- Add new data customer

Request

- body:

```js
    {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    }
```

- _Response (201 - OK)_

```js
    {
        statusCode: 201,
        message: 'You have successfully registered'
    }
```

- _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Invalid email input"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Password minimum 5 characters"
        },
        OR
        {
            "message": "First Name is required"
        },
        OR
        {
            "message": "Last Name is required"
        },
        OR
        {
            "message": "Email has been registered",
        }
    ]
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 14. POST /public/customer/login

Description:

- Login to customer page.

Request:

- body:

```js
   {
       "email": "string"
       "password": "string"
   }
```

- _Response (200 - Ok)_

```js
   {
       "statusCode": 200,
       "access_token": "string"
   }
```

- _Response (401 - Unauthorized)_

```js
  {
      statusCode: 401,
       message: "Error user not found or password not matched"
  }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 15. GET /public/movies

Description:

- Get all movie with status active from database

- _Response (200 - OK)_

```js
    {
        statusCode: 200,
        data: [
            {
                "id": 2,
                "title": "Avengers: Endgame",
                "synopsis": "Melanjutkan Avengers Infinity War, dimana kejadian setelah Thanos berhasil mendapatkan semua infinity stones dan memusnahkan 50% semua mahluk hidup di alam semesta. Akankah para Avengers berhasil mengalahkan Thanos?",
                "trailerUrl": "https://youtube.com/embed/TcMBFSGVi1c",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
                "rating": 9,
                "genreId": 12,
                "authorId": 1,
                "status": "active",
                "createdAt": "2022-05-17T13:54:20.264Z",
                "updatedAt": "2022-05-17T13:54:38.034Z",
                "Genre": "Sci-fi"
            },
            ...,
        ]
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 16. GET /public/movies/movies-pagination

Description:

- Get movie with status active, limit 9 and offset based on page

Request

- query:

```js
{
  page: integer;
}
```

- _Response (200 - OK)_

```js
    {
        statusCode: 200,
        data: [
            {
                id: 2,
                title: "Avengers: Endgame",
                synopsis: "Melanjutkan Avengers Infinity War, dimana kejadian setelah Thanos berhasil mendapatkan semua infinity stones dan memusnahkan 50% semua mahluk hidup di alam semesta. Akankah para Avengers berhasil mengalahkan Thanos?",
                trailerUrl: "https://youtube.com/embed/TcMBFSGVi1c",
                imgUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
                rating: 9,
                genreId: 12,
                authorId: 1,
                status: "active",
                createdAt: "2022-05-17T13:54:20.264Z",
                updatedAt: "2022-05-17T13:54:38.034Z",
                Genre: {
                    name: "Sci-fi"
                }
            },
            ...,
        ]
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 17. GET /public/movies/genres

Description:

Fetch all data genres

- _Response (200 - OK)_

```js
{
    statusCode: 200,
    genres: [
        {
            "id": 1,
            "name": "Drama"
        },
        {
            "id": 2,
            "name": "Comedy"
        },
        {
            "id": 3,
            "name": "Comedy Romance"
        },
        ...
    ]
}
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 18. GET /public/movies/:id

Description:

- Get data movie by id

Request:

- params :

```js
{
  id: integer;
}
```

_Response (200 - OK)_

```js
{
    statusCode: 200,
    movie: {
        "id": 11,
        "title": "Spiderman: No way Home",
        "synopsis": "Melanjutkan Avengers Infinity War, dimana kejadian setelah Thanos berhasil mendapatkan semua infinity stones dan memusnahkan 50% semua mahluk hidup di alam semesta. Akankah para Avengers berhasil mengalahkan Thanos?",
        "trailerUrl": "https://youtube.com/embed/TcMBFSGVi1c",
        "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        "rating": 3,
        "genreId": 10,
        "authorId": 2,
        "status": "active",
        "createdAt": "2022-05-19T05:54:29.430Z",
        "updatedAt": "2022-05-19T05:54:29.430Z",
        "Genre": {
            "name": "Romance"
        }
    }
}
```

- _Response (404 - Not Found)_

```js
    {
        statusCode: 404,
        message: "Movie not found"
    }
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 19. POST /public/favorites/add-to-favorite

Description:

- Added movie to favorite by id customer

Request:

- body:

```js
{
    MovieId: integer,
    GenreId: integer,
    CustomerId: integer
}
```

_Response (201 - Created)_

```js
{
    statusCode: 201,
    message: "Movie added to favorite !!!`"
}
```

_Response (400 - Bad Request)_

```js
{
    "statusCode": 400,
    "message": "Movie already exist"
}
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 20. GET /public/favorites/

Description:

- Fetch all data favorites

Request:

- headers:

```js
{
  access_token: string;
}
```

_Response (200 - OK)_

```js
{
    "statusCode": 200,
    "favorites": [
        {
            "id": 1,
            "MovieId": 11,
            "GenreId": 10,
            "CustomerId": 1,
            "createdAt": "2022-05-21T05:46:00.584Z",
            "Genre": {
                "name": "Romance"
            },
            "Movie": {
                "title": "Spiderman: No way Home",
                "synopsis": "Melanjutkan Avengers Infinity War, dimana kejadian setelah Thanos berhasil mendapatkan semua infinity stones dan memusnahkan 50% semua mahluk hidup di alam semesta. Akankah para Avengers berhasil mengalahkan Thanos?",
                "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
                "trailerUrl": "https://youtube.com/embed/TcMBFSGVi1c",
                "rating": 3
            }
        }
    ]
}
```

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```

## 5. GET /public/favorites/:id

Description:

- Delete favorite by id

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer (required)"
    }
```

- _Response (200 - OK)_

```js
    {
       "message": "Delete movie from your favorite list successfully !!!"
    }
```

- _Response (404 - Not Found)_

```js
    {
        "statusCode": 404,
        "message": "Favorite not found"
    }
```

- _Response (500 - Internal Server Error)_

```js
    "message": "Internal Server Error"
```

## Global Error

- _Response (500 - Internal Server Error)_

```js
    {
        statusCode: 500,
        message: "Internal Server Error"
    }
```
