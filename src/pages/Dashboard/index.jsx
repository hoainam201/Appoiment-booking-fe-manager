import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import STAFF from "../../services/staffService";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import {Button} from "@mui/material";
import MyPieChart from "../../components/MyPieChart";

const MyChart = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState(null);
  const [open, setOpen] = useState(false);
  const dateRangePickerRef = useRef(null);

  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const CustomLabel = ({ viewBox, labelText, value }) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="15"
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchData = async () => {
    try {
      const res = await STAFF.getReports(state[0].startDate, state[0].endDate);
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      } else {
        // toast.error("Không thể tải profile");
      }
    } catch (e) {
      // toast.error("Không thể tải profile");
    }
  }

  const fetchFacility = async () => {
    try {
      const res = await STAFF.getFacilityReports();
      if (res.status === 200) {
        setData2(res.data);
        console.log(res.data);
      } else {
        // toast.error("Không thể tải profile");
      }
    } catch (e) {
      // toast.error("Không thể tải profile");
    }
  }

  const fetchTotal = async () => {
    try {
      const res = await STAFF.getTotalReport();
      if (res.status === 200) {
        setData3(res.data);
        console.log(res.data);
      } else {
        // toast.error("Không thể tải profile");
      }
    } catch (e) {
      // toast.error("Không thể tải profile");
    }
  }

  useEffect(() => {
    fetchData();
    fetchFacility();
    fetchTotal();
  }, []);

  const handleSubmit = () => {
    setOpen(false);
    fetchData();
  }

  const handleClickOutside = (event) => {
    if (dateRangePickerRef.current && !dateRangePickerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const data1 = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 300 },
    { name: 'D', value: 200 },
  ];

  return (
    <div className="max-h-[75vh] overflow-y-auto">
      <div>
        <div className="flex gap-2 my-2 relative">
          <span className="font-bold text-lg text-gray-600">Chọn thời gian:</span>
          <input
            ref={dateRangePickerRef}
            readOnly
            className=" border border-gray-300 rounded-md p-2 hover:border-blue-400  w-52"
            value={`${format(state[0].startDate, "dd/MM/yyyy")} - ${format(state[0].endDate, "dd/MM/yyyy")}`}
            onClick={() => setOpen(true)}
          />
          {open && (
            <div ref={dateRangePickerRef}
                 className="absolute z-40 bg-white border border-gray-300 rounded-xl left-0 top-12"
            >
              <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
              />
              <Button
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                onClick={handleSubmit}
              >Submit</Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[66%,1fr] gap-4 h-full">
          <div className="border border-gray-300 rounded-xl hover:border-blue-400">
            <div className="font-bold text-lg mx-auto items-center text-center  ">Số lượt khám</div>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                  dataKey="day"
                  tickFormatter={value => `${value}`}
                  domain={[format(state[0].startDate, "dd/MM/yyyy"), format(state[0].endDate, "dd/MM/yyyy")]}
                />
                <YAxis domain={[0, "auto"]}
                       type="number"
                       allowDecimals={false}
                       tickFormatter={value => `${value}`}
                />
                <Tooltip/>
                <Legend/>
                <Bar type="step" dataKey="count" fill="#8884d8"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div>
              {data2 && <div className="border border-gray-300 rounded-xl hover:border-blue-400">
                <div className="font-bold text-lg mx-auto items-center text-center  ">Cơ sở y tế</div>
                <MyPieChart data={data2}/>
              </div>
              }
            </div>
            <div>
              {
                data3 && <div className="border border-gray-300 rounded-xl hover:border-blue-400">
                  <div className="font-bold text-lg mx-auto items-center text-center  ">Tổng quan</div>


                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                      <tbody>
                      <tr className="bg-white border-b hover:bg-gray-100 hover:text-blue-500">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          Số bệnh nhân
                        </th>
                        <td className="px-6 py-4">
                          {data3.users}
                        </td>
                      </tr>
                      <tr className="bg-white border-b  hover:bg-gray-100 hover:text-blue-500">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          Số dịch vụ
                        </th>
                        <td className="px-6 py-4">
                          {data3.services}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-100 hover:text-blue-500">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          Số lượt đặt khám
                        </th>
                        <td className="px-6 py-4">
                          {data3.bookings}
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-100 hover:text-blue-500">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          Số lượt đánh giá
                        </th>
                        <td className="px-6 py-4">
                          {data3.reviews}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyChart;
