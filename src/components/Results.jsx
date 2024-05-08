import React, { useState ,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import web3 from '../../ethereum/web3'; // Import web3 library
import ballot from '../../ethereum/ballot';
import instance from '../../ethereum/election_creation'

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
    const storedDistrict = localStorage.getItem('district');
    console.log(storedDistrict);

    const [candidates, setCandidates] = useState([
        {
            id: 1,
            name: 'Candidate 1',
            party: 'Party 1',
            partyIcon: 'party-icon-url-1',
            image: 'image-url-1',
            votes: 0,
            district:'district1'
          },
          {
            id: 2,
            name: 'Candidate 2',
            party: 'Party 2',
            partyIcon: 'party-icon-url-2',
            image: 'image-url-2',
            votes: 0,
            district:'district2'
          },
          {
            id: 3,
            name: 'Candidate 3',
            party: 'Party 3',
            partyIcon: 'party-icon-url-1',
            image: 'image-url-1',
            votes: 0,
            district:'district3'
          },
          {
            id: 4,
            name: 'Candidate 4',
            party: 'Party 4',
            partyIcon: 'party-icon-url-2',
            image: 'image-url-2',
            votes: 0,
            district:'district4'
          },
      ]);
    
      useEffect(() => {
        loadCandidates();
      
      }, []);
    
      const loadCandidates = async () => {
        // Load candidates from the blockchain and update the state
        // You can use your instance to get deployedBallots and fetch candidates data from the smart contract
        // Example:
        // const deployedBallots = await instance.methods.getDeployedBallots().call();
        // const candidates = await deployedBallots.methods.getCandidates().call();
        // setCandidates(candidates);
    
        //new
        const accounts = await web3.eth.getAccounts();
            const electionAddresses = await instance.methods.getDeployedBallots().call();
            const ballotAddresses = []
              for (const address of electionAddresses) {
                const ballotAddress = await ballot(address)
                ballotAddresses.push(ballotAddress)
              }
              console.log("ballot addresses",ballotAddresses)
              const details = [];
    
              for (const addresses of ballotAddresses)
              {
                const candidateName = await addresses.methods.getCandidateName(0).call()
                const candidateParty = await addresses.methods.getCandidateParty(0).call()
                const district = await addresses.methods.votingDistrict().call()
                const voteCount = await addresses.methods.getVoteCount(0).call()
                details.push({
                  name: candidateName,
                  party: candidateParty,
                  district: district,
                  voteCount: Number(voteCount)
                });
    
              }
              console.log("candidate details: ",details);
              setCandidates(details);
              console.log(details.district)
              
      };
    
    const data = {
        labels: candidates.map(candidate => candidate.party), // Replace with your party names
        datasets: [
            {
                label: 'Votes',
                data: candidates.map(candidate => candidate.voteCount), // Replace with your vote counts
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
                        constituency={<h1>{candidates[0].district}</h1>}
                        state="STATE : KERALA" 
                        status="WINNER" 
                        candidate={<h1>{candidates[0].name}</h1>}
                        party={<h1>{candidates[0].party}</h1>}
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