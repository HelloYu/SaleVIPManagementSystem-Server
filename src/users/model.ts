import { Document, model, Schema } from "mongoose";
import * as bcrypt from 'bcryptjs';
interface IUser {
    role: string,
    username: string,
    password: string,
    name: string,
    contact: string,
    sex: number,
    remark: string
}

export interface IUserModel extends IUser, Document {

};


let userSchema = new Schema({
    role: Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: String,
    sex: Number,
    remark: String
});

// hash the password when create a new user.
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// remove versionKey when send object to user.

userSchema.set('toJSON', { versionKey: false });
let User = model<IUserModel>('User', userSchema);

export default User;