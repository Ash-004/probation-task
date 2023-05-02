import React, { Component } from 'react'
import Chart from 'react-google-charts'
import PropTypes from 'prop-types';

const Doughnut = ({ pdata }) => {

const pieData = []
pieData.push(pdata[0])
pieData.push(pdata[1])
pieData.push(pdata[2])

const pieOptions = {
  // title: 'Status Updates',
  pieHole: 0.5,
  colors: ['#1f8ef1', '#000000'],
}

return (
      <div className="col-md-19">
        <h3>Status updates</h3>
        <Chart
          chartType="PieChart"
          loader={<div className="col-md-5 p-2"><img src="/static/images/loading.gif" alt="meow"/> </div>}
          data={pieData}
          options={pieOptions}
        />
      </div>
    )
}

Doughnut.propTypes = {
  pdata: PropTypes.array,
};

export default Doughnut;