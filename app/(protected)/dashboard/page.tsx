import { DashboardView } from "./(components)/dashboard-view";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

const DashboardPage = async () => {
  // const session = await getCurrentUser();

  // if (!session?.id) redirect("/auth/sign-in");
  return <DashboardView />;
};

export default DashboardPage;
