import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation"; // ✅ import correto

const SubscriptionPage = async() => {
      const { userId } =  auth();
    
      if (!userId) {
        redirect('/login'); 
      }
    return <Navbar />;
};

export default SubscriptionPage;