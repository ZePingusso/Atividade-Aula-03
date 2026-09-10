import { useState } from 'react'

function NovoUsuario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)
  const [criado, setCriado] = useState(null)  // recurso recém-criado

  async function enviar(e) {
    e.preventDefault()  // impede o reload da página
    setEnviando(true)
    setErro(null)
    setCriado(null)
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email: email }),
      })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const data = await resp.json()
      setCriado(data)        // mostra o recurso criado
      setNome('')            // limpa o formulario
      setEmail('')
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar}>
      <h2>Novo usuario</h2>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <button disabled={enviando}>Cadastrar</button>
      {enviando && <p>Enviando...</p>}
      {erro && <p>Erro: {erro}</p>}
      {criado && <p> Criado com id={criado.id} e nome={criado.name}.</p>}
    </form>
  )
}

export default NovoUsuario