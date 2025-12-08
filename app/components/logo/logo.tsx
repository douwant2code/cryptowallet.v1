import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold text-cyan-400">
      <Image
        src="/assets/logoipsum-383.png"
        alt="CryptoHub Logo"
        width={32}
        height={32}
        className="inline-block mr-2"
      />
      Crypto<span className="text-white">Walletz</span>
    </Link>
  );
};

export default Logo;
