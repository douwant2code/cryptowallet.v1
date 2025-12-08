import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center bg-white text-gray-600">
      {children}
    </div>
  );
};

export default AuthLayout;
