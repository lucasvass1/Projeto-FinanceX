import { LogInIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* lado esquerdo da tela de login */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/Logo.svg"
          width={173}
          height={39}
          alt="FinanceX"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-Vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A FinanceX é uma plataforma de gerenciamento financeiro que aproveita
          a inteligência artificial para acompanhar suas transações e fornecer
          insights personalizados, tornando o controle do seu orçamento mais
          simples e eficiente.
        </p>
        <button Variant="outline">
          <LogInIcon className="mr-2" />
          Fazer login ou criar conta
        </button>
      </div>
      <div className="relative h-full w-full">
        {/* lado direito da tela de login */}
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
