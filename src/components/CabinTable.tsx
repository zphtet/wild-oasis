import { CabinType } from "../types/types";
import TableRow from "./TableRow";

type TableProps = {
  data: CabinType[];
};

const CabinTable = ({ data }: TableProps) => {
  return (
    <div className="relative  ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Cabins
            </th>
            <th scope="col" className="px-6 py-3">
              Capacity
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return <TableRow key={row.id} rowData={row} />;
          })}
          {/* <TableRow />
          <TableRow /> */}
        </tbody>
      </table>
    </div>
  );
};

export default CabinTable;
