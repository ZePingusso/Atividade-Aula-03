
export default function ListaUsuarios({
    usuarios,
    onExcluir,
    onEditar,
    excluindoId,
}) {
    return (
        <div className="user-list">
            {usuarios.map((usuario) => (
                <article className="user-card" key={usuario.id}>
                    <div className="user-info">
                        <h3>{usuario.name ?? usuario.nome}</h3>
                        <p>{usuario.email}</p>
                    </div>

                    <div className="user-actions">
                        <button
                            type="button"
                            className="button-secondary"
                            onClick={() => onEditar(usuario)}
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            onClick={() => onExcluir(usuario.id)}
                            disabled={excluindoId === usuario.id}
                        >
                            {excluindoId === usuario.id
                                ? 'Excluindo...'
                                : 'Excluir'}
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
