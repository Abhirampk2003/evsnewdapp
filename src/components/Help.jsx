// HelpPage.jsx
import React, { useState } from 'react';

const HelpPage = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    }

    const handleFeedbackSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send the feedback to the server or creator
        alert(`Feedback submitted: ${feedback}`);
        setFeedback('');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white p-10">
        <div className="mb-10">
            <h2 className="text-4xl mb-6 font-semibold">We value your feedback!</h2>
            <p className="text-2xl text-center">If you have any suggestions, security loopholes, or other feedback, please let us know.</p>
        </div>
        <div className="w-full max-w-lg p-6 bg-gray-400 rounded-lg shadow-lg"> {/* Change the background color here */}
            <form onSubmit={handleFeedbackSubmit}>
                <textarea 
                    value={feedback} 
                    onChange={handleFeedbackChange} 
                    placeholder="Enter your feedback here" 
                    className="resize-none border-0 rounded-md text-black p-4 w-full h-48 mb-6" 
                    style={{ color: 'white' }} 
                />
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 text-2xl font-bold py-2 px-4 rounded shadow-lg">Submit Feedback</button>
            </form>
        </div>
    </div>
    );
}

export default HelpPage;