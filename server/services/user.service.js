const userModal = require('../models/user.model');
const rechargeModal = require('../models/transaction.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (name, email, mobile, password, inviteCode, fingerprint) => {
  try {
    // Input validation
    if (!name || !email || !mobile || !password) {
      throw new Error('All fields are required: name, email, mobile, and password');
    }

    // Check if the user already exists by email or mobile
    const existingUser = await userModal.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      throw new Error('Email or mobile already in use.');
    }
    const existingFingerprint = await userModal.findOne({ fingerprint });
    if (existingFingerprint) {
      throw new Error("This device is already registered with another account.");
    }

    let inviter = null;
    if (inviteCode) {
      inviter = await userModal.findOne({ inviteCode });
      if (!inviter) {
        throw new Error('Invalid invite code');
      }
    }

    // Save the user to the database
    const user = await userModal.create({
      name,
      email,
      mobile,
      password,
      fingerprint,
      invitedBy: inviter ? inviter._id : null,
    });
    return user;

  } catch (err) {
    console.error('Error in createUser:', err);
    throw new Error(err.message || 'Failed to create user');
  }
};

const loginUser = async (mobile, password) => {
  try {
    // Input validation
    if (!mobile || !password) {
      throw new Error('Both mobile and password are required');
    }

    // Find the user by mobile number
    const user = await userModal.findOne({ mobile });
    if (!user) {
      throw new Error('User not found');
    }
    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw new Error(err.message || 'Login failed');
  }
};

const createJWT = (user) => {
  try {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
  } catch (err) {
    console.log(err);

    throw err
  }
}

const verifyJWT = (token) => {
  try {
    const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return response
  } catch (err) {
    throw err
  }
}

const passwordChange = async (identifier, password) => {
  try {
    const user = await userModal.findOne({ $or: [{ mobile: identifier }, { email: identifier }] });
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModal.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};


const getInvitedUsers = async (userId) => {
  try {
    // Fetch invited users
    const invitedUsers = (await userModal.find({ invitedBy: userId }).select("id mobile createdAt")).reverse();

    if (!invitedUsers.length) {
      return { activeUsers: 0 };
    }

    const mobileNumbers = invitedUsers.map(user => user.mobile);

    // Get total recharge amounts for invited users
    const recharges = await rechargeModal.aggregate([
      { $match: { mobile: { $in: mobileNumbers }, type: "credit" } },
      {
        $group: {
          _id: "$mobile",
          totalRecharge: { $sum: "$amount" },
        }
      }
    ]);

    // Count active users (those who recharged ₹200 or more)
    const activeUsers = recharges.filter(r => r.totalRecharge >= 200).length;

    return { invitedUsers, activeUsers };
  } catch (error) {
    console.error("Error fetching active invited users:", error);
    throw error;
  }
};



const getInviteByUserById = async (id) => {
  try {
    const response = await userModal.findById(id).select('mobile');
    return response;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};





module.exports = { createUser, loginUser, getInvitedUsers, passwordChange, createJWT, verifyJWT, getInviteByUserById };
