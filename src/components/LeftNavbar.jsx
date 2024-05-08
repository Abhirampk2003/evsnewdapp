import React ,{ useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faVoteYea, faPlus, faPoll, faInfoCircle,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo1.png";
import './Navbar.css'; 
import { useNavigate,useLocation} from 'react-router-dom'; 
// import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="Logo">
                <img src={logo} alt="Logo" />
                {/* <span>VOTE!</span> */}
            </div>
      
            <ul>
            <li><button className={`nav-button ${location.pathname === '/profile/home' ? 'active' : ''}`} onClick={() => navigate('/profile/home')}><FontAwesomeIcon icon={faHome} /><span> Home</span></button></li>
                <li><button className={`nav-button ${location.pathname === '/profile/vote' ? 'active' : ''}`} onClick={() => navigate('/profile/vote')}><FontAwesomeIcon icon={faVoteYea} /><span> Vote</span></button></li>
                {/* <li><button className={`nav-button ${location.pathname === '/profile/election' ? 'active' : ''}`} onClick={() => navigate('/profile/election')}><FontAwesomeIcon icon={faVoteYea} /><span> Election</span></button></li> */}
              
                {/* <li><button className={`nav-button ${location.pathname === '/profile/candidate' ? 'active' : ''}`} onClick={() => navigate('/profile/candidate')}><FontAwesomeIcon icon={faPlus} /><span> Add Candidate</span></button></li> */}
                <li><button className={`nav-button ${location.pathname === '/profile/result' ? 'active' : ''}`} onClick={() => navigate('/profile/result')}><FontAwesomeIcon icon={faPoll} /><span> Results</span></button></li>
                {/* <li><button><FontAwesomeIcon icon={faPoll} /><span> Results</span></button></li> */}
            
                <li><button className={`nav-button ${location.pathname === '/profile/help' ? 'active' : ''}`} onClick={() => navigate('/profile/help')}><FontAwesomeIcon icon={faInfoCircle}/><span> Feedback</span></button></li>
                {/* <li><button><FontAwesomeIcon icon={faSignOutAlt} /><span> Log out</span></button></li> */}
                <li> <button onClick={() => navigate('/')}> <FontAwesomeIcon icon={faSignOutAlt} /><span> Log out</span></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;