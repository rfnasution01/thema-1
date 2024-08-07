import { BeritaTerbaruType } from '@/libs/types/beranda-type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Meta = {
  page?: number
  limit?: number
  count?: number
  total?: number
  last_page?: number
}

export type Res<T, M = undefined> = {
  status: boolean
  message: string
  data: T
  related: T
  meta: Meta
  mapped?: M
  berita_terbaru?: BeritaTerbaruType[]
}

const baseURL = import.meta.env.VITE_BASE_URL
const baseToken = import.meta.env.VITE_BASE_TOKEN

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = baseToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['chat'],
  // * it's okay to disable eslint here, because the warning is unnecessary. Each endpoint will be injected from an api slice.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})
