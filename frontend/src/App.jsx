import './App.css'
import { useEffect,useState } from 'react';

function App() {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/getDetails')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  
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
    <th>trainSeat</th>
  </tr>
  </table>
        </div>
    </div>
  )
}

export default App
