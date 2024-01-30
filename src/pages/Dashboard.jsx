import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox from "../components/summary-box/SummaryBox";
import { colors, data } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SocialBox from "../components/summary-box/SocialBox";
import { formatNumberCompact } from "../helpers/misc";
import { getUsersCount } from "../remote/user";
import { getArtistCount } from "../remote/artist";
import { getChaptersCount, getComicsCount } from "../remote/comic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    if (!totalUsers)
      getUsersCount().then(({ data: count }) => {
        setTotalUsers(count);
      });
  }, [setTotalUsers, totalUsers]);

  const [totalComics, setTotalComics] = useState(0);
  useEffect(() => {
    if (!totalComics)
      getComicsCount().then(({ data: count }) => {
        setTotalComics(count);
      });
  }, [setTotalComics, totalComics]);

  const [totalCreators, setTotalCreators] = useState(0);
  useEffect(() => {
    if (!totalCreators)
      getArtistCount().then(({ data: count }) => {
        setTotalCreators(count);
      });
  }, [setTotalUsers, totalUsers]);

  const [totalChapters, setTotalChapters] = useState(0);
  useEffect(() => {
    if (!totalChapters)
      getChaptersCount().then(({ data: count }) => {
        setTotalChapters(count);
      });
  }, [setTotalChapters, totalChapters]);

  const summary = [
    {
      title: "Users",
      subtitle: "Total users as at today",
      value: formatNumberCompact(totalUsers),
    },
    {
      title: "Creators",
      subtitle: "Total creators as at today",
      value: formatNumberCompact(totalCreators),
    },
    {
      title: "Publications",
      subtitle: "Total Publications as at today",
      value: formatNumberCompact(totalComics),
    },
    {
      title: "Chapters",
      subtitle: "Total chapters as at today",
      value: formatNumberCompact(totalChapters),
    },
  ];
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="col-12">
          <div className="row">
            {summary.map((item, index) => (
              <div key={`summary-${index}`} className="col-lg-3 col-md-6 mb">
                <SummaryBox item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            {data.socials.map((item, index) => (
              <div key={`socials-${index}`} className="col-lg-3 col-md-6 mb">
                <SocialBox item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <UsersByMonthsChart />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Dashboard;

const UsersByMonthsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.blue,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const chartData = {
    labels: data.usersByMonths.labels,
    datasets: [
      {
        label: "Users",
        data: data.usersByMonths.data,
      },
    ],
  };
  return (
    <>
      <div className="title mb">Users by Months</div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
