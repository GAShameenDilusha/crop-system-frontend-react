import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Field {
    id: number;
    name: string;
    // Add other field properties as needed
}

interface FieldState {
    fields: Field[];
}

const initialState: FieldState = {
    fields: []
};

const FieldSlice = createSlice({
    name: "fieldSlice",
    initialState: initialState,
    reducers: {
        addField: (state, action: PayloadAction<Field>) => {
            state.fields.push(action.payload);
            console.log(state.fields);
        }
    }
});

export const { addField } = FieldSlice.actions;
export default FieldSlice.reducer;