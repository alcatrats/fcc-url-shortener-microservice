'use strict';

function urlHandler(db) {
    
    var urls = db.collection('urls');
    
    this.getShortUrl = function(req, res) {

        urls.findOne({}, {sort:{$natural:-1}}, function(err, urlFnd) {
            if(err) {throw err;}

            
/*
            urls.insert({"url": "test"}, function(err) {
                if(err) {throw err;}
                
                urls.findOne({},{sort:{$natural:-1}}, function(err, data) {
                    if(err) {throw err;}
                    
                    res.json(data);
                });
                    
            });
*/      
            var orgUrl = req.url.substring(5);
            var idSeq = 0;
            if(typeof urlFnd._id == "number") {
                idSeq = urlFnd._id + 1;
            }
            var shrtUrl = "https://url-shortener-microservice-alcatrats.c9users.io/" + idSeq;
            
            urls.insert(
                {
                    _id: idSeq,
                    url: orgUrl
                }
            );
            
            res.json({"original_url": orgUrl, "short_url": shrtUrl, "urlFnd": urlFnd});
            
        });

    };
    
    this.badUrl = function(req, res) {
        res.json("Bad Url");
    };
    
    this.getRedirectUrl = function(req, res) {
        res.json("test");
    };
    
}

module.exports = urlHandler;