import mongoose from "mongoose";

const superUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        default: "superuser",
    }
}, {
    timestamps: true,
})

// Encrypt password before saving
superUserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
superUserSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword.trim(), this.password);
}

export const SuperUser = mongoose.models.SuperUser || mongoose.model("SuperUser", superUserSchema);