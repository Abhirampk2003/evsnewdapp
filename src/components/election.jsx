import React, { useState, useEffect } from 'react';
// import TimePicker from 'react-time-picker';
// import './home.css'; 
const TimePicker = ({ label, value, onChange }) => {
    const hours = [...Array(12).keys()].map(i => i + 1);
    const minutes = ['00', '15', '30', '45'];
    const amPm = ['AM', 'PM'];
  
    const [hour, minute, period] = value.split(/[:\s]/);
  
    const handleHourChange = (e) => {
      onChange(`${e.target.value}:${minute} ${period}`);
    };
  
    const handleMinuteChange = (e) => {
      onChange(`${hour}:${e.target.value} ${period}`);
    };
  
    const handlePeriodChange = (e) => {
      onChange(`${hour}:${minute} ${e.target.value}`);
    };
  
    return (
      <div className="flex items-center space-x-2">
        <label className="block text-white">{label}</label>
        <select value={hour} onChange={handleHourChange} className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span>:</span>
        <select value={minute} onChange={handleMinuteChange} className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <select value={period} onChange={handlePeriodChange} className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
          {amPm.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>
    );
  };
const StartElection = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [countdown, setCountdown] = useState(10); // 10 seconds countdown
    const [showNotifyPopup, setShowNotifyPopup] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const startElection = () => {
        setShowPopup(true);
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const closePopup = () => {
        setShowPopup(false);
        setCountdown(10); // Reset the countdown
    };
    const notifyVoters = () => {
        setShowNotifyPopup(true);
    };

    const closeNotifyPopup = () => {
        setShowNotifyPopup(false);
        
    };

    const [showSentPopup, setShowSentPopup] = useState(false);
    const sendNotification = (event) => {
        event.preventDefault();
      
        console.log(`Election starts: ${startDate} ${startTime}`);
        console.log(`Election ends: ${startDate} ${endTime}`);
        setShowSentPopup(true);
    };

    const closeSentPopup = () => {
        setShowSentPopup(false);
        setShowNotifyPopup(false);
    };

    
    
    return (
        <div className={`relative flex flex-col items-center justify-center min-h-screen bg-custom-gray text-white p-4 ${showPopup ? 'backdrop-blur-lg' : ''}`}>
            {/* ${showPopup ? 'backdrop-blur-md' : ''} */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Election Dashboard</h1>
                <p className="text-xl">Use the buttons below to start the election and notify voters.</p>
            </header>
            <button 
                onClick={startElection} 
                className="mb-4 px-8 py-4 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
                Start Election
            </button>
            <button 
                onClick={notifyVoters} 
                className="px-8 py-4 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 transition-colors duration-300"
            >
                Notify Voters
            </button>
            {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 m-4 w-1/3 text-center z-20">
            <button onClick={closePopup} className="float-right text-white hover:text-gray-200">X</button>
            {countdown > 0 ? (
                <p>The election will start in {countdown} seconds...</p>
            ) : (
                <p>The election has started!</p>
            )}
        </div>
    </div>
)}  
   {showNotifyPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
            <div className="bg-gray-700 rounded-lg shadow-lg p-6 m-4 w-1/3 text-center z-20">
                <button onClick={closeNotifyPopup} className="float-right text-white hover:text-gray-200">X</button>
                <form onSubmit={sendNotification} className="space-y-4 text-white">
                    <div className="flex space-x-4 items-center">
                        <label className="block flex-1">
                            Date:
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
                        </label>
                    </div>
                    <div className="flex space-x-8 items-center">
                        <TimePicker label="Start Time:" value={startTime} onChange={setStartTime} />
                        <TimePicker label="End Time:" value={endTime} onChange={setEndTime} />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-300">
                        Send
                    </button>
                </form>
                    </div>
                </div>
            )}
             {showSentPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
                    <div className="bg-gray-700 rounded-lg shadow-lg p-6 m-4 w-1/3 text-center z-20">
                        <button onClick={closeSentPopup} className="float-right text-white hover:text-gray-200">X</button>
                        <p>Notification is sent to all Voters</p>
                    </div>
                </div>
                )}

        </div>
    );
}

export default StartElection;