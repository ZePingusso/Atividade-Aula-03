import { useState } from "react"

export default function NovoUsuario ({ usuario, onSalvo, onCancelar}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)
    const [criado, setCriado] = useState(null)

     async function enviar(evento) { 
        evento.preventDefault()
        setEnviando(true)
        setErro(null)
        setCriado(null)

        const method = usuario ? 'PUT' : 'POST'
        const url = usuario 
            ? `https://jsonplaceholder.typicode.com/users/${usuario.id}`
            : 'https://jsonplaceholder.typicode.com/users' 

        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/users', 
                {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nome, email})
                })
                if (!resp.ok)
                    throw new Error(`HTTP ${resp.status}`)
                const data = await resp.json()
                setCriado(data)
                setNome('')
                setEmail('')
        } catch (e) {
            setErro(e.message)
        } finally {
            setEnviando(false)
        }
    }

    return (
        <form onSubmit={enviar}>
            <label htmlFor="nome">Nome completo</label>
            <input 
                id="nome"
                type="text"
                value={nome} 
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome completo"
                required
            />
            <label htmlFor="email">E-mail</label>
            <input
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
            />
            
            <button disabled={enviando}>Cadastrar</button>
            {enviando && <p>Enviando...</p>}
            {erro && <p>Erro: {erro}</p>}
            {criado && <p>Criado com id={criado.id} e nome={criado.name}</p>}
        </form>
    )
}