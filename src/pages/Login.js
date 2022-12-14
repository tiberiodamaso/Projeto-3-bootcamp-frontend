import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";

function Login() {
  const { setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", form);
      setForm({
        email: "",
        password: "",
      });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedInUser({ ...response.data });
      navigate("/analises");
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert("Por favor ative a sua conta clicando no link enviado por email");
        return;
      }
    }
  }

  return (
    <div className="d-flex" style={{ height: "90vh" }}>
      <main className="form-signin w-100 m-auto text-center">
        <form onSubmit={handleSubmit} className="col-6 col-md-3 m-auto">
          <h1 className="h3 mb-3 fw-normal">Log in</h1>
          <div className="form-floating my-3">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary my-3" type="submit">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
