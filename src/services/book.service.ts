import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

export interface Book {
    id?: number
    name: string
    author: string
    year: number
    price: number
}

function createAxios(token: string) {
    return axios.create({
        baseURL: `${API_BASE}/books`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function getBooks(token: string, params?: any) {
    return createAxios(token).get('', { params })
}

export function getBookById(token: string, id: number) {
    return createAxios(token).get(`/${id}`)
}

export function createBook(token: string, book: Book) {
    return createAxios(token).post('', book)
}

export function updateBook(token: string, id: number, book: Book) {
    return createAxios(token).put(`/${id}`, book)
}

export function deleteBook(token: string, id: number) {
    return createAxios(token).delete(`/${id}`)
}
