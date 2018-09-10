module.exports = {
    validateBody: function(body, requiredArgs) {
        // check all required args exist in the body
        requiredArgs.map((arg) => {
            if (!body.hasOwnProperty(arg)) {
                return false;
            }
        });
        //if all are in body, then return true
        return true;
    },
    userHasToken: function(req, callback) {
        const token = req.body.token;
        if (token) {
            // verifies secret and checks expiration
            jwt.verify(token, app.get('superSecret'), (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        } else {
            callback("token not found");
        }
    }
};