import { AlertCircle } from "lucide-react";

export default function ErrorCard({ message }) {
  return (
    <div className="card flex items-center flex-col">
      <AlertCircle className="w-12 h-12 mx-auto" />
      <h3 className="text-lg xl:text-xl font-semibold">{message}</h3>
    </div>
  );
}
