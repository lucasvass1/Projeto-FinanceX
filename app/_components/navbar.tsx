import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between">
            <div className="flex items-center gap-10">
                <Image 
                    src="/Frame 823.svg"  
                    width={173}
                    height={39}
                    alt="FinanceX Logo"
                />
                <Link href="/">Dashboard</Link>
                <Link href="/transactions">Transactions</Link>
                <Link href="/subscriptions">Assinaturas</Link>
            </div>
        </nav>
    );
};

export default Navbar;
