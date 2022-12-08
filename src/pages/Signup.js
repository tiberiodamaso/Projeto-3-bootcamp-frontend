import { useState } from "react";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import validarCPF from "../utils/validarCPF";

function Signup() {

  const [img, setImg] = useState()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    imgProfile: '',
    cpf: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImage(e) {
    setImg(e.target.files[0])
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData()
      uploadData.append('picture', img)
      const response = await api.post('/uploadImage/upload', uploadData)
      return response.data.url

    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validarCPF(form.cpf)) {
      alert ('CPF inválido')
      return 
    }

    if (form.password !== form.password2) {
      alert('Senhas incompatíveis')
      return
    }

    const imgURL = await handleUpload()

    try {
      await api.post('/user/signup', {...form, imgProfile: imgURL})
      setForm({
        imgProfile: '',
        cpf: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
      })
      toast.success("Usuário adicionado com sucesso!");
      navigate('/')
    } catch (error) {
      console.log(error)

    }
  }


  return (
    <form className="col-6 col-md-3 m-auto my-5" onSubmit={handleSubmit}>
      <h2 className="text-center">Cadastrar usuário</h2>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Foto do perfil</label>
        <input className="form-control" type="file" id="formFile" onChange={handleImage} />
      </div>
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
      <div className="form-floating mb-3">
        <input type="password" name="password" onChange={handleChange} value={form.password} className="form-control" id="password1Id" placeholder="senha forte" />
        <label htmlFor="password1Id">Senha</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" name="password2" onChange={handleChange} value={form.password2} className="form-control" id="password2Id" placeholder="confirmação da senha" />
        <label htmlFor="password2Id">Confirmação da senha</label>
      </div>
      {/* <div className="form-floating">
        <select className="form-select" name="role" id="roleId" onChange={handleChange} value={form.role} aria-label="Floating label select">
          <option value="Escolha uma opção">Escolha uma opção</option>
          <option value="Admin">Admin</option>
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
        </select>
        <label htmlFor="roleId">Role</label>
      </div> */}
      <button className="w-100 btn btn-lg btn-primary my-3" type="submit">Salvar</button>
    </form>
  );
}

export default Signup;