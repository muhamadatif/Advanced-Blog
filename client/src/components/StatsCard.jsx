import { HiArrowNarrowUp } from "react-icons/hi";

/*eslint-disable */
const StatsCard = ({
  totalItems,
  lastMonthItems,
  header,
  icon: Icon,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="flex animate-pulse flex-col gap-4 rounded-md p-3 shadow-md dark:bg-slate-800 md:w-72">
        <div className="flex justify-between">
          <div>
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="mt-2 h-6 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex gap-2 text-sm">
          <div className="h-4 w-12 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 rounded-md p-3 shadow-md dark:bg-slate-800 md:w-72">
      <div className="flex justify-between">
        <div className="">
          <h3 className="text-md uppercase text-gray-500">Total {header}</h3>
          <p className="text-2xl">{totalItems}</p>
        </div>
        <Icon className="rounded-full bg-teal-600 p-3 text-5xl text-white shadow-lg" />
      </div>
      {lastMonthItems && (
        <div className="flex gap-2 text-sm">
          <span className="flex items-center text-green-500">
            <HiArrowNarrowUp />
            {lastMonthItems}
          </span>
          <div className="text-gray-500">Last month</div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
