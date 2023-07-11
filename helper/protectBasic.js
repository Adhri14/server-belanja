import 'dotenv';
import BasicAuth from '../models/basicAuth.js';
import ErrorResponse from './errorResponse.js';
import bcrypt from 'bcryptjs';

const protectBasic = (req, res, next) => {
    const authorization = req.headers.authorization;
    let username, password;

    if (authorization.startsWith('Basic')) {
        const decode = Buffer.from(authorization.split(' ')[1], 'base64').toString();

        username = decode.split(':')[0];
        password = decode.split(':')[1];

        BasicAuth.findOne({ username }).then(result => {
            const checkPassword = bcrypt.compareSync(password, result.password);

            if (checkPassword) {
                return next();
            }

            return next(res.status(401).json({ message: 'Unauthorized in this authentication!', status: 401 }));
        }).catch(err => {
            return next(res.status(500).json({ message: 'Internal server error!' || err, status: 500 }));
        });

        return;
    }

    return next(res.status(401).json({ message: 'Unauthorized in this authentication!', status: 401 }));

}

export default protectBasic;