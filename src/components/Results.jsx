import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the "arc" element and scales
Chart.register(BarElement, CategoryScale, LinearScale);

const ResultCard = ({ constituency, state, status, candidate, party }) => (
    <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow p-6 m-2">
        <div className="flex flex-col justify-center items-center text-gray-800">
            <a href="candidateswise-S203.htm" className="text-center">
                <div>
                    <h3 className="text-lg font-semibold text-blue-600">{constituency}</h3>
                    <h4 className="text-md text-gray-500">{state}</h4>
                    <h2 className={`text-2xl font-bold ${status === 'WON' ? 'text-green-500' : 'text-red-500'}`}>{status}</h2>
                    <h5 className="text-lg font-semibold text-blue-600">{candidate}</h5>
                    <h6 className="text-md text-gray-500">{party}</h6>
                </div>
            </a>
        </div>
    </div>
);
const Results = () => {
    const data = {
        labels: ['Party 1', 'Party 2', 'Party 3'], // Replace with your party names
        datasets: [
            {
                label: '# of Votes',
                data: [300, 50, 100], // Replace with your vote counts
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-col md:flex-row items-start justify-center w-full h-[600px]">
                <div className="flex items-center justify-center w-full md:w-1/2  h-full">
                    <ResultCard 
                        className="bg-white shadow-lg rounded-lg p-6 w-full"
                        constituency="Constituency Name" 
                        state="State Name" 
                        status="Status" 
                        candidate="Candidate Name" 
                        party="Party Name" 
                    />
                </div>
                <div className="flex items-center justify-center w-full md:w-1/3 p-4 h-full">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Results;