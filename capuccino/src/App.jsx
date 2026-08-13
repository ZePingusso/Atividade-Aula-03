import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function buscarUsers(){
      const resposta = await fetch("https://reqres.in/api/users?page=2");
      const dados = await resposta.json();
      setUsers(dados.data);
    }
    buscarUsers();
  }, []);

  return (
    <>
      <section id="center">
        {users.map(user => (
          <li key={user.id}>{user.first_name}, {user.last_name}, {user.email}</li>
        ))}
      </section>
    </>
  )
}

export default App
