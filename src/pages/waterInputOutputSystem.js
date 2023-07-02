import React, { useEffect, useState } from 'react';
import '../style/waterInputOutputSystem.css';
import axios from 'axios';
//

const WaterInputOutputSystem = () => {

  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
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

    const handleWaterIOSystem = () => {
      axios.get("http://192.168.1.181/startWaterIOSystem")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    };

    const handleHarvestingSystem = () => {
      axios.get("http://192.168.1.181/startHarvestingSystem")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    };

  return (
    <>
      <div className="lowerHeader">
        <div className="dirr">Dashboard &gt; Water System</div>
        <div className="dateTime">
            <div id="demo1">{currentDay}</div>
            <div id="demo2">{currentTime}</div>
            <div id="demo3">{currentDate}</div>
        </div>
      </div>
      <div className="contentContainer">
        <div className="event waterInputSystem">
          <div className="title">Water Input System</div>
          <div className="eventBtnFunc">
            <input type="button" value="Start" className='eventBtn' onClick={handleWaterIOSystem} />
          </div>
        </div>
        <div className="event harvestingSystem">
          <div className="title">Harvesting  System</div>
          <div className="eventBtnFunc">
            <input type="button" value="Start" className='eventBtn' onClick={handleHarvestingSystem} />
          </div>
        </div>
      </div>
    </>
  )
};

export default WaterInputOutputSystem;