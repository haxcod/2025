import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import aboutImg from '../assets/about.png';

import respectIcon from '../assets/respect_icon.png';
import innoIcon from '../assets/innovation_icon.png';
import labourIcon from '../assets/labour_icon.png';

const valuesData = [
  {
    icon: respectIcon,
    title: "Respect",
    color: "#4CA335",
    values: [
      "To uphold the integrity of this organization.",
      "To be accountable for my actions.",
      "To promote diversity & create an equitable & inclusive work culture.",
    ],
  },
  {
    icon: innoIcon,
    title: "Innovation & Creativity",
    color: "#4CA335",
    values: [
      "To work collaboratively without hierarchy.",
      "To have a passion for problem solving.",
      "To challenge the status-quo & focus on continuously improving myself.",
    ],
  },
  {
    icon: labourIcon,
    title: "Empathy & Service",
    color: "#4CA335",
    values: [
      "To put the organization first.",
      "To be sensitive to others' emotions & feelings.",
      "To be compassionate, kind & humble.",
    ],
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button
              className="p-[0_3.2vw] h-[9.6vw] text-[28px]"
              onClick={() => navigate(-1)}
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">About</div>
        </div>
      </header>

      {/* About Image Section */}
      <div className="box-border">
        <div className="h-[61.866667vw] w-full absolute top-[16vw]">
          <img src={aboutImg} alt="About" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-[24.4vw] text-black text-opacity-65 text-[3.2vw] rounded-[2.666667vw] bg-white p-[41.2vw_2.666667vw_5.066667vw_7.6vw]">
        {[
          `DeHaat™ is one of the fastest-growing start-ups in the Agri-Tech sector & one of the very few companies providing end-to-end solutions & services to the farming community in India. We are building AI-enabled technologies to revolutionize supply chain & production efficiency in the farming sector.`,
          `Currently, we are operating in 12 Indian agrarian states with an extensive network of 11,000+ DeHaat Centers & 503 FPOs, serving 1.8 million+ farmers. We also provide AI-enabled crop advisory to farmers for 30+ crops in regional languages.`,
          `Founded by the alumni from IIT Delhi, IIT Kharagpur, IIM Ahmedabad & other top institutes - DeHaat is a fully funded start-up with an exceptional growth rate & is certified Great Place to Work 2 years in a row, 2022-2023 & 2023-2024. The impact we have created at grass root level over the last 12 years of our operations has been phenomenal & is recognized & felicitated by NASSCOM, Forbes, ET, Niti Aayog, Bill Gates Foundation & many more.`,
        ].map((paragraph, index) => (
          <p key={index} className="mb-[2vw]" style={{ lineHeight: '4.533333vw' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Our Values Section */}
      <div className="mt-[4.8vw]">
        <div className="text-[4.266667vw] text-black text-opacity-65 relative pl-[4vw] m-[0_4vw] font-semibold">
          Our Values
        </div>
        <div className="text-[3.466667vw] text-black text-opacity-65 p-[0_8vw] mt-[2.666667vw]" style={{ lineHeight: '4.8vw' }}>
          Strengthening Our Roots | Nurturing Our Drive | Harvesting Our True Purpose
        </div>
        <div className="p-[0_8vw_3.466667vw]">
          {valuesData.map((item, index) => (
            <div key={index} className="rounded-[2.666667vw] bg-white p-[2.8vw_2.933333vw] mt-[2.666667vw]">
              <div className="flex">
                <div className="w-[5.970667vw] mr-[1.2vw]">
                  <img src={item.icon} alt={`${item.title} icon`} />
                </div>
                <p className="text-[3.733333vw] font-bold flex justify-center items-center" style={{ color: item.color }}>
                  {item.title}
                </p>
              </div>
              <div className="mt-[1.466667vw] pl-[5.066667vw] text-black text-opacity-65">
                {item.values.map((value, idx) => (
                  <p
                    key={idx}
                    className="text-[3.2vw] relative pl-[3.2vw] leading-[4.8vw] before:content-[''] before:w-[1.33vw] before:h-[1.33vw] before:rounded-full before:bg-black before:bg-opacity-65 before:absolute before:left-0 before:top-[2vw]"
                  >
                    {value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
