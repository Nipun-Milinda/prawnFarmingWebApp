import React, { useEffect, useState } from 'react';
import '../style/home.css';
import phLogo from '../assets/PH.png';
import nh3Logo from '../assets/nh3.png';
import reportLogo from '../assets/report.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()];
    setCurrentDay(day);

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let time = h + ":" + m;
    setCurrentTime(time);

    let month = addZero(d.getMonth() + 1);
    let date = addZero(d.getDate());
    let year = d.getFullYear();
    let formattedDate = `${date}/${month}/${year}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
  <>
    <div className="lowerHeader">
      <div className="welcome">
      <h1>Hello Supun!</h1>
      <p>Nice to see you again</p>
      </div>
      <div className="dateTime">
          <div id="demo1">{currentDay}</div>
          <div id="demo2">{currentTime}</div>
          <div id="demo3">{currentDate}</div>
        </div>
    </div>
    
    <div class="body">
      <Link to="/ph"><div className="bodyElement"><img src={phLogo} width="120px" alt='phLogo'/><div className="bodyElementName">PH Treatment</div></div></Link>
      <Link to="/nh3"><div className="bodyElement"><img src={nh3Logo} width="120px" alt='nh3Logo'/><div className="bodyElementName">NH3 Treatment</div></div></Link>
      <Link to="/waterSystem"><div className="bodyElement"><img src={nh3Logo} width="120px" alt='nh3Logo'/><div className="bodyElementName">Water System</div></div></Link>
      <Link to="/report"><div className="bodyElement"><img src={reportLogo} width="120px" alt='reportLogo'/><div className="bodyElementName">Reports</div></div></Link>
    </div>
  </>)
};

export default Home;