import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../util/API_URL";


const handleAddMemberData = createAsyncThunk('handleAddMemberData', async(formdata) =>{
    const response = await axios.post(`${API_URL}/member`, formdata);
    if(response.data?.status === 200){
        return formdata;
    } else {
        return 
    }
});

const handleDeleteMember = createAsyncThunk('handleDeleteMember', async(user) =>{
    const response = await axios.delete(`${API_URL}/member/${user?.member_email}`)
    if(response.data.status === 200) {
        return user
    } else {
        return
    }
});

const handleManageTags = createAsyncThunk('handleManageTags', async(formData) =>{
    const response = await axios.post(`${API_URL}/manage-tags`, formData)
    if(response.data.status === 200) {
        return formData;
    } else {
        return
    }
});

const handleGetAllData = createAsyncThunk('handleGetAllData', async() =>{
    const response = await axios.get(`${API_URL}/member`)
    return response.data || [];
})

const handleAddBankData = createAsyncThunk('handleAddBankData', async(formData)=>{
    const response = await axios.post(`${API_URL}/bank`, formData);
    if(response.data?.status === 200) {
        return formData;
    } else { 
        return
    }
});

const handleData = createAsyncThunk('handleData', async(formData) =>{
    // console.log(formData)
    const response = await axios.post(`${API_URL}/data`, formData);
    if(response.data.status === 200) {
        return formData;
    } else {
        return 
    }
}); 



const initialState = {
    member : [],
    bank : [],
    manageTags : [],
    isError : false,
    isFullfilled : false,
}

const AdminDataSlice = createSlice({
    name : 'adminData',
    initialState,
    reducers : {
        resetState : (state) =>{
            state.isError = false;
            state.isFullfilled = false;
        },
        // handleMemberSearch : (state, action)
    },
    extraReducers : builder =>{
        builder.addCase(handleAddMemberData.fulfilled, (state, action) =>{
            if(action?.payload) {
                state.member?.push(action.payload);
                state.isFullfilled = true;
            } else {
                state.isError = true
            }
        });
        builder.addCase(handleGetAllData.fulfilled, (state, action) =>{
            state.member = action.payload?.memberData;
            state.bank = action.payload?.bankData;
            state.manageTags = action.payload?.manageTags;
        });
        builder.addCase(handleAddBankData.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.bank?.push(action.payload);
                state.isFullfilled = true;
            } else {
                state.isError = true
            }
        });
        builder.addCase(handleManageTags.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.manageTags?.push(action.payload);
                state.isFullfilled = true;
            } else {
                state.isError = true
            }
        });
        builder.addCase(handleDeleteMember.fulfilled, (state, action)=>{
            if(action?.payload) {
                state.member = state.member?.filter(value => value?.member_email != action.payload.member_email)
                state.isFullfilled = true;
            } else {
                state.isError = true
            }
        });
    }
})

export default AdminDataSlice.reducer;
export  {handleAddMemberData, handleGetAllData, handleAddBankData, handleManageTags, handleData, handleDeleteMember};
export const {resetState} = AdminDataSlice.actions
