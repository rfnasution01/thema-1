import { TestimoniType } from '@/libs/types/testimoni-type'
import { Res, api } from '../api'
import { ListParams } from '@/libs/types/list-type'

export const TestimoniEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTestimoni: builder.query<Res<TestimoniType[]>, ListParams>({
      query: ({ page_number, page_size }) => ({
        url: `website/testimonial`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
        },
      }),
    }),
    getTestimoniId: builder.query<Res<TestimoniType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/testimonial/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
  }),
})

export const { useGetTestimoniQuery, useGetTestimoniIdQuery } =
  TestimoniEndpoints
