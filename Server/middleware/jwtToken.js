const jwt = require('jsonwebtoken');
const usermodels = require('../models/usermodels');

const jwtToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await usermodels.findById(decoded.id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = jwtToken;