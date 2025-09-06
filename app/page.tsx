import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // Importação correta

const Home = async () => {
  const session = await auth(); // Obtém a sessão de autenticação
  const userId = session?.userId; // Verifica se o usuário está logado

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;
