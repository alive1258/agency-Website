import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import CareerDetailsBanner from "./CareerDetailsBanner/CareerDetailsBanner";
import CareerDetailsHero from "./CareerDetailsHero/CareerDetailsHero";
import JobDescription from "./JobDescription/JobDescription";

const CareerDetails = () => {
  return (
    <>
      <CareerDetailsBanner />
      <CareerDetailsHero />
      <JobDescription />
      <DigitalFuture status={true} />
    </>
  );
};

export default CareerDetails;
