const userModal = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async (name, email, mobile, password,inviteCode) => {
  try {
    // Input validation
    if (!name || !email || !mobile || !password) {
      throw new Error('All fields are required: name, email, mobile, and password');
    }

    // Check if the user already exists by email or mobile
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserByMobile = await getUserByMobile(mobile);

    if (existingUserByEmail) {
      throw new Error('A user with this email already exists');
    }

    if (existingUserByMobile) {
      throw new Error('A user with this mobile number already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const data = await userModal.create({ name, email, mobile, password: hashedPassword ,inviteCode});
    return data;
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
    const user = await getUserByMobile(mobile);
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

const getUserByEmail = async (email) => {
  try {
    return await userModal.findOne({ email });
  } catch (err) {
    console.error('Error in getUserByEmail:', err);
    throw new Error('Error fetching user by email');
  }
};

const getUserByMobile = async (mobile) => {
  try {
    return await userModal.findOne({ mobile });
  } catch (err) {
    console.error('Error in getUserByMobile:', err);
    throw new Error('Error fetching user by mobile number');
  }
};


const getInviteUser = async (id) => {
  try {
    const inviteUsers = await userModal.find({ id });
    return inviteUsers; 
  } catch (error) {
    console.error("Error fetching invite users:", error);
    throw error; 
  }
};


module.exports = { createUser, loginUser, getUserByEmail, getUserByMobile,getInviteUser };
