// import React, { useState } from 'react';
// // import './vote.css';


// const Vote = () => {
//   const [candidates, setCandidates] = useState([
//     {
//       id: 1,
//       name: 'Candidate 1',
//       party: 'Party 1',
//       partyIcon: 'party-icon-url-1',
//       image: 'image-url-1',
//     },
//     {
//       id: 2,
//       name: 'Candidate 2',
//       party: 'Party 2',
//       partyIcon: 'party-icon-url-2',
//       image: 'image-url-2',
//     },
//     {
//         id: 3,
//         name: 'Candidate 3',
//         party: 'Party 3',
//         partyIcon: 'party-icon-url-1',
//         image: 'image-url-1',
//       },
//       {
//         id: 4,
//         name: 'Candidate 4',
//         party: 'Party 4',
//         partyIcon: 'party-icon-url-2',
//         image: 'image-url-2',
//       },
//     // Add more candidates as needed
//   ]);

//   const vote = (id) => {
//     console.log(`Voted for candidate with id: ${id}`);
//     // Implement your voting logic here
//   };

//   return (
//     <div className="container mx-auto w-full flex justify-start items-center flex-col m-10 rounded-3xl">
//         <h1 className=" m-10 text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
      
        
//           VOTE HERE
    
//       </h1>
//       <div className="candidate-boxes w-4/5 m-10">
//       {candidates.map((candidate) => (
//         <div key={candidate.id} className="candidate-card flex items-center bg-gray-800 justify-between border border-gray-300 p-5 mb-5 rounded shadow-sm">
//           <img className="w-12 h-12 rounded-full mr-5" src={candidate.image} alt={candidate.name} />
//           <div>
//           <h2 className="m-0 text-lg">{candidate.name}</h2>
//           <p className="m-0 text-base">{candidate.party}</p>
//           </div>
//           <img className="w-12 h-12 rounded-full mr-5" src={candidate.partyIcon} alt={candidate.party} />
//           <button className="px-5 py-2.5 bg-blue-600 text-white border-0 rounded cursor-pointer hover:bg-blue-700" onClick={() => vote(candidate.id)}>Vote</button>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// }
// export default Vote;


import React, { useState, useEffect } from 'react';
import web3 from '../../ethereum/web3'; // Import web3 library
import ballot from '../../ethereum/ballot';
import instance from '../../ethereum/election_creation'
import supabase from '../../supaBase';
import { useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiFlag1 } from "react-icons/ci";

const Vote = () => {

  const location = useLocation();
  const [district, setDistrict] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const districtParam = searchParams.get('district');
    if (districtParam) {
      setDistrict(districtParam);
    }
  }, [location.search]);
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
            details.push({
              name: candidateName,
              party: candidateParty,
              district: district
            });

          }
          console.log("candidate details: ",details);
          setCandidates(details);
          console.log(details.district)
          
  };

  const vote = async (index) => {
    // Connect to Metamask (or any other wallet provider)
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied account access');
        return;
      }
    }

    // Get the user's account address
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)

    // Send transaction to the vote function in the smart contract
    try {
      const electionAddresses = await instance.methods.getDeployedBallots().call();
      console.log(electionAddresses)
      let index1 = 0
      
      for(let i = 0;i<electionAddresses.length;i++){
        if(electionAddresses[i] == electionAddresses[index]  )
          index1 = i
      }
      const ballots = await ballot(electionAddresses[index1])
      console.log(ballots)

      const electionStart = await ballots.methods.electionStarted().call()
      console.log(electionStart)
      

 
      // await ballots.methods.vote(index).send({
      //   from: accounts[0],
      //   gas:'1000000'
      //   // Sending 0.01 ether with the transaction
      // });
      if(electionStart)
   {   await ballots.methods.vote(index1).send({
        from: accounts[0],
        //value: web3.utils.toWei('0.00000001', 'ether'), // Sending 0.00000001 ether with the transaction
        gas: 1000000, // Specify the gas limit here
      });}

  

      
      // Update the vote count locally
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate, i) =>
          i === index ? { ...candidate, votes: candidate.votes + 1 } : candidate
        )
      );
    } catch (error) {
      console.error('Error while voting:', error);
    }
  };

  return (
    <div className="container mx-auto w-full flex justify-start items-center flex-col m-10 rounded-3xl">
      <h1 className=" m-10 text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        VOTE HERE {district}
      </h1>
      <div className="candidate-boxes w-4/5 m-10">
  {candidates.map((candidate, index) => {
    if (district === candidate.district) {
      return (
        <div key={candidate.id} className="candidate-card flex items-center bg-gray-800 justify-between border border-gray-300 p-5 mb-5 rounded shadow-sm">
          <img className="w-12 h-12 rounded-full mr-5" src={'https://seeklogo.com/images/A/anonymous-logo-7E968E8797-seeklogo.com.png'}/>
          <div>
            <h2 className="m-0 text-lg">{candidate.name}</h2>
            <p className="m-0 text-base">{candidate.party}</p>
          </div>
          <img className="w-12 h-12 rounded-full mr-5" src={'https://www.pngitem.com/pimgs/m/80-804326_flag-vector-white-blow-neutral-white-flag-vector.png'} alt={candidate.party} />
          <button className="px-5 py-2.5 bg-blue-600 text-white border-0 rounded cursor-pointer hover:bg-blue-700" onClick={() => vote(index)}>
            Vote
          </button>
          {/* <span className="text-white">{candidate.votes}</span> */}
        </div>
      );
    } else {
      return null;
    }
  })}
</div>

    </div>
  );
};

export default Vote;



//new




