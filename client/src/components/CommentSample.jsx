import { RateReview } from '../components/RatingReview';

const CommentSample = ({ utterance, score, image, mobile }) => {

  const maskPhoneNumber = (fullNumber) => {
    // Extract the first three and last four digits
    const firstPart = fullNumber.slice(0, 3);
    const lastPart = fullNumber.slice(-4);
    const maskedNumber = `${firstPart}****${lastPart}`;

    return maskedNumber;
  };

  return (
    <div className="p-[0_5.333333vw_5.333333vw] rounded-[2.666667vw] bg-white m-[0_4vw_2.666667vw]">
      <div className="p-[2.666667vw_0] border-b border-[#e9ecef] flex items-center justify-between">
        <div>
          <RateReview rating={score} />
          <p className="p1 text-[#999] text-[3.2vw] mt-[1.333333vw]">
            19-09-2024 15:08:07
          </p>
        </div>
        <div className="flex items-center">
          <div>
            <p className="text-[#333] text-[3.733333vw] font-bold text-right" />
            <p className="text-[#999] text-[3.2vw] text-right mt-[.666667vw]">
              {maskPhoneNumber(mobile)} {/* Now dynamic */}
            </p>
          </div>
          {image && (
            <div className="size-[7.733333vw] ml-[.8vw] rounded-full">
              <img src={image} alt="User profile" className="w-full h-full object-cover rounded-full" />
            </div>
          )}
        </div>
      </div>
      <div className="text-[#262626] text-[3.2vw] p-[2.666667vw_0]">
        {utterance}
      </div>
      <div className="flex items-center flex-wrap">
        {image && (
          <div className="mr-[2vw] mb-[1.333333vw]" style={{ width: `calc(33.33% - 2vw)` }}>
            <img
              src={image}
              alt="Image related to the comment"
              className="w-full h-auto object-cover rounded-[1.333333vw]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSample;
