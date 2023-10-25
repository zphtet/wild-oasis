import { useSearchParams } from "react-router-dom";
import { SIZE_PER_PAGE } from "../utils/constant";
type Props = {
  total: number;
  start: number | null;
  end: number | null;
};

const Pagination = ({ total, start, end }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentVal = searchParams.get("page") || 1;

  const maxPage = Math.ceil(total / SIZE_PER_PAGE);
  const isLastPage = Number(currentVal) === maxPage;
  const prevHandler = () => {
    if (Number(currentVal) === 1) return;
    const prev = Number(currentVal) - 1;
    setSearchParams((param) => {
      param.set("page", `${prev}`);
      return param;
    });
  };
  const nextHandler = () => {
    const next = Number(currentVal) + 1;
    setSearchParams((param) => {
      param.set("page", `${next}`);
      return param;
    });
  };
  return (
    <div className=" p-5 w-full">
      <div className="flex items-center justify-between">
        <p>
          showing {start} to {end} of {total}
        </p>
        <div className="flex gap-5">
          <button
            className={`pagi-btn ${
              Number(currentVal) === 1 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={Number(currentVal) === 1}
            onClick={prevHandler}
          >
            Prev
          </button>
          <button
            className={`pagi-btn ${
              isLastPage && "cursor-not-allowed opacity-50"
            }`}
            disabled={isLastPage}
            onClick={nextHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
