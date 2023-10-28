import { ReactNode } from "react";

const Overlay = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <div
        id="overlay"
        className="absolute w-full h-full z-50 bg-violet-600/30 backdrop-blur-[2px] top-0 left-0"
      ></div>
    </>
  );
};

export default Overlay;
