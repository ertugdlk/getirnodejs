# Getir Assignment
This is a RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format. The code written in Node.js using express framework with Mongoose. Unit tests written with Jest library.

## Run Project
Installing packages 

` npm install  `

Starting application

` npm run  `

Testing application

` npm test  `

## Endpoints

### GET /api/records

Gets all records from database without filter.

### POST /api/records

Request Payload
```
Sample request: {
  "startDate": "2016-01-26",
	
  "endDate": "2018-02-02",
	
  "minCount": 2700, 
	
  "maxCount": 3000
 } 
 ``` 
 
Response Payload 

```
{
    "code": 0,
    "msg": "success",
    "records": [
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 2800
        }
     ]
}
```
 
