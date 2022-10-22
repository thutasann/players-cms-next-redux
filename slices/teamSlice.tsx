import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: []
    },
    reducers: {
        addTeam: (state, action ) => {
            state.team.push({
                ...action.payload
            })
        },

        removeTeam: (state, action) => {
            const index = state.team.findIndex((item) => item.name === action.payload);
            state.team.splice(index, 1);
        },


    },
});

export const {
    addTeam,
    removeTeam,
} = teamSlice.actions;
export default teamSlice.reducer;