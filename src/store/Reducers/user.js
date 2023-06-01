import { createSlice } from '@reduxjs/toolkit';

const initUserState = {
    login: false,
    user: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        CHANGE_LOGIN(state, action) {
            state.login = action.payload
        },
        UPDATE_USER(state, action) {
            state.user = action.payload
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice; 