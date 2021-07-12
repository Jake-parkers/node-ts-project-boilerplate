import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export const salt: number = 12;

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    hash_password?: string;
}

const UserSchema: Schema<IUser> = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
})

// * Hash the password befor it is beeing saved to the database
UserSchema.pre('save', function (next: (err: Error | null) => void) {
    // * Make sure you don't hash the hash
    if (!this.isModified('password')) {
        return next(null);
    }

    bcrypt.hash(this.password, salt, (err: any, encrypted: string) => {
        if (err) return next(err);
        this.password = encrypted;
        next(null);
    });
});

UserSchema.methods.comparePasswords = async function (
    password: string,
) {
    return await bcrypt.compare(password, this.password)
};


const User = mongoose.model("User", UserSchema);

export default User; q