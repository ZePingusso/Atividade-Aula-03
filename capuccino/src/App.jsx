import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function buscarUsers(){
      const resposta = await fetch("https://jsonplaceholder.typicode.com/users/5");
      const dados = await resposta.json();
      setUsers(dados);
    }
    buscarUsers();
  }, []);
  if (users === null) {
    return <h1>Carregando...</h1>
  }
  
  return (
    <>
      <section id="center">
        <h1>{users.name}</h1>
        <h1>{users.email}</h1>
      </section>
    </>
  )
}

export default App
