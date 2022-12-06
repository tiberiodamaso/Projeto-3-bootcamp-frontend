import { useState } from "react";

function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setForm({
      nome: "",
      email: "",
    });
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto text-center">
        <form onSubmit={handleSubmit} className="col-6 m-auto">
          <img className="mb-4" src="" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating my-3">
            <input type="email" name="email" onChange={handleChange} value={form.email} className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" onChange={handleChange} value={form.password} className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div> */}
          <button className="w-100 btn btn-lg btn-primary my-3" type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}

export default Login;