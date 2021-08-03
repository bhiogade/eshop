module.exports = function(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('Access Denied.');

    next(); 
    // if user is admin we pass control to next middleware function which in this case route handler
}