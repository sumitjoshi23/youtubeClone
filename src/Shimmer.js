import classNames from "classnames";

function Shimmer({ className }) {
  const outerClassNames = classNames(
    "shadow-lg m-2 p-2 hover:bg-gray-200 rounded-lg",
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    className
  );
  const innerClassNames = classNames(
    "shadow-lg hover:bg-gray-200 rounded-lg",
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const boxes = Array(50)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });

  return <div className="flex flex-wrap">{boxes}</div>;
}

export default Shimmer;
