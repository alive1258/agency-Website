import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import DesignProcess from "./DesignProcess/DesignProcess";
import RelatedProduct from "./DesignProcess/RelatedProduct";
import PortfolioDetailsBanner from "./PortfolioDetailsBanner/PortfolioDetailsBanner";
import PortfolioGrid from "./PortfolioGrid/PortfolioGrid";
import TechStore from "./TechStore/TechStore";
import WorkFlow from "./WorkFlow/WorkFlow";

const PortfolioDetails = () => {
  return (
    <>
      <PortfolioDetailsBanner />
      <TechStore />
      <WorkFlow />
      <DesignProcess />
      <PortfolioGrid />
      <RelatedProduct />
      <DigitalFuture status={true} />
    </>
  );
};

export default PortfolioDetails;
