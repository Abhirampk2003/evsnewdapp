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
            <li><button className={`nav-button ${location.pathname === '/admin/home' ? 'active' : ''}`} onClick={() => navigate('/admin/home')}><FontAwesomeIcon icon={faHome} /><span> Home</span></button></li>
                {/* <li><button className={`nav-button ${location.pathname === '/admin/vote' ? 'active' : ''}`} onClick={() => navigate('/admin/vote')}><FontAwesomeIcon icon={faVoteYea} /><span> Vote</span></button></li> */}
                <li><button className={`nav-button ${location.pathname === '/admin/election' ? 'active' : ''}`} onClick={() => navigate('/admin/election')}><FontAwesomeIcon icon={faVoteYea} /><span> Election</span></button></li>
              
                <li><button className={`nav-button ${location.pathname === '/admin/candidate' ? 'active' : ''}`} onClick={() => navigate('/admin/candidate')}><FontAwesomeIcon icon={faPlus} /><span> Add Candidate</span></button></li>
                <li><button><FontAwesomeIcon icon={faPoll} /><span> Results</span></button></li>
                <li><button><FontAwesomeIcon icon={faInfoCircle} /><span> Help</span></button></li>
                {/* <li><button><FontAwesomeIcon icon={faSignOutAlt} /><span> Log out</span></button></li> */}
                <li> <button onClick={() => navigate('/')}> <FontAwesomeIcon icon={faSignOutAlt} /><span> Log out</span></button></li>
            </ul>
        </nav>
    );
}

export default Navbar;