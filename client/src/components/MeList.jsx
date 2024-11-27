import React from 'react'
import { useNavigate } from 'react-router-dom';

const MeList = () => {
  const navigate = useNavigate();
  return (
    <div className="m-[2.666667vw_0_4.533333vw] flex justify-between">
    <div className="bg-white flex items-center flex-col p-[4vw_2.666667vw_1.333333vw] w-[32%] rounded-[1.866667vw]" onClick={()=>navigate('/deposit')}>
      <div className="w-[5.866667vw]">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABHNCSVQICAgIfAhkiAAAAcpJREFUWIXtmM2RgyAYhl93U8gWkXvIPS3ksJWIlewhLXiXnDdFbCfuATDwyY8KqJnJM8NMAgSewAeIgJ9apX7F1KnEAl5O0TUlQ6l+JdmotEu2xszpSYCp1Hk8LKhsdCpWIOi0N1kNlQYgp8FcpXvDGsxPAD8AvlThN4C/TbTCMP3hgPiiYlgvTBoAguTdics4RgiuVVsq+UJyqPMR/sO7gJlfDpBToDNryGnxwWFPUQ5Oqt0pCCoc445xjJXGWj80JDitsDEM9mAOs083aLNS58nPKeVadGb+UKZHmMZlh21HusZ4x2gAoCKVeKShMyIxfLkdGVDphyYB9KK9PkILmTnkvP2aMdyogsVcbscaqDo8Q4cBFZf5i7EGiS46ATnqfG6rStbzu0XSXLkIM9N3cDSqcjQEgJisZpK0UH1W8JwHsZNORMoHman1ZIwv7zPX0Wx00pN10Fuz1F4fQaEYWYTb6+9ZivVnl5BZntrXIbUBTWzkUkdW8wpPaxZv4dK8hUtTSljoD7l2B00RYbXv8hz77hK2eoB38o7h0swVPhWxmMEUYVHYIfvdkd6ozStQaruh23oSa7xfy/6qt6R0dlkNyyw++/3HP4EwYRyAuQ0WAAAAAElFTkSuQmCC"
        />
      </div>
      <p className="text-[3.733333vw] font-medium m-[2.4vw_0_1.333333vw]">
        Deposit
      </p>
      <p className="text-[#4ca335]">
        {" "}
        ₹0
      </p>
    </div>
    <div className="bg-white flex items-center flex-col p-[4vw_2.666667vw_1.333333vw] w-[32%] rounded-[1.866667vw]" onClick={()=>navigate('/withdraw')}>
      <div className="w-[5.866667vw]">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAABHNCSVQICAgIfAhkiAAAAVlJREFUWIXtmEGShCAMRT9TcyRn3XHPFTyLeBau4F56Pd6JWYgWoC0ijThV/apcEIn8DiSVhgFoARCuowOgYhx0gWe4u0CNaeeCMDN5RiEy/BEQ1kepPrJe9K9KJGq9r+xy1qiYyd8bNnqLjGMQgKdnU/6kUkmyl+F0Z4HO+fSz+G4wwFVNJdVgitoqincSCLgihxJlJoqPwFS2CvXb4LIigLUA0De/9ZlvZI4ga2GaBC5/hjNfyCxQK2twSmRWgX0zdoAWlom4rKI6pqQzOC3GKM6LCS4rIz5MYpIwkeYfJnGLne3LQlIE+2bsuKz8fs7nsRHpkM9Cch3sm1G9emfqoHCtWuz5+FxRBy20OJocMxfWwXhxwDV1sD4rbubTD6bw7wQ+iqjY4Y4RJHvAMB1KYdkU8l0ghRDeeGlyS/9Jf3XDsEDGUFrUShzzQkq45gpuD4XpmhgA8AfFUDOXur6xhwAAAABJRU5ErkJggg=="
        />
      </div>
      <p className="text-[3.733333vw] font-medium m-[2.4vw_0_1.333333vw]">
        Withdraw
      </p>
      <p className="text-[#4ca335]">
        {" "}
        ₹0
      </p>
    </div>
    <div  className="bg-white flex items-center flex-col p-[4vw_2.666667vw_1.333333vw] w-[32%] rounded-[1.866667vw]" onClick={()=>navigate('/about')}>
      <div  className="w-[5.866667vw]">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAmCAYAAAC76qlaAAAABHNCSVQICAgIfAhkiAAAA31JREFUWIXNl0FvE0cUx39joAoKiBQqIYKQEoFSlR6aKHa4EHV96mUtJR/Akk89cSh8gd3wBdoD99Bsz4SDT1zsHKuA4ksvaZEtJKi4gCUOuTEcdieeHY93Z+3g5C+tRvtm5s3Pz29m3gqmKD8qByBCoA/MDVoZNusvt4r4EmOsHwAb2nsf2ALaWZMS6N+IgW3qNOv7K64QRcA9oJXRHxL/gCH5UTkQUjSkYAFASNGTQi4wiLySM3zJZRD50BCDB6bRhAaQ4vPTZn1fgNw0hi/7UeXABcgF3MMOHQId4qjptmN4GzTIqsrnZv1lG2TV8OsEn5cqNugOoP+dAdAAHY7Qj8qMgG6bi/hR2QMxtE5W2mSBu0ArpeCXNudZ/OV6/8LseS1/7dBKReFHpUoRaIg35VOgt7Q5z6317ygCDcXTxhbxotDHWn1wu/XtnUv3Z659c35gzYfW5Rp5E9xjTGjbOd198f7hP9GbP1yhNV9eHryeKmNDxxIhqTNZVseBBre0UeAeE0DHETo+FvvZp4ebRsHX/qpswwD8d2NAgUgD8DODaM/ZoFcf3G6BaK0/vrvt6tQK/xnPj8pBifgoW54AOlfrj+9u37h31QO4sjjbiH+Em0z4+F4QGyXSBdNY0GZl50eVA5UWflQOrizONvT+T2+PPCzlQYb/NshQMy2XSEf7eSHilNKOQez6UUUmm/ZYh8/ecrj7DkbUNq5yLbJylUS9o5mGytf///7QPtx919NMIc7wqQB0SsQ3nu7Ic3M0rOScVfB9UgWYDF89eV1N1usZa2bC13bWutprH+RDkUwKjbFVcj4M8qQffckp42k+rYUZlnq+trPWTWp3pU6zvr+ibs4AML9OJobXpILTTvwqW4MM+FHQAOcSwx4wQ7xRZxJbI7H3xoAUxjwveRaS9s/E91xim9PGAezVorX3UsibNmgdfBx4z2JXkW1oPvXWCf77zZve1R8u/zgKepQC4CMgtcezQEuGywRlV4+56QKtr2XYu/rcn35dlH5UkbWdyn95wEXgRwFMCp9a049WHxWBPi34VMQvXDxXKNKnBX9kjHX60j8r8CcK/bXhu3xFaB3uJOGnAq3DnRT81KB1uJOEnwq0DjcOvJke/06BdUhF4aea03kqAn9moJWy4G19ZwJayQQ0YU81p/Nki+6ZjbQpldMfjda86ifWF7eJGVFMm3Z6AAAAAElFTkSuQmCC"
        />
      </div>
      <p className="text-[3.733333vw] font-medium m-[2.4vw_0_1.333333vw]">
        About
      </p>
      {/**/}
    </div>
  </div>
  
  )
}

export default MeList