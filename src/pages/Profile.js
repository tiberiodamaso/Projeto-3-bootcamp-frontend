import { useState, useEffect } from 'react'
import api from '../api/api'


function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get('/user/profile')
      setUser(response.data)
    }
    fetchUser()
    setIsLoading(false)
  }, [])

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
      <input type="text" name="cpf" value={user.cpf} className="form-control" id="cpfId" placeholder="Meu CPF" />
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
    <button className="w-100 btn btn-lg btn-primary my-3" type="submit">Salvar</button>
  </form>)}
  
  </div>
);
}

export default Profile;