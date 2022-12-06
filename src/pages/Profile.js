import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import users from '../users.json'


function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    last_name: 0,
    email: '',
    role: ''
  })
  const [user, setUser] = useState({})
  const { id } = useParams()

  useEffect(() => {
    setUser(users.filter(user => {
        return user.id === parseInt(id) }))
    setIsLoading(true)
  }, [id])

function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value })
}

function handleSubmit(e) {
  e.preventDefault()
  setForm({
    name: '',
    age: 0,
    email: '',
    role: 'Escolha uma opção'
  })
}
return (
  <div>
  {!isLoading && (<form className="col-6 m-auto" onSubmit={handleSubmit}>
    <h2 className="text-center">Editar perfil</h2>
    <div className="form-floating mb-3">
      <input type="text" name="cpf" onChange={handleChange} value={user.cpf} className="form-control" id="cpfId" placeholder="Meu CPF" />
      <label htmlFor="cpfId">CPF</label>
    </div>
    <div className="form-floating mb-3">
      <input type="text" name="first_name" onChange={handleChange} value={user.first_name} className="form-control" id="first_nameId" placeholder="18" />
      <label htmlFor="first_nameId">Primeiro nome</label>
    </div>
    <div className="form-floating mb-3">
      <input type="text" name="last_name" onChange={handleChange} value={user.last_name} className="form-control" id="last_nameId" placeholder="18" />
      <label htmlFor="last_nameId">Último nome</label>
    </div>
    <div className="form-floating mb-3">
      <input type="email" name="email" onChange={handleChange} value={user.email} className="form-control" id="emailId" placeholder="meuemail@email.com" />
      <label htmlFor="emailId">Email</label>
    </div>
    <div className="form-floating">
      <select className="form-select" id="roleId" aria-label="Floating label select example">
        <option value={user.role}>Escolha uma opção</option>
        <option value="Admin">Admin</option>
        <option value="Aluno">Aluno</option>
        <option value="Professor">Professor</option>
      </select>
      <label htmlFor="roleId">Role</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary my-3" type="submit">Salvar</button>
  </form>)}
  
  </div>
);
}

export default Profile;