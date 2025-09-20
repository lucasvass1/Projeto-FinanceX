import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "../(home)/_components/sumary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps { 
  searchParams: { month?: string };
}

const Home = async ({searchParams: {month}}: HomeProps) => {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect('?month=01');
  }


  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Início</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
