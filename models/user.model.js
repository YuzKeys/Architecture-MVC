import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    firstname: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Vérification du format email
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Member"],  // Limite les rôles possibles
        default: "Member"
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { collection: 'users' }, { timestamps: true }); // Ajoute createdAt et updatedAt


// Méthode statique pour vérifier si l'utilisateur est actif
userSchema.statics.isUserActive = async function (email) {
    const user = await this.findOne({ email });
    return user ? user.isActive : false;
};



// Hashage du mot de passe avant enregistrement
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Création du modèle User
const User = mongoose.model("User", userSchema);

export default User;