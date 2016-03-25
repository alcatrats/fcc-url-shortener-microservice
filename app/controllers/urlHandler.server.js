'use strict';

function urlHandler(db) {
    
    var urls = db.collection('urls');
    
    this.getShortUrl = function(req, res) {

        var orgUrl = req.url.substring(5);
        var idSeq = 0;

        // if orginal URL exists already in db return that seq otherwise add a new entry
        var urlMatch = urls.findOne({"url": orgUrl});
        var lastSeq = urls.findOne({}, {sort:{$natural:-1}});
        
        if(typeof urlMatch._id == "number") {
            idSeq = urlMatch._id;
        } else if(typeof lastSeq._id == "number") {
            idSeq = lastSeq + 1;
        }
        
        var shrtUrl = "https://url-shortener-microservice-alcatrats.c9users.io/" + idSeq;
        
        urls.insert(
            {
                _id: idSeq,
                url: orgUrl
            }
        );

        res.json({"original_url": orgUrl, "short_url": shrtUrl, "match": urlMatch, "last": lastSeq._id});
        
/*        
        urls.findOne({}, {sort:{$natural:-1}}, function(err, urlFnd) {
            if(err) {throw err;}

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

        });
*/

    };
    
    this.badUrl = function(req, res) {
        res.json("Bad Url");
    };
    
    this.getRedirectUrl = function(req, res) {
        res.json("test");
    };
    
}

module.exports = urlHandler;