import React, { useState } from 'react';
// import './candidate.css'; // Import your CSS file

const ElectionSelector = () => {
  return (
    <div className="flex justify-between w-full p-2.5 bg-gray-200 rounded-md">
      <label>
        Election:
        <select name="election">
          <option value="">Select...</option>
          <option value="election1">Election 1</option>
          <option value="election2">Election 2</option>
        </select>
      </label>
    </div>
  );
};

const CandidateForm = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    image: null,
    dob: '',
    party: '',
    state: '',
    district: '',
    constituency: '',
    phone: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCandidate(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-2.5 overflow-y-auto p-2.5 w-full max-w-xl mx-auto bg-gray-800 rounded-lg shadow-md">
    <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
      Name:
      <input className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" type="text" name="name" value={candidate.name} onChange={handleChange} />
    </label>
    <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
      Image:
      <input className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" type="file" name="image" onChange={handleFileChange} />
    </label>
    <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
      Date of Birth:
      <input className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" type="date" name="dob" value={candidate.dob} onChange={handleChange} />
    </label>
    <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
      Party:
      <select className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" name="party" value={candidate.party} onChange={handleChange}>
        <option value="">Select...</option>
          {/* Add your parties here */}
          <option value="party1">Party 1</option>
          <option value="party2">Party 2</option>
        </select>
      </label>
      <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
        State:
        <select className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" name="state" value={candidate.state} onChange={handleChange}>
          <option value="">Select...</option>
          {/* Add your states here */}
          <option value="state1">State 1</option>
          <option value="state2">State 2</option>
        </select>
      </label>
      <label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
  District:
  <select className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" name="district" value={candidate.district} onChange={handleChange}>
    <option value="">Select...</option>
    {/* Add your districts here */}
    <option value="district1">District 1</option>
    <option value="district2">District 2</option>
  </select>
</label>
<label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
  Constituency:
  <select className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" name="constituency" value={candidate.constituency} onChange={handleChange}>
    <option value="">Select...</option>
    {/* Add your constituencies here */}
    <option value="constituency1">Constituency 1</option>
    <option value="constituency2">Constituency 2</option>
  </select>
</label>
<label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
  Phone Number:
  <input className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" type="text" name="phone" value={candidate.phone} onChange={handleChange} />
</label>
<label className="flex flex-row justify-between items-center w-full p-2.5 text-white font-bold">
  Description:
  <textarea className="w-96 p-2.5 bg-black border border-gray-300 font-bold text-white rounded-md" name="description" value={candidate.description} onChange={handleChange} />
</label>
<button className="px-5 py-2.5 border-0 rounded-md bg-blue-500 text-white cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-700">
  Submit
</button>
    </form>
  );
};

const AddCandidate = () => (
  <div className="flex flex-col items-center space-y-5 p-5">
  

    <h1 className=" m-5 text-xl sm:text-4xl lg:text-5xl text-center tracking-wide bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
      
        
      ADD CANDIDATE

  </h1>
    {/* <ElectionSelector /> */}
    <CandidateForm />
  </div>
);

export default AddCandidate;