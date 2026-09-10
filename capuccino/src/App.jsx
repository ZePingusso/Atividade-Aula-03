import './App.css'
import NovoUsuario from './components/NovoUsuario.jsx'
import ListaUsuarios from './components/listaUsuarios.jsx'

export default function App () {
  return (
    <>
      <div>
        <h1>Meu App</h1>
        <ListaUsuarios />
        <NovoUsuario />
      </div>
    </>
  )
}