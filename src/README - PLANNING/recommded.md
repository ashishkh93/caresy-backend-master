system recommdentaion using upvote:
    idea/Goal : - Best product is first see to the user by recommended tag.
                - Not all product is recommended by system.
                - Comparsion of price among some famous website using product link.
                - User can only upvote so based on recommendation is created.
                - Product Entry by the employeee

User Item Like Recommendation

Item -> Like
     -> Recommendation

Like -> userId, ItemId, rating:Number(1)

Recommendation -> serId, ItemId, Image: , Text:

    model : Item
        - Item-id : auto generated
        - name : String 
        - description : String
        - price : Number
        - recommendations : [Recommendation]
        - upvote : [Upvote]
        - isUserUpvote : bool
        - URL = [Amazon : , Filpkart: , ...]

    model : Upvote
        - userId,
        - itemId,
        - rating
    index set to {userId, itemId}

    model : recommendations
        - userId
        - itemId
        - text
        - Image
    index set to {userId, itemId}
 
- user direct sent "doUpvote" -> Like -> object create -> upvote array ma push -> isUserUpvote -> True


API:
- Item add/update/delete/list/popular-item/top-recommendations (6)
- user can upvote/downvote in Item (2)
- user can add/edit/delete recommendations (2)


https://stackoverflow.com/questions/12994594/how-should-i-store-likes-dislikes-and-rating-in-mongoose-mongdb-using-node-js


-----------------------------------------------------------------------------------------------------------------

/item/addItem

name : bat
description : Virat Kohli Bat's.
Images : [image1,image2]
purchaseSites : ['amazon','paytm'] amazon filpkart firstcry others -> price
{
    "Images": [
        "image1"
    ],
    "votesCount": 0,
    "recommendationsCount": 0,
    "recommendations": [],
    "upvote": [],
    "purchaseSites": [
        "amazon"
    ],
    "_id": "603ccf4690b2b43c048e1683",
    "name": "bat",
    "description": "Virat Kohli Bat's",
    "createdAt": "2021-03-01T11:25:58.925Z",
    "updatedAt": "2021-03-01T11:25:58.925Z",
    "__v": 0
}

{
    "Images": [
        "image33",
        "image4"
    ],
    "votesCount": 0,
    "recommendationsCount": 0,
    "recommendations": [],
    "upvote": [],
    "purchaseSites": [
        "amazon",
        "paytm"
    ],
    "_id": "603cdbbd2d44a239e0b55091",
    "name": "ball",
    "description": "mitchal start ball it is.",
    "createdAt": "2021-03-01T12:19:09.771Z",
    "updatedAt": "2021-03-01T12:19:09.771Z",
    "__v": 0
}


/item/:itemId/updateItem
name : bat
description : It is kohli's bat.
Images : [image1,image2]
purchaseSites : ['amazon','paytm','mesho']

name : bat
description : It is kohli's bat.
Images : [image1,image2, image3]
purchaseSites : ['amazon','paytm','mesho']

/item/:itemId/deleteItem

/item/603ccfec90b2b43c048e1684/deleteItem

/item/list [working]

/item/top-item [working]

/item/recommended-item

/item/:itemId/upvote [working]
/item/603cdbbd2d44a239e0b55091/upvote

upvoted {
  rating: 1,
  _id: 603cd5c795792c3f84195ce4,
  itemId: 603ccfec90b2b43c048e1684,
  userId: 602382ffb2078a2278314270,
  createdAt: 2021-03-01T11:53:43.735Z,
  updatedAt: 2021-03-01T11:53:43.735Z,
  __v: 0
}

/item/:itemId/downvote [working]
/item/603cdbbd2d44a239e0b55091/downvote



/item/603cdbbd2d44a239e0b55091/add-recommendation
description = "very good product you can purchase"
Images[0] = image11
Images[1] = image22
Images[2] = image22
[
    {
        "description": "very good product you can purchase",
        "Images": [
            "image11",
            "image22"
        ],
        "_id": "603ce14318499112acf735d1",
        "userId": "602382ffb2078a2278314270",
        "itemId": "603cdbbd2d44a239e0b55091",
        "createdAt": "2021-03-01T12:42:43.606Z",
        "updatedAt": "2021-03-01T12:42:43.606Z",
        "__v": 0
    }
]

description = "good looking"
Images[0] = image111
Images[1] = image222



603ce14318499112acf735d1
/item//:itemId/:recommendationId/editRecommendation
/item/603cdbbd2d44a239e0b55091/603ce14318499112acf735d1/editRecommendation

---------------------------------------------------------------------------------------


/item/:itemId/add-purchase-site
/item/:itemId/:siteId/update
/item/:itemId/:siteId/delete
/item/:itemId/all-sites