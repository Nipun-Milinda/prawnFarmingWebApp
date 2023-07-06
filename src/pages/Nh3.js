import React, { useEffect, useState } from 'react';
import '../style/nh3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Nh3 = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [biochipStatus, setBiochipValue] = useState();
  const [showCheckContent, setShowCheckContent] = useState(false);
  const [showLowSolContent, setShowLowSolContent] = useState(false);

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

  const handleClick = () => {
    const getVal = document.getElementById('getVal');
    const nh3Val = document.getElementById('nh3Val');

    if (getVal && nh3Val) {
      nh3Val.innerHTML = getVal.value;
      setShowLowSolContent(parseFloat(getVal.value) > 1);
      setShowCheckContent(true);
    }
  };

  const handleNh3Treatment = () => {
    handleBiochipStatus();
    console.log(biochipStatus);
    if(biochipStatus === '0'){
      alert("Enter Biochip to Canister!!!");
    }else{
      axios.get("http://192.168.1.181/startNH3Treat")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    }
  };

  const handleBiochipStatus = () => {
      axios.get("http://192.168.1.181/bioChipStatus")
      .then((response) => setBiochipValue(response.data))
      .catch((error) => console.log(error));
  };

  return (
  <>
    <div className="lowerHeader">
      <div className="dirr">Dashboard &gt; NH3 Treatment</div>
      <div className="nh3Container">
        <div className="nh3ContainerLabel nh3ContainerItem">Enter NH3 Value :</div>
        <div className="nh3ContainerInput nh3ContainerItem"><input type='text' placeholder="0.013" id="getVal"></input></div>
        <div className="nh3ContainerSubmit nh3ContainerItem"><button type="submit" id="btn1" onClick={handleClick}>Submit</button></div>
      </div>
      <div className="dateTime">
        <div id="demo1">{currentDay}</div>
          <div id="demo2">{currentTime}</div>
          <div id="demo3">{currentDate}</div>
      </div>
    </div>

  <div className="bodyBG">
    <div className="bodyNH3">
      <div className="displayVal">
      <div id="nh3Display">NH3 Value:</div>
      <div id="nh3Val"></div>
      </div>

      {showCheckContent && (
      <div className="check">
        <h3>Recommended Treatment :</h3>
        <br />

      {showLowSolContent ? (
        <div className="nh3LowSol">
        <p> 
          <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#2A9D8F' }} /> Put Biochip into the small tank.
          <br />
          <br />
          <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#F4A261' }} /> Send water through the small tank to mix it with the relevant chemical.
        </p>
        <button className="btn" onClick={handleNh3Treatment}>Start Treatment</button>
        </div>
        ) : (
        <div className="nh3NoTreatment">
          <p>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '38px', color: '#2A9D8F' }} /> You dont have any treatment today.
          </p>
        </div>
        )}
      </div>
      )}
  </div> 
  </div>
  </>);
};

export default Nh3;