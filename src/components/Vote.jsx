import React, { useState } from 'react';
// import './vote.css';


const Vote = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Candidate 1',
      party: 'Party 1',
      partyIcon: 'party-icon-url-1',
      image: 'image-url-1',
    },
    {
      id: 2,
      name: 'Candidate 2',
      party: 'Party 2',
      partyIcon: 'party-icon-url-2',
      image: 'image-url-2',
    },
    {
        id: 3,
        name: 'Candidate 3',
        party: 'Party 3',
        partyIcon: 'party-icon-url-1',
        image: 'image-url-1',
      },
      {
        id: 4,
        name: 'Candidate 4',
        party: 'Party 4',
        partyIcon: 'party-icon-url-2',
        image: 'image-url-2',
      },
    // Add more candidates as needed
  ]);

  const vote = (id) => {
    console.log(`Voted for candidate with id: ${id}`);
    // Implement your voting logic here
  };

  return (
    <div className="container mx-auto w-full flex justify-start items-center flex-col m-10 rounded-3xl">
        <h1 className=" m-10 text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
      
        
          VOTE HERE
    
      </h1>
      <div className="candidate-boxes w-4/5 m-10">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="candidate-card flex items-center bg-gray-800 justify-between border border-gray-300 p-5 mb-5 rounded shadow-sm">
          <img className="w-12 h-12 rounded-full mr-5" src={candidate.image} alt={candidate.name} />
          <div>
          <h2 className="m-0 text-lg">{candidate.name}</h2>
          <p className="m-0 text-base">{candidate.party}</p>
          </div>
          <img className="w-12 h-12 rounded-full mr-5" src={candidate.partyIcon} alt={candidate.party} />
          <button className="px-5 py-2.5 bg-blue-600 text-white border-0 rounded cursor-pointer hover:bg-blue-700" onClick={() => vote(candidate.id)}>Vote</button>
        </div>
      ))}
    </div>
    </div>
  );
}
export default Vote;