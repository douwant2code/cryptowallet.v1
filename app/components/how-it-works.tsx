import { User, PlusCircle, CreditCard, Activity } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <User size={32} />,
      title: "Sign Up",
      desc: "Create your wallet account in seconds.",
    },
    {
      icon: <PlusCircle size={32} />,
      title: "Deposit Crypto",
      desc: "Add funds from any external wallet.",
    },
    {
      icon: <CreditCard size={32} />,
      title: "Manage Assets",
      desc: "Check balances and transaction history.",
    },
    {
      icon: <Activity size={32} />,
      title: "Transfer",
      desc: "Send crypto securely to anyone.",
    },
  ];

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <div className="mb-4 text-cyan-400">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
