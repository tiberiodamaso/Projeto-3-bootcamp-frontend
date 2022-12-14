import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from 'react-router-dom';
import Pagination from "../components/Pagination";


function Logs() {
  const [reload, setReload] = useState(true)
  const [search, setSearch] = useState("");
  //const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    posts: [],
    currentPage: 1,
    postsPerPage: 15
  });


  const { currentPage, postsPerPage, posts } = pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);





  const paginate = pageNum => setPagination({ ...pagination, currentPage: pageNum });
  const nextPage = () => setPagination({ ...pagination, currentPage: currentPage + 1 });
  const prevPage = () => setPagination({ ...pagination, currentPage: currentPage - 1 });

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/log/all-logs");
        //setLogs(response.data);
        setPagination({
          ...pagination, posts: response.data.filter((log) => {
            return (
              log.user.cpf.toLowerCase().includes(search) ||
              log.user.first_name.toLowerCase().includes(search) ||
              log.route.toLowerCase().includes(search) ||
              log.log.toLowerCase().includes(search) ||
              log.date.slice(0, 10).toLowerCase().includes(search)
            );
          })
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLogs();
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
    setPagination({ ...pagination, currentPage: 1 })
    setReload(!reload);

  };


  return (


    <div className="container">
      <div className="d-flex">
        <h2 className="py-5 mx-3">Logs</h2>
      </div>


      <div className="col-6 justify-content-center mx-auto mb-5 py-md-2 text-center">
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
        Foram encontrados <span className="text-primary fw-bold">{posts.length}</span> registros.
      </div>

      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">CPF</th>
            <th scope="col">Nome</th>
            <th scope="col">Módulo</th>
            <th scope="col">Log</th>
            <th scope="col">Data</th>
            <th scope="col">Horário</th>
          </tr>
        </thead>
        <tbody>


          {!isLoading &&
            //logs
            currentPosts
              .map((log) => {
                return (
                  <tr key={log._id}>
                    <td>{log.user.cpf}</td>
                    <td>{log.user.first_name} {log.user.last_name}</td>
                    <td>{log.route}</td>
                    <td>{log.log}</td>
                    <td>{log.date.slice(0, 10)}</td>
                    <td>{log.date.slice(11, 19)}</td>

                  </tr>
                )
              })
          }


        </tbody>
      </table>

      <Pagination currentPage={pagination.currentPage} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      {/* <Link to="/analises"><button type="button" className="btn btn-dark">Voltar</button></Link> */}

    </div>
  );
}

export default Logs;