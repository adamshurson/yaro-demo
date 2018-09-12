module.exports = {
    validateBody: function(body, requiredArgs) {
        let noMissingParams = true;
        // check all required args exist in the body
        requiredArgs.map((arg) => {
            if (!body.hasOwnProperty(arg)) {
                noMissingParams = false;
            } else if (body[arg] === null || body[arg] === undefined || body[arg] === "") {
                noMissingParams = false;
            }
        });
        return noMissingParams;
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