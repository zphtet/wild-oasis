import React, { ReactNode } from "react";

const Stat = ({
  text,
  num,
  icon,
}: {
  text: string;
  num: number | string;
  icon: ReactNode;
}) => {
  return (
    <div className="py-5 px-10 bg-white dark:bg-color-grey-0 flex items-center gap-5 stat-width">
      <div className="bg-slate-200 dark:bg-color-grey-50 p-5 rounded-full">
        {icon}
      </div>
      <div>
        <p className="uppercase opacity-80 text-sm">{text}</p>
        <p className="text-2xl">{num}</p>
      </div>
    </div>
  );
};

export default Stat;
