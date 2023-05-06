const User = require('../../model/User');

const handleLogout = async (req, res,next) => {
    // On client delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    //is refreshToken in db
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); // secure: true - only server on https
    res.sendStatus(204);
}

module.exports = { handleLogout };