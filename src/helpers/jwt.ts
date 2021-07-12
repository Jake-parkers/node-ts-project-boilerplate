import jwt from "jsonwebtoken"
export default class Jwt {
    issueToken(payload: any, callback: Function) {
        this._signToken(payload, (err: any, jwt: any) => {
            if (err) return callback(err, null);
            return callback(null, jwt);
        });
    }

    private _signToken(payload: any, callback: Function) {
        jwt.sign(payload, process.env.TOKEN_SECRET as string, { algorithm: 'HS256' }, (err, jwt) => {
            if (err) return callback(err, null);
            return callback(null, jwt);
        });
    }


}

module.exports = Jwt;