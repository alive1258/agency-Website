import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import PricingPlans from "../HomePage/PricingPlans/PricingPlans";
import PricingBanner from "./PricingBanner/PricingBanner";

const PricingPage = () => {
  return (
    <>
      <PricingBanner />
      <PricingPlans />
      <DigitalFuture status={true} />
    </>
  );
};

export default PricingPage;
