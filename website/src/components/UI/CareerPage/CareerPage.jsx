import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import CareerBanner from "./CareerBanner/CareerBanner";
import CareerGallery from "./CareerGallery/CareerGallery";
import EmployeeBenefits from "./EmployeeBenefits/EmployeeBenefits";
import OpenPositions from "./OpenPositions/OpenPositions";

const CareerPage = () => {
  return (
    <>
      <CareerBanner />
      <CareerGallery />
      <EmployeeBenefits />
      <OpenPositions />
      <DigitalFuture status={true} />
    </>
  );
};

export default CareerPage;
