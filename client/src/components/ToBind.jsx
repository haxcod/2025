import {useNavigate} from 'react-router-dom'

const ToBind = () => {
  const navigate = useNavigate()
  return (
    <div className="p-[13.333333vw_10.666667vw]">
    <div className="text-center text-[4vw] mb-[6.666667vw]">
      Please bind your wCommissionet address first
    </div>
    <button
      className="p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] w-full"
      type="button"
      onClick={()=>navigate('/bankcard')}
    >
      To Bind
    </button>
  </div>
  
  )
}

export default ToBind