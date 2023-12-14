import { configureStore } from "@reduxjs/toolkit";
import { adminuserReducer, employeAddReducer } from "./Slice";
import { employeeListReducer } from "./Slice";
export const Store=configureStore({
    reducer: {
        adminuser: adminuserReducer,
        employeAdd: employeAddReducer, 
        employeeList:employeeListReducer
      },
})