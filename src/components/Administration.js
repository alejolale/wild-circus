import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';

const Administration = () => {
  const [table, setTable] = useState(null);
  const [isLoading, setIsLoading] = useState();

  const sendForm = (e) => {
    e.preventDefault();
    axios.get('http://localhost:4000/api/v1/admins')
      .then(response => {console.log(response.data);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchTable = async () => {
      await axios.get('http://localhost:4000/api/v1/admins/')
        .then((res) => {
          setTable(res.data);
        });
    };
    fetchTable();
    setIsLoading(false);
  }, []);


    
    return(
      <div>
        
        <form>
          <label htmlFor="city">City</label>
          <input id="city" type="text" />
          <br/>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" />
          <br />
          <label htmlFor="time">Time</label>
          <input id="time" type="time" />
          <br/>
          <button onClick={sendForm}>Create new event</button>
        </form>

        <div>Next events:</div>
        {table && table.map(x => { 
          return (

            <p key={x.id}>name: {x.name} </p>
          );
            
         })
        }
      </div>
    );
}

export default Administration;