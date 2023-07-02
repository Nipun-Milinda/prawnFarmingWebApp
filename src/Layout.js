// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Outlet, Link } from "react-router-dom";
import './index.css';


const Layout = () => {
  return (
    <>
      <header className="header">
        {/* header title */}
        <div className='headerTitle'>Tech Solutions</div>
        
        {/* header navigations */}
        <div className="headerNav">
          <div className="navElement"><Link className="navName" to="/">Home</Link></div>
          <div className="navElement"><Link className="navName" to="/nh3">Nh3</Link></div>
          <div className="navElement"><Link className="navName" to="/waterSystem">Water System</Link></div>
          <div className="navElement"><Link className="navName" to="/ph">Ph</Link></div>
          <div className="navElement"><Link className="navName" to="/report">Report</Link></div>
        </div>
      </header>

      <Outlet />
    </>
  )
};

export default Layout;