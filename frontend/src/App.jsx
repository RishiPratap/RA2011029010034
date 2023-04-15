import './App.css'
import axios from 'axios'
import { useEffect,useState } from 'react';

function App() {
  const [dataTrain, setDataTrain] = useState([
    {
      trainDetails: "LOADING",
      trainPrice: "LOADING",
      trainTime: "LOADING",
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrainDetails() {
      try {
        const response = await axios.get("http://localhost:8000/getDetails");
        setDataTrain(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    }
    getTrainDetails();
  }, []);
  
  useEffect(() => {
    console.log(dataTrain);
  }, [dataTrain]);
  
  return (
    <div className="App">
     <div className='Header'>
        <img src="https://cdn-icons-png.flaticon.com/512/3/3843.png" alt="Vite Logo" className='logo' height="50px" width="50px" />
        <h3>Train Booking Schedule</h3>
     </div>
     <div className='content_main'>
     <table id="customers">
  <tr>
    <th>trainDetails</th>
    <th>trainPrice</th>
    <th>trainTime</th>
  </tr>
  {
    dataTrain.map((item,index) => {
      return (
        <tr>
          <td>{item.trainDetails}</td>
          <td>{item.trainPrice}</td>
          <td>{item.trainTime}</td>
        </tr>
      )
    }
    )
  }
  </table>
        </div>
    </div>
  )
}

export default App
