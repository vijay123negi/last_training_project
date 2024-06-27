import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./loginSlice";
import associateSlice from "./associateSlice";
import agentSlice from "./agentSlice";
import updateSlice from "./updateSlice";
import addSlice from "./addSlice";
import deleteSlice from "./deleteSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        associate: associateSlice.reducer,
        agent: agentSlice.reducer,
        update: updateSlice.reducer,
        add: addSlice.reducer,
        delete: deleteSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;