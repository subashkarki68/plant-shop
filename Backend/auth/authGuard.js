const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: "You are not authenticated!"});
    }
    //  BEarer 212122121212
    const token = authHeader.split(" ")[1]; 
    console.log(token);

    if(!token){
        return res.status(401).json({error: "No header token found!"});
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Invalid token!"});
    }

};

module.exports = authGuard;