const userModal = require('../models/user.model');
const rechargeModal = require('../models/transaction.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
    return jwt.sign({user}, process.env.JWT_SECRET_KEY, {
      expiresIn: '2 days'
    })
  } catch (err) {
    console.log(err);
    
    throw err
  }
}

const verifyJWT =(token)=>{
 try{
   const response = jwt.verify(token,process.env.JWT_SECRET_KEY);
   return response
 }catch(err){
  throw err
 }
}

const passwordChange = async (identifier, password) => {
  try {
    ;
    const hashedPassword = await bcrypt.hash(password, 10);
    const changeData = await userModal.findOneAndUpdate(
      { $or: [{ mobile: identifier }, { email: identifier }] },
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );
    return changeData;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

const getInvitedUsers = async (userId) => {
  try {
    // Fetch invited users
    const invitedUsers = await userModal.find({ invitedBy: userId }).select("id mobile createdAt");

    let activeUsers = 0;
    let totalCommission = 0;
    let todayCommission = 0;
    const today = new Date().setHours(0, 0, 0, 0);

    // Iterate through each invited user
    for (const user of invitedUsers) {

      // Get user's total recharge amount
      const recharges = await rechargeModal.find({ mobile: user.mobile, type: 'credit' }).select("amount createdAt");

      // Calculate total recharge amount
      const totalRecharge = recharges.reduce((sum, rec) => sum + rec.amount, 0);

      // Check if user is active (recharged ₹200 or more)
      if (totalRecharge >= 200) {
        activeUsers++;

        // Calculate total commission (10% of all recharges)
        totalCommission += totalRecharge * 0.1;

        // Calculate today's commission
        for (const recharge of recharges) {
          const rechargeDate = new Date(recharge.createdAt).setHours(0, 0, 0, 0);
          if (rechargeDate === today) {
            todayCommission += recharge.amount * 0.1;
          }
        }
      }
    }

    return {
      activeUsers,          // Total active users
      invitedUsers,         // List of invited users
      todayCommission,      // Commission earned today
      totalCommission,      // Total commission earned
    };
  } catch (error) {
    console.error("Error fetching invited users:", error);
    throw error;
  }
};


const getUserById = async (id)=>{
  try{
    const response = userModal.findById(id);
    return response;
  }catch(err){
    throw err;
  }
}




module.exports = { createUser, loginUser, getInvitedUsers, passwordChange, createJWT,verifyJWT,getUserById };
