import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      {/* Lado esquerdo da tela de login */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <div className="mb-8 flex items-center">
          <Image
            src="/Logo.svg"
            width={173}
            height={39}
            alt="FinanceX"
            className="mr-4"
          />
        </div>
        <h1 className="mb-3 text-4xl font-bold">Bem-Vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A FinanceX é uma plataforma de gerenciamento financeiro que aproveita
          a inteligência artificial para acompanhar suas transações e fornecer
          insights personalizados, tornando o controle do seu orçamento mais
          simples e eficiente.
        </p>
        <SignInButton>
          <div className="flex items-center">
            <button className="flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-gray-100">
              <LogInIcon />
              <span>Faça login ou crie uma conta</span>
            </button>
          </div>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        {/* Lado direito da tela de login com imagem de fundo decorativa */}
        <Image
          src="/Decorative image.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
