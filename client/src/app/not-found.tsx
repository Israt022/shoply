import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="text-center space-y-6">

        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
            <SearchX 
              size={40} 
              className="text-orange-500"
            />
          </div>
        </div>


        <h1 className="text-7xl font-bold text-orange-500">
          404
        </h1>


        <h2 className="text-3xl font-semibold">
          Page Not Found
        </h2>


        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or
          may have been removed.
        </p>


        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          <ArrowLeft size={18}/>
          Back To Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;