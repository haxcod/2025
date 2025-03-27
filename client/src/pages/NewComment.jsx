import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RatingReview } from "../components/RatingReview";
import UserData from "../hooks/UserData";
import { postData } from "../services/apiService";

const NewComment = () => {
  const navigate = useNavigate();
  const { userData } = UserData();
  const [rating, setRating] = useState(0);
  const [utterance, setUtterance] = useState("");
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Track popup state

  const handleSubmitComments = async () => {
    try {
      if (!utterance.trim()) throw new Error("Comment cannot be empty.");

      const data = {
        mobile: userData?.mobile || "",
        utterance,
        score:rating,
      };

      await postData("/api/v1/comment", data);
      setShowSuccess(true); // ✅ Show success popup
      setUtterance(""); // Clear input
      setRating(0);

      setTimeout(() => {
        setShowSuccess(false);
        navigate(-1);
      }, 2000); // ✅ Auto-close popup after 2s
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button className="p-[0_4vw] h-[9.6vw] text-[28px]">
              <IoChevronBackSharp onClick={() => navigate(-1)} />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">Comment</div>
        </div>
      </header>

      <div className="rounded-[2.666667vw] bg-white p-[6.133333vw_4.4vw_3.733333vw] m-[0_4vw_2.666667vw]">
        <p className="text-[#161827] text-[4.266667vw] mb-[3.333333vw]">
          Utterance
        </p>
        <div className="h-[52vw] p-[1.333333vw_2.933333vw] bg-[#f6f6f8] rounded-[2.666667vw] w-full flex text-[3.733333vw]">
          <textarea
            aria-label="Enter your comment"
            className="flex-grow block box-border w-full text-[#323233] text-left bg-transparent resize-none outline-none"
            placeholder="Please enter utterance..."
            value={utterance}
            onChange={(e) => setUtterance(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-[2.66667vw] bg-white p-[6.13333vw_4.4vw_3.73333vw] m-[0px_4vw_2.66667vw]">
        <p className="text-[#161827] text-[4.26667vw] mb-[1.33333vw]">Score</p>
        <div className="flex items-center">
          <div className="h-[10.6667vw] flex items-center p-[0px_4.66667vw] rounded-[5.33333vw] bg-[#f0f0f0]">
            <RatingReview rating={rating} setRating={setRating} />
          </div>
          <p className="text-black opacity-85 text-[3.73333vw] ml-[2.4vw]">
            {rating} POINTS
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        className="m-[3.73333vw_4vw_0] p-[0_.26667vw] rounded-[2.13333vw] h-[12.8vw] text-[4.266667vw] bg-[#4CA335] text-white"
        style={{ width: `calc(100% - 8vw)` }}
        onClick={handleSubmitComments}
      >
        Confirm
      </button>

      {/* ✅ Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-green-600 text-lg font-bold">🎉 Comment Submitted!</p>
            <p className="text-gray-700">Your feedback has been recorded.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewComment;
