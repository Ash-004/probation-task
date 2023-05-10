import React, { useEffect,useState } from 'react';
import Base from '../../components/base'; 
import Overview2 from '../../modules/statusUpdates/components/Overview2';
import TitleBar from '../../components/titlebar';


const StatusStats = (props) => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/status-update',
      name: 'Status Update',
    },
    {
      path: '/status-update/dashboard',
      name: 'Dashboard',
    },
  ];
  return (
    <Base title="Status Update Statistics" {...props}>
      <TitleBar routes={routes} title="Status Update Statistics" />
      <div className="row m-0">
        <Overview2 />
      </div>
    </Base>
  );
};

export default StatusStats;



  
 
  