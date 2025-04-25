// store/accountSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountService } from '../services/accountService';

export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAll',
    async (userId, { rejectWithValue }) => {
        try {
            return await AccountService.getUserAccounts(userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default accountSlice.reducer;
