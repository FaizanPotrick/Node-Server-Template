const { Schema, connection } = require("mongoose");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, saltRounds } = require("../config");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email_address: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    confirmEmailToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async (next) => {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  } catch (err) {
    next(new ApiError(err.message, 500, "Server Error"));
  }
});

// Match user password to hashed password in database
UserSchema.methods.matchPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, email_address: this.email_address },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};

module.exports = connection.useDb("DB_NAME").model("User", UserSchema);
