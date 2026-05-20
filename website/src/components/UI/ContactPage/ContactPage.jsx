import ContactBanner from "./ContactBanner/ContactBanner";
import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import ContactUs from "../HomePage/ContactUs/ContactUs";

const ContactPage = () => {
  return (
    <>
      <ContactBanner />
      <ContactUs />
      <DigitalFuture status={true} />
    </>
  );
};

export default ContactPage;
