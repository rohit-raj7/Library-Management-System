import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoadingUi() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {[1, 2, 3, 4,5,6].map((item) => (
        <div
          key={item}
          className="p-4 rounded-2xl shadow-md bg-white w-full"
        >
          <Skeleton height={25} width="70%" />
          <div className="mt-2">
            <Skeleton height={18} width="50%" />
          </div>
          <div className="mt-2">
            <Skeleton height={14} width="60%" />
          </div>
          <div className="mt-3">
            <Skeleton height={18} width={80} />
          </div>
          <div className="flex space-x-3 mt-4">
            <Skeleton height={36} width={80} />
            <Skeleton height={36} width={80} />
          </div>
        </div>
      ))}
    </div>
  );
}
