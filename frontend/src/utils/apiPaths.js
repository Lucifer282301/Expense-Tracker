export const BASE_URL = "https://expense-tracker-backend-rv74.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/addIncome",
    GET_ALL_INCOME: "/api/v1/income/getAllIncome",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadIncomeExcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/addExpense",
    GET_ALL_EXPENSE: "/api/v1/expense/getAllExpense",
    DELETE_EXPENSE: (expenseId) => `/api/v1/income/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadExpenseExcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
