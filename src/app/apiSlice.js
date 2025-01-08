import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/authentication/authSlice';

const baseQuery = fetchBaseQuery({
    mode: 'cors',
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken || localStorage.getItem('accessToken');

        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } 
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
           /*  api.dispatch(logout());
            localStorage.clear(); */
        }
        return result;
    },
    endpoints: () => ({}),
});
