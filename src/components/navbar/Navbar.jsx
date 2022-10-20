import "./navbar.css";
import logo from "./logo1.png"
import { Link } from 'react-router-dom';


function MainNavbar() {
    return (
      <nav className="navbar bg-light mainnav ">
        <div className="container navitems">
          <a className="navbar-brand" href="#">
          <Link to={"/"}>
            <img className='logoimg' src={logo} /> 
          </Link>
          </a>
          <h1 className='navphonenumber'>*4955</h1>
          <div className= 'navbuttons'>
            <Link to={"/volunteering"}>
              <button className='navbtn1'> התנדבות</button> 
            </Link>
            <Link to={"/adoption"}>
              <button className='navbtn2'> אימוץ כלב</button>
            </Link>
            <button className='navbtn3'> חדשות</button>
            <button className='navbtn4'> צרו קשר</button>
            <Link to={"/donation"}>
              <button className='navbtn5'> תרומה</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  
  export default MainNavbar




