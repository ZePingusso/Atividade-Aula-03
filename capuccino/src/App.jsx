import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function buscarPosts(){
      const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dados = await resposta.json();
      setPosts(dados);
    }
    buscarPosts();
  }, []);

  return (
    <>
      <section id="center">
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </section>
    </>
  )
}

export default App
