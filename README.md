# twitter_clone

# **API Documentation**
### Backend Routes
Prepend all routes below with /api

### /auth/login
POST credentials for authentication

### /auth/signup
POST create new user

### /auth/logout
DELETE user session

### /users/tweets
GET my tweets

Require Authentication: TRUE

Request Body:
N/A

Response Body
Status Code: 200

Require Authentication: TRUE

```
{
    "Tweets" :
    [
        {
            "id": 1,
            "userId": 1,
            "username": "demo",
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
        },
        {
            "id": 2,
            "userId": 1,
            "username": "demo",
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
        }
    ]
}  
```

### /users/comments
GET my Comments

Require Authentication: TRUE

Request Body:
N/A

Response Body

Status Code: 200

Require Authentication: TRUE
```
{
    "Comments" :
    [
        {
            "id": 1,
            "userId": 1,
            "username": "demo",
            "tweetId":1,
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
        },
        {
            "id": 2,
            "userId": 1,
            "username": "demo",
            "tweetId":1,
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
        }
    ]
}
```                                         

### /tweets
GET all tweets

Require Authentication: TRUE

Request Body:
N/A

Response Body

Status Code: 200

```
{
    "Tweets" :
    [
        {
            "id": 1,
            "userId": 1,
            "username": "demo",
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
            "Likes" :
            {
                total: 3
                iLiked: False
            },
            "totalComments" : 7
            
        },
        {
            "id": 2,
            "userId": 2,
            "username": "demo",
            "body": "Sample Body",
            "created_on":  "2022-12-12", 
            "last_update_on": "2022-12-12"
            "Likes" :
            {
                total: 3
                iLiked: False
            },
            "totalComments" : 7
        }
    ]
}
```

### /tweets
POST a new tweet

Require Authentication: TRUE

Request Body
```
{
    "body": "Sample Body"
}
```

Response Body

Status Code: 201

```
{
    "id": 2,
    "userId": 2,
    "username": "demo",
    "body": "Sample Body",
    "created_on":  "2022-12-12", 
    "last_update_on": "2022-12-12"
}
```

 ### /tweets/:tweetId
GET a specific tweet and it's associated comments, and cumulative likes

Require Authentication: TRUE

Response Body

Status Code: 200

```
{
    "Tweets" :
    {
        "id": 1,
        "userId": 1,
        "username": "demo",
        "body": "Sample Body",
        "created_on":  "2022-12-12", 
        "last_update_on": "2022-12-12",
        "Likes" :
            {
                total: 3
                iLiked: False
            },
        "Comments" :
        [
            {
                "id": 1,
                "userId": 1,
                "username": "demo",
                "tweetId":1,
                "body": "Sample Body",
                "created_on":  "2022-12-12", 
                "last_update_on": "2022-12-12",
                
            }
        ]
    }
}  
```    

### /tweets/:tweetId
PUT to update a specific tweet

Require Authentication: TRUE

Request Body

```
{
    "body": "Sample Body"
}
```

Response Body

Status Code: 200

Require Authentication: TRUE

```
{
    "id": 2,
    "userId": 2,
    "username": "demo",
    "body": "Sample Body",
    "created_on":  "2022-12-12", 
    "last_update_on": "2022-12-12"
}
```

### /tweets/:tweetId
DELETE a specific tweet

Require Authentication: TRUE

Request Body:
N/A

Response Body

Status Code: 200

```
{
    "message": "Successfully deleted",
    "Status Code": 200
    
}
```

### /tweets/:tweetId/comment
POST a new comment

Require Authentication: TRUE

Request Body
```
{
    "body": "Sample Body"
}
```

Response Body

Status Code: 201

```
{
    "id": 2,
    "userId": 2,
    "username": "demo",
    "tweetId": 1,
    "body": "Sample Body",
    "created_on":  "2022-12-12", 
    "last_update_on": "2022-12-12"
}
```

### /comments/:commentId
PUT to update a specific comment

Require Authentication: TRUE

Request Body

```
{
    "body": "Sample Body"
}
```

Response Body

Status Code: 200

```
{
    "id": 2,
    "userId": 2,
    "username": "demo",
    "tweetId": 1,
    "body": "Sample Body",
    "created_on":  "2022-12-12", 
    "last_update_on": "2022-12-12"
}
```

### /comments/:commentId

DELETE a specific comment

Require Authentication: TRUE

Request Body
N/A

Response Body

Status Code: 200

```
{
    "message": "Delete Successfully",
    "Status Code": 200
}
```

### /tweets/:tweetId/likes

POST a new like

Require Authentication: TRUE

Request Body
```
{
    "body": "like"
}
```

Response Body

Status Code: 200

```
{
    "id": 2,
    "userId": 2,
    "username": "demo",
    "tweetId": 1,
    "created_on":  "2022-12-12", 
    "last_update_on": "2022-12-12"
}
```

### /likes/:likeId

DELETE a specific like

Require Authentication: TRUE

Request Body
N/A

Response Body
Status Code: 200

```
{
    "message": "Delete Successfully",
    "Status Code": 200
}
```

### /users/:userId/follows

POST a new follow for the current user on a specific user 

Require Authentication: TRUE

Request Body

```
{
    "follow": 'Y'
}
```

Response Body

Status Code: 200

```
{
    "id": 2,
    "userId": 2,
    "answerId": 1,
    "voteDirection": "Down"
}
    
```
### /follows/:followId
DELETE a specific follow

Require Authentication: TRUE

Request Body:
N/A

Response Body

Status Code: 200

```
{
    "message": "Successfully deleted",
    "Status Code": 200
    
}
``` 
