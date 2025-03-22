const userModal = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async (name, email, mobile, password, inviteCode) => {
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
    const user = await userModal.findOne({mobile});
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

const passwordChange = async (mobile, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const changeData = userModal.findOneAndUpdate({ mobile: mobile }, { $set: { password: hashedPassword } }, { new: true, runValidators: true });
    return changeData;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

const getInvitedUsers = async (userId) => {
  try {
    const invitedUsers = await userModal.find({ invitedBy: userId }).select("id mobile createdAt");
     return invitedUsers;
  } catch (error) {
    console.error('Error invite user:', error);
    throw error;
  }
};


module.exports = { createUser, loginUser, getInvitedUsers, passwordChange };
