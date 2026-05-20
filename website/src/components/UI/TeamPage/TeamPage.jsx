import AboutBanner from "../AboutUs/AboutBanner/AboutBanner";
import MeetOurTeam from "../AboutUs/MeetOurTeam/MeetOurTeam";
import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import Testimonials from "../HomePage/Testimonials/Testimonials";
import SuccessRate from "./SuccessRate/SuccessRate";

const TeamPage = () => {
  return (
    <>
      <AboutBanner />
      <MeetOurTeam status={false} />
      <SuccessRate />
      <Testimonials />
      <DigitalFuture status={false} />
    </>
  );
};

export default TeamPage;
