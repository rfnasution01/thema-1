import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateHalamanType = {
  page: string
  id: string
}

const initialState: StateHalamanType = {
  page: null,
  id: null,
}

const stateHalamanSlice = createSlice({
  name: 'halaman',
  initialState,
  reducers: {
    setStateHalaman: (state, action: PayloadAction<StateHalamanType>) => {
      const { page, id } = action.payload
      state.page = page
      state.id = id
    },
  },
})

export const { setStateHalaman } = stateHalamanSlice.actions

export const getHalamanSlice = (state: { stateHalaman: StateHalamanType }) =>
  state.stateHalaman

export default stateHalamanSlice.reducer
