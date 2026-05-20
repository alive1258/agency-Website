import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import Faq from "../HomePage/Faq/Faq";
import FaqBanner from "./FaqBanner/FaqBanner";

const FaqPage = () => {
  return (
    <>
      <FaqBanner />
      <Faq />
      <DigitalFuture status={true} />
    </>
  );
};

export default FaqPage;
