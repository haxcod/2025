import {formatDate} from '../hooks/MomentDate';

const InviteList = ({ id, mobile, createdAt }) => {
  return (
    <div className="flex justify-between p-[2.933333vw_0] border-b items-center">
      <div className="flex items-center">
        <div className="size-[9.066667vw] rounded-full mr-[2.933333vw]">
          <img src="https://api.api-dehaatll.top/storage/client/default.jpg" alt="User Avatar" />
        </div>
        <div>
          <div className="text-[4vw] font-medium relative mb-[1.333333vw] flex items-center">
            ID: {id}
          </div>
          <p className="text-[#949494] text-[2.933333vw]">{mobile}</p>
        </div>
      </div>
      <div className="text-[#666] text-[3.2vw]">
        {formatDate(createdAt)}  
      </div>
    </div>
  );
};

export default InviteList;
