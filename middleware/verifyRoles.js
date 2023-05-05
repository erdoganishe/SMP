const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.roles);
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);
        console.log('verifyRolesGOOOOOOo')
        next();
    }
}

module.exports = verifyRoles;