import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  user: null,
  error: null,
  isSuccess: "",
  status: 'idle',
  employees: [], 
};
export const admin = createAsyncThunk("user/signupUser", async (userData) => {
  try {
    const response = await axios.post("http://65.0.17.17:3000/user/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const login = createAsyncThunk("user/loginuser", async (userData) => {
  try {
    const response = await axios.post("http://65.0.17.17:3000/user/login", userData);
    console.log("sourav ", response); 
    console.log("sourav2",response.data)
    if(response !== ""){
      localStorage.setItem("userData.", JSON.stringify(response.data.user));
      return response.data;
    
    }
    else console.log("User not found");
  } catch (error) {
    throw error;
  }
});

export const employe = createAsyncThunk("user/employe", async (userData) => {
  try {
    const response = await axios.post("http://65.0.17.17:3000/employe/Add", userData,{
     
    });
  if (response.ok){
    getAllEmployees();
  }
   
    return response.data;
    
  
  } catch (error) {
    throw error;
  }

 
});
export const deleteEmployeeById = createAsyncThunk("employees/deleteEmployeeById", async (id) => {
  try {
    const response = await axios.delete(`http://65.0.17.17:3000/employe/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const UpdateEmployee = createAsyncThunk("employees/updateEmployee", async (employeeData) => {

  try {
    console.log('here', employeeData);
    const response = await axios.put(`http://65.0.17.17:3000/employe/${employeeData.id}`, {...employeeData});
    if (response.ok){
      getAllEmployees();
    }
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getAllEmployees = createAsyncThunk("employees/getAllEmployees", async () => {
  
    const response = await fetch("http://65.0.17.17:3000/employe/allemploye");
    const data = await response.json();
    return data;
 
});



const adminuser = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(admin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(admin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSuccess = "Success";
    });
    builder.addCase(admin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const employeAdd = createSlice({
  name: "employe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(employe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(employe.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // You might want to update this to a different property like state.employe
      state.isSuccess = "Success";
    });
    builder.addCase(employe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(UpdateEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateEmployee.fulfilled, (state, action) => {
      state.loading = false;
      // Update the specific employee in the state. You need to identify the employee to update, for example, by ID.
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
      state.isSuccess = "Success";
    });
    builder.addCase(UpdateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const employeeList = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.isSuccess = "Success";
    });
    builder.addCase(getAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export const { reducer: adminuserReducer } = adminuser;
export const { reducer: employeAddReducer } = employeAdd;
export const { reducer: employeeListReducer } = employeeList;