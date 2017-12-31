// app/routes.js


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/image-search-engine-dev";
var Scraper = require ('images-scraper'), google = new Scraper.Google();

    module.exports = function(app) {
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        // sample api route
        app.get('/getTags', function(req, response) {
            // use mongodb to get all imagestags in the database
            MongoClient.connect(url,function(err,db){
              db.collection('images_tags').find().toArray(function(err,res){
                if(err){ // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
                     response.send(err);
                }
                  //return all images tags in JSON format
                  response.json(res);
              })
            })
        });


 
    //search image by tags
    app.post('/searchTags',function(req,response){
                   MongoClient.connect(url,function(err,db){
                    db.collection('images_tags').find({'name':req.body.text}).toArray(function(err,res){
                        if(err){
                            response.send(err);
                        }else{
                           response.json(res);
                           db.close();
                    }
                })
           })
     })


     app.post('/insertTags',function(req,response){
           MongoClient.connect(url,function(err,db){
                db.collection('images_tags').find({'name':{'$regex': req.body.text,$options:'i'}}).toArray(function(err,res){
                    if(res.length>0){
                        response.json(res);
                        db.close();
                     }
                     else{
                         google.list({
                               keyword: req.body.text,
                                num: 15,
                                detail: true,
                                nightmare: {
                                   show: false
                                }
                         }).then(function (res) {
                            console.log('first 15 results from google', res.length)
                            var imageData={name:req.body.text,image_info:res}
                                MongoClient.connect(url,function(err,db){
                                db.collection('images_tags').insert(imageData,function(err,res){
                                response.json(res);
                                db.close();
                            })
                     })

             }).catch(function(err) {
                console.log('err', err);
                res.send(err);
            });
          }
       })
    })
 })
 };
