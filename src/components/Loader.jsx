export default function Loader({ size }) {
  return (
    <div className="col-span-full flex items-center">
      <div className={size === "sm" ? "loader-sm" : "loader"} />
    </div>
  );
}
