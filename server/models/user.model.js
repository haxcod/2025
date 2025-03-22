const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/,
    },
    id: {
      type: String,
      unique: true,
      default: () => uuidv4().replace(/-/g, "").slice(0, 8).toUpperCase(), // Ensures better uniqueness
    },
    inviteCode: {
      type: String,
      unique: true,
      default: function generateInviteCode() {
        return uuidv4().slice(0, 6).toUpperCase();
      },
    },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field to get users invited by this user
userSchema.virtual("invitedUsers", {
  ref: "User",
  localField: "_id",
  foreignField: "invitedBy",
});

// Pre-save hook to ensure inviteCode is unique (handles rare duplicate cases)
// userSchema.pre("save", async function (next) {
//   if (!this.inviteCode) {
//     let code;
//     let exists;
//     do {
//       code = uuidv4().slice(0, 8);
//       exists = await mongoose.models.User.findOne({ inviteCode: code });
//     } while (exists);
//     this.inviteCode = code;
//   }
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }

//   next();
// });

// Pre-save hook to hash password securely
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
