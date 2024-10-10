"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import Chart from 'react-apexcharts';

const LeadManagementDashboard = () => {
  const [leadCounts, setLeadCounts] = useState({
    notContacted: 0,
    attempted: 0,
    warmLead: 0,
    coldLead: 0,
    Opportunity: 0,
    registered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadCountsByHour, setLeadCountsByHour] = useState(Array.from({ length: 24 }, () => 0));
  const [totalLeads, setTotalLeads] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get_leads');
      const result = await response.json();
      if (Array.isArray(result)) {
        updateLeadCounts(result);
        processLeadData(result);
      } else {
        console.error('Fetched data is not an array:', result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateLeadCounts = (leads) => {
    const counts = {
      notContacted: leads.filter(lead => lead.lead_status === 'Not Contacted').length,
      attempted: leads.filter(lead => lead.lead_status === 'Attempted').length,
      warmLead: leads.filter(lead => lead.lead_status === 'Warm Lead').length,
      coldLead: leads.filter(lead => lead.lead_status === 'Cold Lead').length,
      Opportunity: leads.filter(lead => lead.lead_status === 'Opportunity').length,
      registered: leads.filter(lead => lead.lead_status === 'Registered').length,
    };
    setLeadCounts(counts);
    setTotalLeads(Object.values(counts).reduce((sum, count) => sum + count, 0));
  };

  const processLeadData = (leads) => {
    const countsByHour = Array.from({ length: 24 }, () => 0);
    leads.forEach(lead => {
      const hour = new Date(lead.created_at).getUTCHours(); // Adjust for UTC
      if (!isNaN(hour)) {
        countsByHour[hour] += 1;
      }
    });

    // Calculate a moving average
    const smoothedData = calculateMovingAverage(countsByHour, 3); // 3-hour moving average
    setLeadCountsByHour(smoothedData);
  };

  const calculateMovingAverage = (data, windowSize) => {
    const averages = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - Math.floor(windowSize / 2));
      const end = Math.min(data.length, i + Math.floor(windowSize / 2) + 1);
      const window = data.slice(start, end);
      const average = window.reduce((sum, val) => sum + val, 0) / window.length;
      averages.push(average);
    }
    return averages;
  };

  // Prepare data for the chart
  const chartOptions = {
    chart: {
      id: 'leads-by-hour',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Hour labels
    },
    yaxis: {
      min: 0, // Start y-axis from 0
      title: {
        text: 'Number of Leads', // Y-axis title
      },
      labels: {
        formatter: (val) => Math.floor(val), // Remove decimals
      },
      tickAmount: 10, // Adjust for the number of ticks
    },
  };

  const chartSeries = [{
    name: 'Leads',
    data: leadCountsByHour, // Data for each hour
  }];

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 p-4 sm:p-8 font-bold text-base sm:text-lg">
        {[ 
          { label: 'Not Contacted', count: leadCounts.notContacted },
          { label: 'Warm Lead', count: leadCounts.warmLead },
          { label: 'Attempted', count: leadCounts.attempted },
          { label: 'Registered', count: leadCounts.registered },
          { label: 'Opportunity', count: leadCounts.Opportunity },
          { label: 'Cold Lead', count: leadCounts.coldLead },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-md sm:p-6 rounded-xl flex items-center space-x-4 sm:space-x-6">
            <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-blue-500" size="lg" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-500 text-sm sm:text-base">{item.label}</h2>
              <p className="text-xl sm:text-2xl">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-grow bg-white shadow-md p-4 sm:p-6 rounded-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Leads Created by Hour</h2>
        {loading ? (
          <p>Loading chart data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            width="100%"
            height="350"
          />
        )}
      </div>
        <div className="w-full sm:w-1/4 bg-white shadow-md p-4 sm:p-6 rounded-md flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Analytics</h2>
          <div className="p-4 sm:p-6">
            <h1 className="border rounded-full border-2 border-black text-center p-14 sm:p-12 text-sm sm:text-3xl">
              <p className="text-2xl">{totalLeads}</p>
              <span className='text-xl'> Leads</span>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeadManagementDashboard;
