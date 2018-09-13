module.exports = {
    // validate a request body given required arguments
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
    }
};