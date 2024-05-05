// Home.js
import React ,{ useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faEnvelope, faBell,faCaretDown,faTimes} from '@fortawesome/free-solid-svg-icons';
// import './home.css';
const Home = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
      <div className="flex h-15 justify-between items-center p-2.5 bg-gray-700 text-gray-100">
          <div className="m-5 flex items-center bg-transparent">
            <FontAwesomeIcon icon={faSearch} />
            <input className="ml-2.5 bg-transparent w-96" type="text" placeholder="Search for assembly elections..." />
          </div>
          <div className="m-5 flex items-center space-x-5 relative">
  <FontAwesomeIcon icon={faEnvelope} />
  <FontAwesomeIcon icon={faBell} />
  <FontAwesomeIcon icon={faUser} />
  <span className="cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
    User Name
    
  </span>
  {dropdownOpen && (
    <div className="absolute top-full bg-gray-100 text-gray-800 p-2.5 mt-2.5 w-48 rounded-md shadow-md z-10">
      <FontAwesomeIcon icon={faTimes} className="absolute top-2.5 right-2.5 cursor-pointer" onClick={() => setDropdownOpen(false)} />
      <img className="w-full h-auto rounded-full mb-2.5"  src="user-photo-url" alt="User" />
      <p className="m-0 py-1 border-b border-gray-300">Name: User Name</p>
      <p className="m-0 py-1 border-b border-gray-300">District: User District</p>
      <p className="m-0 py-1 border-b border-gray-300">State: User State</p>
    </div>
  )}
  
</div>
        </div>
    );
}

export default Home;
