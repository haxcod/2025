import BottomBar from '../components/BottomBar';
import editIcon from '../assets/edit_icon.png';
import emptyIcon from '../assets/no_data.png';
import CommentSample from '../components/CommentSample';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage UI feedback
  const [error, setError] = useState(null); // Error state for API request errors

  // Function to fetch comments from the API
  const getComments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/comment');
      if (!response.data && !response.data.data) {
        return <img src={emptyIcon} alt="No comments" className="w-[30vw] h-auto" />
      }
      setComments(response.data.data);
    } catch (err) {
      console.error("Error fetching comments:", err.message || err);
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false); // Hide loading spinner after fetching data
    }
  };

  useEffect(() => {
    getComments();
  }, []);


  return (
    <>
      <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
        <header className="h-[16vw] w-full text-[5.333333vw]">
          <div className="flex justify-between items-center h-[16vw]">
            <div className="w-1/3"></div>
            <div className="w-1/3 flex justify-center items-center">Comment</div>
            <div className="w-1/3 flex justify-end items-center pr-[3.8vw]">
              <img src={editIcon} sizes="6.4vw" className="size-[6.4vw]" onClick={() => navigate('/postcomment')} />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="m-[20vh_0] flex items-center justify-center">
            <p className="text-gray-500">Loading comments...</p> {/* Display loading state */}
          </div>
        ) : error ? (
          <div className="m-[20vh_0] flex items-center justify-center">
            <p className="text-red-500">{error}</p> {/* Display error message */}
          </div>
        ) : comments.length === 0 ? (
          <div className="m-[20vh_0] flex items-center justify-center">
            <img src={emptyIcon} alt="No comments" className="w-[30vw] h-auto" />
          </div>
        ) : (
          <div>
            {comments.map((item, index) => (
              <CommentSample key={index} image={item.image} score={item.score} utterance={item.utterance} />
            ))}
          </div>
        )}
      </div>
      <BottomBar />
    </>
  );
};

export default Comments;
