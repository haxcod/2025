const userService = require('../services/user.service');

// Utility function for input validation
const validateFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }
};

const createUser = async (req, res) => {
  const { name, email, mobile, password, inviteCode, fingerprint } = req.body;

  try {
    validateFields({ name, email, mobile, password });
    const user = await userService.createUser(name, email, mobile, password, inviteCode, fingerprint);
    res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (err) {
    res.status(err.status || 400).json({
      status: err.status || 400,
      message: err.message || 'Failed to register user',
    });
  }
};

const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    validateFields({ mobile, password });

    const user = await userService.loginUser(mobile, password);
    const userData = { _id: user._id };
    const token = userService.createJWT(userData);

    if (!token) {
      return res.status(500).json({
        status: 500,
        message: 'Failed to create JWT',
        data: {},
        error: "Server error"
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: user,
      token,
    });
  } catch (err) {
    res.status(err.status || 401).json({
      status: err.status || 401,
      message: err.message || 'Failed to log in user',
    });
  }
};

const getInviteUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "userId is required in query parameters.",
      });
    }

    const inviteUser = await userService.getInvitedUsers(userId);
    res.status(200).json({
      status: 200,
      data: inviteUser,
    });
  } catch (error) {
    console.error("Error fetching invite users:", error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching invite users.",
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    validateFields({ identifier, password });

    await userService.passwordChange(identifier, password);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const findInvitedByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "inviteBy is required in query parameters.",
      });
    }

    const response = await userService.getInviteByUserById(userId);
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching invitedBy users:", error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching inviteBy users.",
      error: error.message,
    });
  }
};

module.exports = { createUser, loginUser, getInviteUser, updatePassword, findInvitedByUser };
