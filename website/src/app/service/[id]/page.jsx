import ServiceDetails from "@/components/UI/ServicePage/ServiceDetails/ServiceDetails";

const ServiceDetail = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <ServiceDetails id={id} />
    </>
  );
};

export default ServiceDetail;
