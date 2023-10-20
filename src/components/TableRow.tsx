import { CabinType } from "../types/types";

type RowType = {
  rowData: CabinType;
};

const TableRow = ({ rowData }: RowType) => {
  const { image, maxCapacity, name, regularPrice, discount } = rowData;
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3 "
      >
        <div className="img-container w-[70px] h-[50px] overflow-hidden">
          <img
            src={image}
            alt={image || "cabin image"}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>

        <p>{name}</p>
      </th>
      <td className="px-6 py-4">Fill up to {maxCapacity} guests</td>
      <td className="px-6 py-4">${regularPrice}</td>
      <td className="px-6 py-4">{`${discount ? "$" + discount : "--"}`}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
};

export default TableRow;
