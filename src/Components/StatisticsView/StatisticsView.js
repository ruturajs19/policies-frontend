import React, { useEffect, useState } from "react";
import Dropdown from "../Shared/Dropdown/Dropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { useHttpClient } from "../../hooks/useHttpHook";
import "./StatisticsView.css";

export default function StatisticsView(props) {
  const { setModalText } = props;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { sendRequest } = useHttpClient();
  const [chartData, setChartData] = useState([]);
  const [region, setRegion] = useState("North");

  /**
   * Function to fetch the count of policies for each month
   */
  const getPolicyCounts = async () => {
    try {
      setModalText("Loading...")
      const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/stats`);
      url.searchParams.append("region", region);
      const responseData = await sendRequest(url);
      setChartData(
        months.map((month, index) => {
          return {
            name: month,
            policies: responseData[index] ?? 0,
          };
        })
      );
      setModalText("")
    } catch (error) {
      setModalText(error.message)
    }
  };
  useEffect(() => {
    getPolicyCounts();
  }, [region]);

  return (
    <div className="statistics-container">
      <div className="statistics-region-selector">
        <span><b>Showing Policies Statistics for:</b>&nbsp;</span>
        <Dropdown
          defaultValue={"North"}
          options={["North", "West", "South", "East"]}
          onChangeHandler={(event) => {
            setRegion(event.target.value);
          }}
        />
      </div>
      <div className="chart-container">
        <BarChart width={1000} height={500} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="policies" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
