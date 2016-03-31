'use strict';

function urlHandler(db) {
    
    var urls = db.collection('urls');
    
    this.getShortUrl = function(req, res) {

        var orgUrl = req.url.substring(5);
        var idSeq = 0;
        var shrtUrl = "https://url-shortener-microservice-alcatrats.c9users.io/";
        var re = new RegExp('^(https?:\/\/)?');

        if(re.test(orgUrl)) {
            throw "Bad Url";
        }

        urls.findOne({"storeUrl": orgUrl}, {}, function(err, existingUrl) {
            if(err) {throw err;}
            
            if(existingUrl) {
                shrtUrl += existingUrl._id;
                res.json({"original_url": orgUrl, "short_url": shrtUrl});

            } else {
            
                urls.findOne({}, {sort:{$natural:-1}}, function(err, lastUrl) {
                    if(err) {throw err;}
                
                    if(lastUrl) {
                        idSeq = lastUrl._id + 1;
                    }
                
                    shrtUrl += idSeq;
                    
                    urls.insert(
                        {
                            _id: idSeq,
                            storeUrl: orgUrl
                        }
                    );

                    res.json({"original_url": orgUrl, "short_url": shrtUrl});
                
                
                });
            }
            
        });
    };
    
    this.badUrl = function(req, res) {
        res.json("Bad Url");
    };
    
    this.getRedirectUrl = function(req, res) {
        
        var srchId = parseInt(req.params.id, 10);

        if(isNaN(srchId)) {
            res.json("Bad Parameter, not a number" + req.params.id);

        } else {
        
            urls.findOne({"_id": srchId}, {}, function(err, urlFnd) {
                if(err) {throw err;}
            
                 if(urlFnd) {
                      res.redirect(urlFnd.storeUrl);
                 } else {
                     res.json("URL not found");
                }
            });
        
        }
    };
    
}

module.exports = urlHandler;