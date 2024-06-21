import { Res, api } from '../api'
import { ProfilType } from '@/libs/types/profil-type'

export const ProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfil: builder.query<Res<ProfilType>, void>({
      query: () => ({
        url: `website/profil`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProfilQuery } = ProfilEndpoints
