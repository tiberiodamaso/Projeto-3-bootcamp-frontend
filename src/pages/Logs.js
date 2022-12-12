import { useState, useEffect } from "react";
import api from "../api/api";
import {Link} from 'react-router-dom';
import Pagination from "../components/Pagination";


function Logs() {
  const [search, setSearch] = useState("");
  //const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [pagination, setPagination] = useState({
    posts: [],
    currentPage: 1,
    postsPerPage: 10
  });


  const { currentPage, postsPerPage, posts } = pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNum => setPagination({...pagination, currentPage: pageNum });
  const nextPage = () => setPagination({...pagination, currentPage: currentPage + 1 });
  const prevPage = () => setPagination({...pagination, currentPage: currentPage - 1 });

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/log/all-logs");
        //setLogs(response.data);
        setPagination({...pagination, posts: response.data});

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLogs();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  };

 
  return (
         

      <div className="container mt-5">         

        <h4>Logs</h4>

        <div className="col-6 justify-content-center mx-auto my-2 py-md-2 text-center">
          <div className="input-group mb-3">
            
            <input
              type="search"
              value={search}
              className="form-control"
              placeholder="Pesquisar"
              aria-label="Search"
              onChange={handleSearch}
            />
            <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
          </div>
        </div>

        <table className="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">CPF</th>
                <th scope="col">Nome</th>
                <th scope="col">Módulo</th>
                <th scope="col">Log</th>
                <th scope="col">Data</th>
            </tr>
        </thead>
        <tbody>


            {!isLoading &&
                    //logs
                    currentPosts
                    .filter((log) => {
                        return (
                          log.user.cpf.toLowerCase().includes(search) ||
                          log.user.first_name.toLowerCase().includes(search) ||
                          log.route.toLowerCase().includes(search) ||
                          log.log.toLowerCase().includes(search) ||
                          log.date.slice(0,10).toLowerCase().includes(search) 
                        );
                      })
                    .map((log)=>{
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
        
        <Pagination currentPage={pagination.currentPage} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
        <Link to="/analises"><button type="button" className="btn btn-dark">Voltar</button></Link>
            

    </div>
  );
}

export default Logs;