
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class ApiError extends Error {
    constructor(status, statusText) {
        super(`HTTP ${status} ${statusText}`);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function requisicao(caminho, opcoes = {}) {
    const url = `${BASE_URL}${caminho}`;

    const configuracoes = {
        ...opcoes,
        headers: {
            'Content-Type': 'application/json',
            ...opcoes.headers,
        },
    };

    if (opcoes.body) {
        configuracoes.body = JSON.stringify(opcoes.body);
    }

    const resp = await fetch(url, configuracoes);

    if (!resp.ok) {
        throw new ApiError(resp.status, resp.statusText);
    }

    if (resp.status === 204) {
        return null;
    }

    return await resp.json();
}

export async function apiGet(caminho, opcoes = {}) {
    return requisicao(caminho, { ...opcoes, method: 'GET' });
}

export async function apiPost(caminho, body, opcoes = {}) {
    return requisicao(caminho, { ...opcoes, method: 'POST', body });
}

export async function apiPut(caminho, body, opcoes = {}) {
    return requisicao(caminho, { ...opcoes, method: 'PUT', body });
}

export async function apiDelete(caminho, opcoes = {}) {
    return requisicao(caminho, { ...opcoes, method: 'DELETE' });
}

export { BASE_URL, requisicao };
