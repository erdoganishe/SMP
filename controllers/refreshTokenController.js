const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decode) => {
            if (err || foundUser.username !== decode.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            //create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decode.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } //Change to 5-15 min
            );
            res.json({ accessToken });
        }
    )
}

module.exports = { handleRefreshToken };