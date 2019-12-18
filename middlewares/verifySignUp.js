const db = require('../config/db.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateName = (req, res, next) => {
    // -> Check Username is already in uses
    User.findOne({
        where: {
            name: req.body.name,
            // user_id: req.body.user_id
        }
    }).then(user => {
        if (user) {
            res.status(400).send("Fail -> Name is already taken!");
            return;
        }

        next();
    });
}

checkRolesExisted = (req, res, next) => {
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
            res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
            return;
        }
    }
    next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateName = checkDuplicateName;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;