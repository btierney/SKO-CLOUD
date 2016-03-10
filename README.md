# FeedHenry Hello World MBaaS Server

This is a blank 'hello world' FeedHenry MBaaS. Use it as a starting point for building your APIs. 

# Group SKO Project API

# bettercallsaul [/bettercallsaul]

'Better Call Saul' endpoint.

## bettercallsaul [POST] 

'Better Call Saul' endpoint.

+ Request (application/json)
    + Body
            {
              "email"   : "foo@blah.com",
              "region"  : "Other",
              "answers" : "1,2,3,4,5,6,7,8,9,1",
              "score"   : 10
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Thanks for playing!"
            }
# getquestions [/getquestions]

'Get Questions' endpoint.

## getquestions [POST] 

'Get Questions' endpoint.

+ Request (application/json)
    + Body
            {
               "query" : ""
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": ""
            }

# verifyemail [/verifyemail]

'Verify Email' endpoint.

## verifyemail [POST]

'Verify Email' endpoint

+ Request (application/json)
    + Body
            {
                "email" : "foo@blah.com"
            }

+ Response 200 (application/json)
    + Body
           {
                "count: ""
           }

# getallscores [/getallscores]

'Get all scores'

## getallscores [POST]

+ Request (application/json)
    + Body
            {
                "region" : "all"
            }

+ Response 200 (application/json)
    + Body
           {
                "results" : "data"
           }
# regions [/regions]

'Get all regions'

## regions [POST]

+ Request (application/json)
    + Body
            {
                "region" : ""
            }

+ Response 200 (application/json)
    + Body
           {
                "results" : "data"
           }           