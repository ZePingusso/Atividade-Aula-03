import { useState } from "react"
    async function Atualizando(id, novosDados) {
        const [setEditando] = useState(false)
        const [setErro] = useState(false)
        const [setEditado] = useState(null)
        e.preventDefault()  // impede o reload da página
        setEditando(true)
        setErro(null)
        setEditado(null)
    try {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosDados),
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = await resp.json()
    setEditado(data)
    } catch (error) {
        setErro(error.message)
    } finally {
        setEditando(false)
    }
}

export default Atualizando()