import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function buscarPosts(){
      const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
      const dados = await resposta.json();
      setPosts(dados);
    }
    buscarPosts();
  }, []);

  return (
    <>
      <section id="center">
        {posts.map(post => (
          <li key={post.id}>{post.name} {post.email}</li>
        ))}
      </section>
    </>
  )
}

export default App
