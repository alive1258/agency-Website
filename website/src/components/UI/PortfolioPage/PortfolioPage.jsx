import Portfolio from "../HomePage/Portfolio/Portfolio";
import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import PortfolioBanner from "./PortfolioBanner/PortfolioBanner";

const PortfolioPage = () => {
  return (
    <>
      <PortfolioBanner />
      <Portfolio />
      <DigitalFuture status={true} />
    </>
  );
};

export default PortfolioPage;
