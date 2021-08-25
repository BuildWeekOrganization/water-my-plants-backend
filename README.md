# Water My Plants

## URL
https://watermyplants-02.herokuapp.com/

## Endpoints

[[POST] /api/auth/register](#one)<br>
[[POST] /api/auth/login](#two)<br>
[[GET] /api/auth/users](#three)<br>
[[GET] /api/auth/users/:user_id](#four)<br>

[[GET] /api/users](#five)<br>
[[GET] /api/users/:user_id](#six)<br>
[[GET] /api/users/:user_id/plants](#seven)<br>
[[PUT] /api/users/:user_id](#eight)<br>
[[PUT] /api/users/:user_id/updatepass](#nine)<br>
[[DELETE] /api/users/:user_id](#ten)<br>

[[GET] /api/plants](#eleven)<br>
[[GET] /api/plants/:plant_id](#twelve)<br>
[[POST] /api/plants](#thirteen)<br>
[[PUT] /api/plants/:plant_id](#fourteen)<br>
[[DELETE] /api/plants/:plant_id](#fifteen)<br>

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
  "phone_num": "123-456-7890"
}
// response
{
  "user_id": 3,
  "username": "foo",
  "phone_num": "123-456-7890"
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
    "created_at": "2021-08-24T23:29:53.541Z",
    "updated_at": "2021-08-24T23:29:53.541Z"
  },
  {
    "user_id": 2,
    "username": "matt",
    "password": "$2a$08$2RQslbhtstf6Sc8/fXDNXer0beNwrxpMS2Wj9786Sr4k0jEmcIBke",
    "phone_num": "222-222-2222",
    "created_at": "2021-08-24T23:32:29.922Z",
    "updated_at": "2021-08-24T23:32:29.922Z"
  },
  {
    "user_id": 3,
    "username": "foo",
    "password": "$2a$08$QEVTc8cbxIERS.TVWkrG3uhm9LAu9FSIdPvurEV.tduUGXpv.uaMO",
    "phone_num": "123-456-7890",
    "created_at": "2021-08-24T23:40:05.626Z",
    "updated_at": "2021-08-24T23:40:05.626Z"
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
  "password": "$2a$08$QEVTc8cbxIERS.TVWkrG3uhm9LAu9FSIdPvurEV.tduUGXpv.uaMO",
  "phone_num": "123-456-7890",
  "created_at": "2021-08-24T23:40:05.626Z",
  "updated_at": "2021-08-24T23:40:05.626Z"
}
```

### /api/users Endpoints
<a name='five'>Get Users</a>
```
[GET] /api/users
// restricted to authenticated user
// responds with a less detailed view than the one admin sees
```
```
// response
[
  {
    "user_id": 1,
    "username": "admin"
  },
  {
    "user_id": 2,
    "username": "matt"
  },
  {
    "user_id": 3,
    "username": "foo"
  }
]
```

<a name='six'>Get User by ID</a>
```
[GET] /api/users/:user_id
// restricted to authenticated user
// responds with a less detailed view than the one admin sees
```
```
// response
{
  "user_id": 3,
  "username": "foo",
  "phone_num": "123-456-7890"
}
```

<a name='seven'>Get Plants by User ID</a>
```
[GET] /api/users/:user_id/plants
// restricted to authenticated user
// responds with an array of plants associated with user_id
```
```
// response
[
  {
    "plant_id": 1,
    "nickname": "White Moth Orchid",
    "species": "Orchidaceae",
    "h2o_frequency": 7,
    "image": null,
    "user_id": 1
  },
  {
    "plant_id": 2,
    "nickname": "Sunflower",
    "species": "Helianthus",
    "h2o_frequency": 7,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg",
    "user_id": 1
  }
]
```

<a name='eight'>Update User by ID</a>
```
[PUT] /api/users/:user_id
// restricted to authenticated user
// this endpoint DOES NOT allow for updating a password
// see /api/users/:user_id/updatepass to update password
```
```
// user before update
{
  "user_id": 3,
  "username": "foo",
  "phone_num": "123-456-7890"
}
// body
{
  "username": "bar", 
  "phone_num": "000-000-0000"
}
// response
{
  "user_id": 3,
  "username": "bar",
  "phone_num": "000-000-0000"
}
```

<a name='nine'>Update Password by User ID</a>
```
[PUT] /api/users/:user_id/updatepass
// restricted to authenticated user
// updates ONLY password, not username or phone_num
```
```
// body
{
  "password": "5678"
}
// response
{
  "message": "password successfully changed"
}
```

<a name='ten'>Delete User by ID</a>
```
[DELETE] /api/users/:user_id
// restricted to authenticated user
// deletes user AND any associated plant entries
```
```
// response
{
  "message": "user with user_id 3 successfully deleted"
}
```

### /api/plants Endpoints
