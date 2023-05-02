import React, { useEffect, useState } from 'react';

// antd components
import Card from 'antd/lib/card';


import dataFetch from '../../../utils/dataFetch';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



const StatsDash = ({ isLoaded, data }) => {
  const year2022 = [0,0,0,0,0,0,0,0,0,0,0,0];
  const year2021 = [0,0,0,0,0,0,0,0,0,0,0,0];
  const year2020 = [0,0,0,0,0,0,0,0,0,0,0,0];
  const year2019 = [0,0,0,0,0,0,0,0,0,0,0,0];
  const xaxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yaxis2022 = [];
  const yaxis2021 = [];
  const yaxis2020 = [];
  const yaxis2019 = [];


  const IndividualReport = (props) => {
    const usernamecookie=cookies.get('username');
    const [data, setData] = useState([]);
    // const [username, setUsername] = useState('');
    const [isLoaded, setLoaded] = useState(false);
  
    const query = `
      query getMemberStatusUpdates($username: String!){
        getMemberStatusUpdates(username:$username){
          message
          date
          member{
            fullName
            profile{
              profilePic
            }
            avatar{
              githubUsername
            }
          }
        }
      }`;
  
      const fetchData = async (variables) => dataFetch({ query, variables });
  
      const getMemberUpdates = (username) => {
        // setUsername(username);
        const variables = { username };
        fetchData(variables).then((r) => {
          // console.log(r);
          setData(r.data.getMemberStatusUpdates);
          setLoaded(true);
        });
      };
    
      getMemberUpdates(usernamecookie);
      data.map((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const dateStr = `${year}-${month}-${day}`;
        if (year === 2022) {
          year2022[month] = year2022[month] + 1;
        }
        if (year === 2021) {
          year2021[month] = year2021[month] + 1;
        }
        if (year === 2020) {
          year2020[month] = year2020[month] + 1;
        }
        if (year === 2019) {
          year2019[month] = year2019[month] + 1;
        }
        
      });

      yaxis2022.push(year2022[0],year2022[1],year2022[2],year2022[3],year2022[4],year2022[5],year2022[6],year2022[7],year2022[8],year2022[9],year2022[10],year2022[11]);
      yaxis2021.push(year2022[0],year2022[1],year2022[2],year2022[3],year2022[4],year2022[5],year2022[6],year2022[7],year2022[8],year2022[9],year2022[10],year2022[11]);
      yaxis2020.push(year2022[0],year2022[1],year2022[2],year2022[3],year2022[4],year2022[5],year2022[6],year2022[7],year2022[8],year2022[9],year2022[10],year2022[11]);
      yaxis2019.push(year2022[0],year2022[1],year2022[2],year2022[3],year2022[4],year2022[5],year2022[6],year2022[7],year2022[8],year2022[9],year2022[10],year2022[11]);
    }


    IndividualReport();

  const [year, setYear] = useState('2022');
  let graph = {
    data: (canvas) => {
      let ctx = canvas.getContext('2d');

      let gradientStroke = ctx.createLinearGradient(0, 2300, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)');

      return {
        labels:
          xaxis,
        datasets: [
          {
            label: 'Status Graph',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#1f8ef1',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#1f8ef1',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data:
            year === '2022'
            ? yaxis2022
            : year === '2021'
            ? yaxis2021
            : year === '2020'
            ? yaxis2020
            : yaxis2019,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: '#9a9a9a',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: '#9e9e9e',
            },
          },
        ],
      },
    },
  };
  return (
    <Card>
      <div className="row m-0">
        <div className="col-md-10">
          <h5 className="mb-4 bp3-heading">Member Status Update Trends</h5>
        </div>
        <div className="col text-right p-3">
          <select
            style={{ width: '100%', height: '4vh' }}
            onChange={(e) => setYear(e.currentTarget.value)}
          >
            <option value="2022" selected>
              2022
            </option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ padding: '5px', width: '100%', height: '50vh' }}
      >
        {isLoaded ? <Line data={graph.data} options={graph.options} /> : null}
      </div>
    </Card>
  );
};

StatsDash.propTypes = {
  data: PropTypes.object,
  isLoaded: PropTypes.bool,
};

export default StatsDash;
