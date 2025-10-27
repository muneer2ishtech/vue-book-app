import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

interface SignInPayload {
    email: string;
    password: string;
}

export async function signIn(payload: SignInPayload) {
    const response = await axios.post(`${API_BASE}/auth/signin`, payload);
    return response.data; // { token: string, user: {...} }
}
