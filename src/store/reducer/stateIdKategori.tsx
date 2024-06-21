import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateKategoriType = {
  page: string
  id: string
}

const initialState: StateKategoriType = {
  page: null,
  id: null,
}

const stateKategoriSlice = createSlice({
  name: 'kategori',
  initialState,
  reducers: {
    setStateKategori: (state, action: PayloadAction<StateKategoriType>) => {
      const { page, id } = action.payload
      state.page = page
      state.id = id
    },
  },
})

export const { setStateKategori } = stateKategoriSlice.actions

export const getKategoriSlice = (state: { stateKategori: StateKategoriType }) =>
  state.stateKategori

export default stateKategoriSlice.reducer
