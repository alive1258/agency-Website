import Link from "next/link";

const PortfolioBanner = () => {
  return (
    <div className="about-us-section-bg md:h-[338px] h-[150px]">
      <div className="bg-[#000] opacity-70 w-full h-full">
        <div className="container flex h-full justify-center items-center">
          <div className="z-50 text-white">
            <h1 className="md:text-[48px] text-[#FAFAFA] text-center uppercase font-extrabold">
              Portfolio
            </h1>
            <div className="flex justify-center items-center mt-3">
              <div className="bg-[#27272A] w-fit px-4 py-2 rounded-3xl flex items-center justify-center space-x-2">
                <Link href="/">
                  <span className="text-[#A1A1AA] text-[16px] ">Home</span>
                </Link>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M7.5 12.75L11.25 9L7.5 5.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className="text-[#FAFAFA] text-[16px] ">Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBanner;
