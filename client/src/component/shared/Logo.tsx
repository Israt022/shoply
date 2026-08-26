import { ShoppingBag } from "lucide-react";

const Logo = () => {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md transition-all duration-300 group-hover:scale-105">
      <ShoppingBag className="h-6 w-6 stroke-[2.2]" />
    </div>
  );
};

export default Logo;
