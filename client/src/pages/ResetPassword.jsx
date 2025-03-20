import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserData from "../hooks/UserData";
import { updateData } from "../services/apiService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const user = UserData();
  const [isLoading, setisLoading] = useState(false);

  // Change initial state to an object
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value, // Update only the changed field
    }));
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.newPassword.trim() &&
      !passwordData.confirmPassword.trim()
    ) {
      alert("Enter Passwords!");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setisLoading(true)
      const response = await updateData("/api/v1/password", {
        mobile: user.userData.mobile, // Include the mobile number to identify the user
        password: passwordData.newPassword,
      });
      console.log(response);
      
      if (response.success) {
        alert("Password changed successfully!");
      } else {
        alert(response.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Something went wrong. Please try again.");
    }
    finally{
      setisLoading(false)
    }
    // alert(`Password changed successfully: ${passwordData.newPassword}`);
  };

  return (
    <div>
      <header className="h-[16vw] w-full text-[5.333333vw] bg-[#ecf9e0]">
        <div className="flex h-full">
          <div className="w-[20%] flex justify-start items-center">
            <button
              className="p-[0_4vw] h-[9.6vw] text-[28px]"
              onClick={() => navigate(-1)} // Navigate to the previous page
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-[60%] flex justify-center items-center">
            Reset Password
          </div>
        </div>
      </header>

      <div className="mt-[5.333333vw] p-[0_6.666667vw]">
        <div className="pb-[3.466667vw]">
          <label
            className="block pb-[1.066667vw] text-[4vw]"
            style={{ lineHeight: "5.333333vw" }}
          >
            Mobile Number
          </label>
          <div className="p-[1.333333vw_3.733333vw] bg-gray-100 rounded-[2.133333vw] h-[13.066667vw] border border-black border-opacity-15 flex items-center">
            <input
              className="w-full outline-none bg-transparent text-black caret-[#4CA335] text-[4vw]"
              type="text"
              value={user.userData.mobile}
              disabled
              placeholder="Please enter user name..."
              autoComplete="off"
            />
          </div>
        </div>

        <div className="pb-[3.466667vw]">
          <label
            className="block pb-[1.066667vw] text-[4vw]"
            style={{ lineHeight: "5.333333vw" }}
          >
            New password
          </label>
          <div className="p-[1.333333vw_3.733333vw] bg-white rounded-[2.133333vw] h-[13.066667vw] border border-black border-opacity-15 flex items-center">
            <input
              className="w-full outline-none bg-transparent text-black caret-[#4CA335] text-[4vw]"
              type="password"
              name="newPassword" // Added name to track state
              placeholder="Please enter password..."
              autoComplete="off"
              value={passwordData.newPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pb-[3.466667vw]">
          <label
            className="block pb-[1.066667vw] text-[4vw]"
            style={{ lineHeight: "5.333333vw" }}
          >
            Confirm password
          </label>
          <div className="p-[1.333333vw_3.733333vw] bg-white rounded-[2.133333vw] h-[13.066667vw] border border-black border-opacity-15 flex items-center">
            <input
              className="w-full outline-none bg-transparent text-black caret-[#4CA335] text-[4vw]"
              type="password"
              name="confirmPassword" // Added name to track state
              placeholder="Please enter confirm password..."
              autoComplete="off"
              value={passwordData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="mt-[5.333333vw] w-full h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] rounded-[2.133333vw] flex justify-center items-center"
          onClick={handleChangePassword}
        >
          {isLoading ? "Wait..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
