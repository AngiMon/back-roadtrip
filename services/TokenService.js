const jwt = require('jsonwebtoken');

const tokenVerify = (token) => {
    let response = {}
    try {
        response.content = jwt.verify(token, process.env.secret);
        response.status = 200;
        return response
    } catch (error) {
        response.status = 409;
        response.content = error.message;
        return response;
    }
}

const TokenService = {
    tokenVerify
}

module.exports = TokenService;