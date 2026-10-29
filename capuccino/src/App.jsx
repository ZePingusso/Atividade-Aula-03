
import { useEffect, useState } from 'react';
import ListaUsuarios from './components/listaUsuario.jsx';
import FormUsuario from './components/formulario.jsx';
import { apiGet, apiDelete, ApiError } from './api.js';

export default function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [editando, setEditando] = useState(null);
    const [excluindoId, setExcluindoId] = useState(null);
    function mensagemErro(erro) {
        if (erro instanceof ApiError) {
            if (erro.status === 404) {
                return 'Recurso não encontrado';
            }

            if (erro.status === 500) {
                return 'Erro no servidor';
            }
        }

        if (erro instanceof TypeError) {
            return 'Falha de rede';
        }

        return erro.message || 'Ocorreu um erro inesperado';
    }
    useEffect(() => {
        const controle = new AbortController();

        async function buscar() {
            try {
                setCarregando(true);
                setErro(null);

                const data = await apiGet('/users', {
                    signal: controle.signal,
                });

                setUsuarios(data);
            } catch (e) {
                if (e.name === 'AbortError') {
                    return;
                }

                setErro(mensagemErro(e));
            } finally {
                if (!controle.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscar();

        return () => {
            controle.abort();
        };
    }, []);

    async function excluirUsuario(id) {
        await apiDelete(`/users/${id}`);
    }

    async function tentarExcluir(id) {
        const usuariosAnteriores = usuarios;

        setExcluindoId(id);
        setErro(null);
        setUsuarios(usuariosAnteriores.filter((u) => u.id !== id));

        try {
            await excluirUsuario(id);
        } catch (e) {
            setUsuarios(usuariosAnteriores);
            setErro(mensagemErro(e));
        } finally {
            setExcluindoId(null);
        }
    }

    function editarUsuario(usuario) {
        setEditando(usuario);
    }

    function usuarioSalvo(usuarioSalvo) {
        setUsuarios((atuais) =>
            usuarioSalvo.id
                ? atuais.some((u) => u.id === usuarioSalvo.id)
                    ? atuais.map((u) =>
                        u.id === usuarioSalvo.id ? usuarioSalvo : u
                    )
                    : [...atuais, usuarioSalvo]
                : atuais
        );

        setEditando(null);
    }

    return (
        <div className="app-shell">
            <header className="app-header">
                <div>
                    <p className="eyebrow">Painel de administração</p>
                    <h1>Usuários</h1>
                    <p className="subtitle">
                        Cadastre, edite e acompanhe os usuários da aplicação.
                    </p>
                </div>

                <span
                    className="counter"
                    aria-label={`${usuarios.length} usuários cadastrados`}
                >
                    {usuarios.length}{' '}
                    {usuarios.length === 1 ? 'usuário' : 'usuários'}
                </span>
            </header>

            <main className="content-grid">
                <section className="form-panel" aria-labelledby="form-title">
                    <h2 id="form-title">
                        {editando ? 'Editar usuário' : 'Novo usuário'}
                    </h2>

                    <FormUsuario
                        key={editando?.id ?? 'novo'}
                        usuario={editando}
                        onSalvo={usuarioSalvo}
                        onCancelar={() => setEditando(null)}
                    />
                </section>

                <section className="list-panel" aria-labelledby="list-title">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Diretório</p>
                            <h2 id="list-title">Usuários cadastrados</h2>
                        </div>

                        {carregando && (
                            <span className="status">Carregando...</span>
                        )}
                    </div>

                    {erro && (
                        <p
                            className="feedback feedback-error"
                            role="alert"
                        >
                            Erro: {erro}
                        </p>
                    )}

                    {!carregando && !erro && usuarios.length === 0 && (
                        <p className="empty-state">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    <ListaUsuarios
                        usuarios={usuarios}
                        onExcluir={tentarExcluir}
                        onEditar={editarUsuario}
                        excluindoId={excluindoId}
                    />
                </section>
            </main>
        </div>
    );
}
