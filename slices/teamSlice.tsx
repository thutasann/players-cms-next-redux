import { createSlice } from "@reduxjs/toolkit";


const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: [],
    },
    reducers: {
        addTeam: (state, action ) => {
            const itemExits = state.team.find((item) => item.name === action.payload.name);
            if(itemExits){
                alert(`Team ${action.payload.name} is already added`);
            }
            else{
                state.team.push({
                    ...action.payload
                });
                // state.players.push(action.payload.player)
            }
        },

        updateTeam: (state, action,) => {

            const index = state.team.findIndex((item) => item.name === action.payload.name);
            state.team.splice(index, 1);

            state.team.push({
                ...action.payload
            })
            
        },

        removeTeam: (state, action) => {
            const index = state.team.findIndex((item) => item.name === action.payload);
            state.team.splice(index, 1);
        },

        removePlayer: (state, action) => {
            const index = state.team.map((t) => t.player.findIndex((p) => p.value === action.payload))
            state.team.map((t) => {
                t.player.splice(index, 1);
                t.playerCount--;
            });
        }

    },
});

export const {
    addTeam,
    removeTeam,
    updateTeam,
    removePlayer
} = teamSlice.actions;
export default teamSlice.reducer;