const userService = require('../services/user.service');

// Utility function for input validation
const validateFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      throw new Error(`${key} is required`);
      return
    }
  }
};

const createUser = async (req, res) => {
  const { name, email, mobile, password,inviteCode,fingerprint } = req.body;

  try {
    // Validate required fields
    validateFields({ name, email, mobile, password });
    // Call service to create the user
    const user = await userService.createUser(name, email, mobile, password,inviteCode,fingerprint);
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
    // Validate required fields
    validateFields({ mobile, password });

    // Call service to log in the user
    const user = await userService.loginUser(mobile, password);
    res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: user,
    });
  } catch (err) {
    res.status(err.status || 400).json({
      status: err.status || 400,
      message: err.message || 'Failed to log in user',
    });
  }
};

const getInviteUser = async (req, res) => {
  try {
    // Extract `id` from query parameters
    const { userId } = req.query;  // Extract from query params
     
    // Validate `id`
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "ID is required in query parameters.",
      });
    }

    // Call the service to get users
    const inviteUser = await userService.getInvitedUsers(userId);

    // Respond with the result
    res.status(200).json({
      status: 200,
      data: inviteUser,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching invite users:", error);

    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching invite users.",
      error: error.message,
    });
  }
};

const updatePassword = async (req,res)=>{
  const {mobile,password} = req.body;
  validateFields({ mobile, password });
  try{
   const data = userService.passwordChange(mobile,password);
   res.json({ success: true, message: 'Password updated successfully' });
  }catch(err){
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }

}


module.exports = { createUser, loginUser,getInviteUser,updatePassword };
