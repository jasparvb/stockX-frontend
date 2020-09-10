import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlerts } from './actions/alerts';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuid } from 'uuid';  //used to create unqiue keys for rendered components

function Alerts() {
  const dispatch = useDispatch();
  const alerts = useSelector(st => st.alerts);
  
  //flashed messages disappear after specified time
  useEffect(() => {
    if (alerts[0]) {
      setTimeout(function() {
        dispatch(removeAlerts());
      },7000);
    }    
  })
  
  if (!alerts) {
    return null
  } else {
    return (
      <div className="Alerts">
        {alerts.map(a => (
          <Alert variant={a.type} key={uuid()}>
            <h6>{a.message}</h6>
          </Alert>
          ))
        }
      </div>
    )
  }  
}

export default Alerts;