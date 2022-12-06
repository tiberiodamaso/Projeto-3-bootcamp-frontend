import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

function Signup() {

  const [form, setForm] = useState({
    cpf: '',
    first_name: '',
    last_name: '',
    email: '',
    role: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await axios.post('http://127.0.0.1:8082/user/signup', form)
    setForm({
      cpf: '',
      first_name: '',
      last_name: '',
      email: '',
      role: 'Escolha uma opção',
    })
    toast.success("Usuário adicionado com sucesso!");
  }


  return (
    <form className="col-6 m-auto" onSubmit={handleSubmit}>
      <h2 className="text-center">Cadastrar usuário</h2>
      <div className="form-floating mb-3">
        <input type="text" name="cpf" onChange={handleChange} value={form.cpf} className="form-control" id="cpfId" placeholder="Meu CPF" />
        <label htmlFor="cpfId">CPF</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" name="first_name" onChange={handleChange} value={form.first_name} className="form-control" id="first_nameId" placeholder="18" />
        <label htmlFor="first_nameId">Primeiro nome</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" name="last_name" onChange={handleChange} value={form.last_name} className="form-control" id="last_nameId" placeholder="18" />
        <label htmlFor="last_nameId">Último nome</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" name="email" onChange={handleChange} value={form.email} className="form-control" id="emailId" placeholder="meuemail@email.com" />
        <label htmlFor="emailId">Email</label>
      </div>
      <div className="form-floating">
        <select className="form-select" name="role" id="roleId" onChange={handleChange} value={form.role} aria-label="Floating label select">
          <option value="Escolha uma opção">Escolha uma opção</option>
          <option value="Admin">Admin</option>
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
        </select>
        <label htmlFor="roleId">Role</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary my-3" type="submit">Salvar</button>
    </form>
  );
}

export default Signup;