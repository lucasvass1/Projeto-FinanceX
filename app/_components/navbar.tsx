'use client';

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-solid">
      {/* Esquerda: logo */}
      <div className="flex items-center">
        <Image
          src="/Frame 823.svg"
          width={173}
          height={39}
          alt="FinanceX Logo"
        />
      </div>

      {/* Centro: links */}
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className={
            pathname === "/" ? "text-primary font-bold" : "text-muted-foreground"
          }
        >
          Início
        </Link>

        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }
        >
          Movimentações
        </Link>

        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "text-primary font-bold"
              : "text-muted-foreground"
          }
        >
          Planos
        </Link>
      </div>

      {/* Direita: UserButton */}
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
