import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type DataType = {
  name: string;
  sale: number;
};

const LineChartCompoment = ({ data }: { data: DataType[] }) => {
  return (
    <div className="my-10">
      <ResponsiveContainer minWidth={"100%"} minHeight={"300px"}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit={"$"} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sale" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCompoment;
