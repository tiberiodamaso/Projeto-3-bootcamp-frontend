import { useState, useEffect } from "react";
import api from "../api/api";
import {Link} from 'react-router-dom';


function Logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/log/all-logs");
        setLogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLogs();
  }, []);


  return (
         

      <div className="container mt-5">         

        <h4>User Logs</h4>


        <table className="table">
        <thead>
            <tr>
                <th scope="col">User CPF</th>
                <th scope="col">User Name</th>
                <th scope="col">Route</th>
                <th scope="col">Log</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody>


            {!isLoading &&
                    logs.map((log)=>{
                        return (
                            <tr key={log._id}>
                                <td>{log.user.cpf}</td>
                                <td>{log.user.first_name} {log.user.last_name}</td>
                                <td>{log.route}</td>
                                <td>{log.log}</td>
                                <td>{log.date.slice(0,10)}</td>
                                
                            </tr>
                        )
                    }).reverse()
            }

           
        </tbody>
        </table>

        <Link to="/">Voltar</Link>
            

    </div>
  );
}

export default Logs;