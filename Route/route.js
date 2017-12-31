// app/routes.js


var MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
var url = "mongodb://sashi:sashi@ds249575.mlab.com:49575/image-search-engine-dev";
//var url = "mongodb://localhost:27017/image-search-engine-dev";

var Scraper = require ('images-scraper'), google = new Scraper.Yahoo();
var dbName='image-search-engine-dev';
  
  // Use connect method to connect to the server
  MongoClient.connect(url,function(err,client){
     db = client.db(dbName);
     console.log("connection create successfully")
  })

    module.exports = function(app) {
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        // sample api route
        app.get('/getTags', function(req, response) {
            // use mongodb to get all imagestags in the database
              const collection = db.collection('images_tags');
              collection.find().toArray(function(err,res){
                if(err){ // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
                     response.send(err);
                }
                  //return all images tags in JSON format
                  response.json(res);
              })
            })
        


 
    //search image by tags
    app.post('/searchTags',function(req,response){
                      const collection = db.collection('images_tags');
                      collection.find({'name':req.body.text}).toArray(function(err,res){
                        if(err){
                            response.send(err);
                        }else{
                           response.json(res);
                    }
                })
           })


     app.post('/insertTags',function(req,response){
                const collection = db.collection('images_tags');
                collection.find({'name':{'$regex': req.body.text,$options:'i'}}).toArray(function(err,res){
                    if(res.length>0){
                        response.json(res);
                     }
                     else{
                         google.list({
                               keyword: req.body.text,
                                num: 15,
                                detail: true
                                /*nightmare: {
                                   show: false
                                }*/
                         }).then(function (res) {
                            console.log('first 15 results from google', res.length)
                            var imageData={name:req.body.text,image_info:res}
                                collection.insertOne(imageData,function(err,res){
                                response.json(res.ops);
                            })
                     

             }).catch(function(err) {
                console.log('err', err);
                res.send(err);
            });
          }
       })
    })
 };
