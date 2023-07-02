import React, { useEffect, useState } from 'react';
import '../style/ph.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Ph = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [phValue, setphValue] = useState(0);
  const [showTreatmentContent, setShowTreatmentContent] = useState(false);

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
    // setCurrentDate(formattedDate);
  }, []);

    const handleCheck = () => {
      axios.get("http://192.168.1.181/checkPH")
    .then((response) => setphValue(response.data))
    .catch((error) => console.log(error));
    setShowTreatmentContent(true);
  };

    const lowRangePhHandle = () => {
        axios.get("http://192.168.1.181/startPHTreatLow")
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
    };

    const highRangePhHandle = () => {
        axios.get("http://192.168.1.181/startPHTreatHigh")
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
    };

  const getTreatmentContent = () => {
    if (!showTreatmentContent) {
      return null;
    }

    if (phValue < 7.5) {
      return (
        <div className="lowRange">
          <p>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#2A9D8F' }} /> Put slake lime into the small tank.
            <br />
            <br />
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#F4A261' }} /> Send water through the small tank to mix it with the relevant chemical.
          </p>
          <button className="btn" onClick={lowRangePhHandle}>Start Treatment</button>
        </div>
      );
    } else if (phValue > 8.5) {
      return (
        <div className="highRange">
          <p>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#2A9D8F' }} /> Put sugar into the small tank.
            <br />
            <br />
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#F4A261' }} /> Send water through the small tank to mix it with the relevant chemical.
          </p>
          <button className="btn" onClick={highRangePhHandle}>Start Treatment</button>
        </div>
      );
    } else {
      return (
        <div className="equalRange">
          <p>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#2A9D8F' }} /> You don't have any treatment today.
          </p>
        </div>
      );
    }
  };

  return (
  <>
    <div className="lowerHeader">
      <div className="dirr">Dashboard &gt; PH Treatment</div>
      <div className="phContainer">
        <div className="phContainerLabel phContainerItem">Check Ph Value :</div>
        <div className="phContainerInput phContainerItem"><label>{phValue}</label></div>
        <div className="phContainerSubmit phContainerItem"><button type="submit" onClick={handleCheck}>Check</button></div>
      </div>
      <div className="dateTime">
          <div id="demo1">{currentDay}</div>
          <div id="demo2">{currentTime}</div>
          <div id="demo3">{currentDate}</div>
        </div>
      </div>
    

<div className="bodyBG">
    <div className="bodyNH3">
      <div className="check">
        <h3>Recommended Treatment :</h3>
        <br />

        {getTreatmentContent()}

      </div>

      
  </div> 
  </div>
  </>);
};

export default Ph;