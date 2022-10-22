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
        }
    },
});

export const {
    addTeam,
} = teamSlice.actions;
export default teamSlice.reducer;