import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-[30vh] flex items-center justify-center">
      <TailSpin color="#700ca6" />
    </div>
  );
};

export default Loading;
