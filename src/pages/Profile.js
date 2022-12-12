import { useState, useEffect } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'


function Profile() {
  const {setLoggedInUser} = useContext(AuthContext)
  const [img, setImg] = useState()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [reload, setReload] = useState(false)
  // const [form, setForm] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  // })
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get('/user/profile')
      setUser(response.data)
      setIsLoading(false)
    }
    fetchUser()
  }, [reload])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
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
    const imgURL = await handleUpload()
    await api.put('/user/update', { ...user, imgProfile: imgURL })
    // setForm({
    //   imgProfile: '',
    //   first_name: '',
    //   last_name: '',
    //   email: '',
    // })
    setReload(!reload)
  }

  async function handleDelete() {
    try {
      await api.delete('/user/delete', user)
      localStorage.removeItem('loggedInUser')
      setLoggedInUser(null)
      navigate('/');
      toast.success("Conta excluída com sucesso.");
    } catch (error) {
      console.log(error)
      return toast.error("Não foi possível deletar o usuário.");
    }
  }

  return (
    <div className='my-5'>
      {!isLoading && (<form className="col-6 col-md-3 m-auto" onSubmit={handleSubmit}>
        <h2 className="text-center">Editar perfil</h2>
        <div className="text-center mb-3">
          <img className="rounded-circle" src={user.imgProfile} alt="imagem do perfil" />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Foto do perfil</label>
          <input className="form-control" type="file" id="formFile" onChange={handleImage} />
        </div>
        <div className="form-floating mb-3">
          <input type="text" name="cpf" value={user.cpf} className="form-control text-black-50" id="cpfId" readOnly={true} />
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
        <div className='d-flex'>
          <button className="w-100 btn btn-lg btn-danger mx-1" type="button" onClick={handleDelete}>Excluir</button>
          <button className="w-100 btn btn-lg btn-primary mx-1" type="submit">Salvar</button>
        </div>
      </form>)}

    </div>
  );
}

export default Profile;