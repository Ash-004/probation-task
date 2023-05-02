import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Card from 'antd/lib/card';
// antd components
import DatePicker from 'antd/lib/date-picker';
import Cookies from 'universal-cookie';

import dataFetch from '../../../utils/dataFetch';
import Statsdash from './Statsdash';
import Doughnut from './Doughnut';

const { RangePicker } = DatePicker;
const moment = extendMoment(Moment);
const cookies = new Cookies();

const Overview2 = () => {

  const usernamecookie=cookies.get('username');
  const [data, setData] = useState([]);
  const [dailyLogData, setDailyLogData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pieData, setPieData] = useState([]);
  var numberDays=7;

  const [userName,setUserName] = useState([]);
  const [days,setDays] = useState(numberDays);
  const [given,setGiven] = useState(0);
  const [notGiven,setNotGiven] = useState(0);

  const [rangeLoaded, setRangeLoaded] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const[firstCounter,setFirstCounter] = useState(0);
  const[lastCounter,setLastCounter] = useState(0);

  const query = `query($date: Date!) {
  getStatusUpdates(date: $date) {
    message
    member {
      username
      lastStatusUpdate
    }
    date
    timestamp
  }
}
`;


  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!rangeLoaded) {
      setStartDate(new Date(moment().subtract(1, 'weeks').format('YYYY-MM-DD')));
      setRangeLoaded(true);
      numberDays=7;
    }

      // console.log(moment(endDate).diff(moment(startDate), 'days'));
    if (!isLoaded && rangeLoaded) {
      const variables = {
        endDate: moment(endDate).format('YYYY-MM-DD'),
      };
      // console.log(variables)


      // fetchData(variables).then((r) => {
      //
      //   // setUserName(r.data.getStatusUpdate.memberStats.usernamecookie);
      //   // r.data.getStatusUpdate.memberStats.map((item)=> {
      //
      //   console.log(r.data.getStatusUpdates.slice(-1)[0].member.username)
      //   console.log(r.data.getStatusUpdates[0].member.username)
      //
      // });



      function getDates(startDate, endDate) {

        const dates = [];
        let currentDate = startDate;

        // Include the start date in the array
        dates.push(currentDate);

        const addDays = function (days) {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };

        while (currentDate < endDate) {

          currentDate = addDays.call(currentDate, 1);
          dates.push(currentDate);
        }
        return dates;
      }


      const dates = getDates(startDate, endDate);

      setFirstCounter(0)
      setLastCounter(0)
      dates.forEach(function (date) {



        const curdate = {
          date:moment(date).format('YYYY-MM-DD'),
        }
        fetchData(curdate).then((r) => {

          // setUserName(r.data.getStatusUpdate.memberStats.usernamecookie);
          // r.data.getStatusUpdate.memberStats.map((item)=> {
          console.log(curdate)
          if(r.data.getStatusUpdates[0].member.username === "aashraya"){
            setFirstCounter((prevState)=>prevState+1);
            // console.log(firstCounter)
          }
          if(r.data.getStatusUpdates.slice(-1)[0].member.username === "aashraya"){
            setLastCounter((prevState)=>prevState+1);
            // console.log(lastCounter)
            // console.log("inc")
          }
          // console.log(r.data.getStatusUpdates[0].member.username)
          // console.log(r.data.getStatusUpdates.slice(-1)[0].member.username)


        });



      });


        //
        // setData(r.data.clubStatusUpdate.memberStats);
        // setDailyLogData(r.data.clubStatusUpdate.dailyLog);
        setLoaded(true);
      // });
    }
  });

  

  const handleRangeChange = (obj) => {
    if (obj[0] != null && obj[1] != null) {
      setStartDate(moment(obj[0]));
      setEndDate(moment(obj[1]));
      setLoaded(false);
      numberDays=moment(endDate).diff(moment(startDate), 'days');


    }
    // console.log(numberDays);

  };


  return (
    <div className="p-4">
      <div className="mx-2">
        <div className="row m-0">
          <div className="col text-right">
            <RangePicker
              defaultValue={[
                moment(new Date(), 'YYYY-MM-DD').subtract(1, 'weeks'),
                moment(new Date(), 'YYYY-MM-DD'),
              ]}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
      <div className="row m-0">   
        <div className="col-md-7 p-2">
             <Card style={{ boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.25)'}}>
                      <div class="flex-container"
                           style={{ display:'flex', flexBasis: 0 }}>
                          <div class="flex-child yellow"
                             style={{ flex:1, textAlign:'center'}}>
                              <h3>{days}</h3>
                              <h7>Total number of days</h7>
                          </div>
                          <div class="flex-child red"
                             style={{ flex:1, textAlign:'center'}}>
                              <h3>{given}</h3>
                              <h7>Updates given</h7>
                          </div>
                          <div class="flex-child blue"
                             style={{ flex:1, textAlign:'center'}}>
                              <h3>{notGiven}</h3>
                              <h7>Updates missed</h7>
                          </div>
                      </div>
            </Card>
            <Card style={{ boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.25)', marginTop: '20px'}}>
              <div><p>Number of times updated first:{firstCounter}</p></div>
              <div><p>Number of times updated last:{lastCounter}</p></div>
              <div><p>Number of times got kicked:☠</p></div>
            </Card>
        </div>
        <div className="col-md-5 p-2">
             <Card style={{backgroundColor: '#FFFFFF', boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.25)'}}>
                           {/*<Doughnut pdata={pieData}/>*/}
             </Card>
        </div>
        <div className="col-md-12 p-2">
               <Card style={{backgroundColor: '#FFFFFF', boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.25)'}}>
                  {/*<Statsdash data={data} isLoaded={true} />*/}
                </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview2;
