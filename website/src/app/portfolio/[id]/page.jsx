import PortfolioDetails from "@/components/UI/PortfolioPage/PortfolioDetails/PortfolioDetails";

const PortfolioDetailsPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <PortfolioDetails id={id} />
    </>
  );
};

export default PortfolioDetailsPage;
