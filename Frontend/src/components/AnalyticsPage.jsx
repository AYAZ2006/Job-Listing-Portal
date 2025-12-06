import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,PointElement,LineElement,Title,Tooltip,Legend,} from "chart.js";
ChartJS.register(CategoryScale,LinearScale,BarElement,PointElement,LineElement,Title,Tooltip,Legend);

export default function AnalyticsPage() {
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [studentsEvaluated] = useState(560);
  const [draftPosts] = useState(23);
  const [barYear, setBarYear] = useState(new Date().getFullYear());
  const [lineYear, setLineYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([2025]);
  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      try {
        const jobsRes = await axios.get(`http://127.0.0.1:8000/my-jobs/?username=${username}`);
        const internshipsRes = await axios.get(`http://127.0.0.1:8000/my-internships/?username=${username}`);
        setJobs(jobsRes.data);
        setInternships(internshipsRes.data);
        const allYears = new Set([2025]);
        [...jobsRes.data, ...internshipsRes.data].forEach(item => {
          allYears.add(new Date(item.created_at).getFullYear());
        });
        const sortedYears = Array.from(allYears).sort((a, b) => a - b);
        setYears([...sortedYears, "All"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterByYear = (items, year) => {
    if (year === "All") return items;
    return items.filter(item => new Date(item.created_at).getFullYear() === Number(year));
  };

  const getMonthlyCounts = (items, year) => {
    const counts = new Array(12).fill(0);
    filterByYear(items, year).forEach(item => {const month = new Date(item.created_at).getMonth();counts[month]++;});
    return counts;
  };

  const jobsBarFiltered = filterByYear(jobs, barYear);
  const internshipsBarFiltered = filterByYear(internships, barYear);
  const jobsLineFiltered = filterByYear(jobs, lineYear);
  const internshipsLineFiltered = filterByYear(internships, lineYear);
  const stats = [
    { title: "Jobs Posted", value: jobsBarFiltered.length},
    { title: "Internships Posted", value: internshipsBarFiltered.length},
    { title: "Students Evaluated", value: studentsEvaluated},
    { title: "Draft Posts", value: draftPosts},
  ];

  const barData = {
    labels: ["Jobs Posted", "Internships Posted"],
    datasets: [
      {
        label: "Count",
        data: [jobsBarFiltered.length, internshipsBarFiltered.length],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Jobs Posted",
        data: getMonthlyCounts(jobs, lineYear),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
      {
        label: "Internships Posted",
        data: getMonthlyCounts(internships, lineYear),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex bg-[#121212] text-white">
      <div className="flex-1 flex flex-col overflow-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-[#1a1a1a] border border-gray-700">
              <CardHeader><CardTitle>{stat.title}</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#1a1a1a] border border-gray-700 h-64 flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Jobs vs Internships</CardTitle>
              <select className="bg-[#1a1a1a] border border-white/20 rounded px-2 py-1 text-white" value={barYear} onChange={(e) => setBarYear(e.target.value)}>
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center">
              <Bar data={barData} options={{responsive: true,maintainAspectRatio: false,plugins: { legend: { display: false } },}}
              />
            </CardContent>
          </Card>
          <Card className="bg-[#1a1a1a] border border-gray-700 h-64 flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Posting Trend (12 months)</CardTitle>
              <select className="bg-[#1a1a1a] border border-white/20 rounded px-2 py-1 text-white" value={lineYear} onChange={(e) => setLineYear(e.target.value)}>
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center">
              <Line data={lineData} options={{responsive: true,maintainAspectRatio: false,plugins: { legend: { position: "top" } },}}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
