const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Removes leading/trailing whitespaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      trim: true,
      lowercase: true, // Converts email to lowercase
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for basic email validation
    },
    mobile: {
      type: String,
      required: true,
      unique: true, // Ensures mobile number is unique
      match: /^\d{10}$/, // Validates a 10-digit mobile number
    },
    id: {
      type: String,
      unique: true,
    },
    inviteCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for security
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Function to generate a random 8-character alphanumeric ID
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Pre-save hook to ensure the `id` field is populated with a unique value
userSchema.pre('save', async function (next) {
  if (!this.id) {
    this.id = generateUniqueId();
  }
  next();
});

// Pre-save hook to hash password (if uncommented)
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const bcrypt = require('bcrypt');
//     this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds
//   }
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
