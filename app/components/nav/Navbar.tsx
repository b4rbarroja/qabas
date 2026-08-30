import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className=" font-thamaniyah flex px-30 pb-4 text-dark justify-between items-center pt-5 h-[66px] flex-row bg-background">
      {/*right side*/}
      <div className="">
        <Image src="/qabaLogo.png" height={70} width={70} alt="qabas" />
      </div>

      {/*left side*/}
      <div className="flex gap-4 text-dark items-center">
        <Link
          href="#"
          className="hover:text-accent transition-colors duration-200"
        >
          الرئيسية
        </Link>
        <Link
          href="#"
          className="hover:text-accent transition-colors duration-200"
        >
          التدوينات
        </Link>
        <Link
          href="#"
          className="hover:text-accent transition-colors duration-200"
        >
          من نحن
        </Link>
        <Link
          href="#"
          className="bg-primary  text-light px-4 py-2 rounded-[5px] hover:brightness-125 transition-all duration-200"
        >
          سجل معنا
        </Link>
      </div>
    </header>
  );
}
