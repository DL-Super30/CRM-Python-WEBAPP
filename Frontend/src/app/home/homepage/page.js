
"use client";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../../component/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

// import Navbar from '../../../component/navbar';
import React, { useState } from "react";


function Home() {
  const data = [
    { x: new Date("2024-08-08T01:00:00").getTime(), y: 10 },
    { x: new Date("2024-08-08T02:00:00").getTime(), y: 15 },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="bg-gray-200">
      <Navbar Navbar={Navbar}/>
      
      <div className="flex flex-wrap gap-9 justify-center pt-10 ">
        {["Not Contacted", "Warm Lead", "Attempted", "Registered", "Opportunity", "Cold Lead"].map((status, index) => (
          <div key={index} className="container-sm border rounded shadow-lg bg-white p-4 flex gap-5">
            <span className="bg-gray-300 border rounded-full p-2 text-violet-600">
              <i className="fa-solid fa-users"></i>
            </span>
            <span className="text-gray-500 text-xs">
              {status}
              <p className="text-black font-semibold text-sm">1</p>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-9 pb-5 pt-10">
        <div className="w-full md:w-[850px] lg:w-[850px]">
          <div className="container-sm shadow-lg bg-white pt-5">
            <h2 className="text-center font-bold">Today Leads</h2>
            <Chart
              type="line"
              width="100%"
              height={250}
              series={[
                {
                  name: "products",
                  data: [0.0, 0.5, 1.0, 1.5, 2.0],
                },
              ]}
              options={{
                chart: {
                  id: "today-leads",
                },
                xaxis: {
                  type: "datetime",
                  labels: {
                    format: "HH:mm", // Hour and minute format
                  },
                  tickAmount: 11, // Adjust the number of ticks
                  min: new Date("2024-08-08T01:00:00").getTime(),
                  max: new Date("2024-08-08T23:00:00").getTime(),
                },
              }}
            />
          </div>
        </div>

        <div className="container-sm text-center pt-10 bg-white shadow-lg">
          <h1 className="text-center">Analytics</h1>
          <div className="pb-10 pr-10 pl-10 pt-3">
            <h1 className="border rounded-full p-16 text-center font-bold"><p>0</p>Leads</h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
