const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: true,
            select: false,
        },
        profileImage: {
            type: String,
            require: false,
        },
        bio: {
            type: String,
            require: false,
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }],
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

// o método .pre do mongoose permite alterar o objeto antes de salva-lo
userSchema.pre("save", async function(next) {
    // geramos uma senha criptografada 
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;