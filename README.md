# Water My Plants

## URL
https://watermyplants-02.herokuapp.com

## Endpoints

[[POST] /api/auth/register](#one)
[[POST] /api/auth/login](#two)
[[GET] /api/auth/users](#three)
[[GET] /api/auth/users/:user_id](#four)

### /api/auth Endpoints
<a name='one'>Register User</a>
```
[POST] /api/auth/register
```
```
// body
{
  "username": "foo",
  "password": "1234",
  "phone_num": "111-111-1111"
}
// response
{
  "user_id": 3,
  "username": "foo",
  "phone_num": "111-111-1111"
}
```

<a name='two'>Login</a>
```
[POST] /api/auth/login
```
```
// body
{
  "username": "foo",
  "password": "1234"
}
// response
{
  "message": "welcome, foo",
  "token": // TOKEN ASSIGNED TO USER HERE
}
```

<a name='three'>Get Users as Admin</a>
```
[GET] /api/auth/users
// restricted to admin
```
```
// response
[
  {
    "user_id": 1,
    "username": "admin",
    "password": "$2a$08$C0cPFWWn5qyvP7oyqFmvr.e9iPwfxvXSDWUSNwWtIpgLUzmzHTy7u",
    "phone_num": "111-111-1111",
    "created_at": "2021-08-24T03:16:02.155Z",
    "updated_at": "2021-08-24T03:16:02.155Z"
  },
  {
    "user_id": 2,
    "username": "matt",
    "password": "1234",
    "phone_num": "222-222-2222",
    "created_at": "2021-08-24T03:16:02.155Z",
    "updated_at": "2021-08-24T03:16:02.155Z"
  },
  {
    "user_id": 3,
    "username": "foo",
    "password": "$2a$08$7BT3i54PZcw3umfOPGBoSev0bD50DNPgErQTi7/QyxCiodaAAv.Rm",
    "phone_num": "111-111-1111",
    "created_at": "2021-08-24T19:41:16.149Z",
    "updated_at": "2021-08-24T19:41:16.149Z"
  }
]
```

<a name='four'>Get User by ID as Admin</a>
```
[GET] /api/auth/users/:user_id
// restricted to admin
```
```
// response
{
  "user_id": 3,
  "username": "foo",
  "password": "$2a$08$7BT3i54PZcw3umfOPGBoSev0bD50DNPgErQTi7/QyxCiodaAAv.Rm",
  "phone_num": "111-111-1111",
  "created_at": "2021-08-24T19:41:16.149Z",
  "updated_at": "2021-08-24T19:41:16.149Z"
}
```

### /api/users Endpoints

### /api/plants Endpoints