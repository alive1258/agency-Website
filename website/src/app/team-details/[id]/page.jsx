import TeamDetails from "@/components/UI/TeamPage/TeamDetails/TeamDetails";

const TeamDetail = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <TeamDetails id={id} />
    </>
  );
};

export default TeamDetail;
