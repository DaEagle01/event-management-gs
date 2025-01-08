import { apiSlice } from "../../app/apiSlice";
import { setLoading, setUserInfo } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `auth/profile`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                dispatch(setLoading(true));

                try {
                    const res = await queryFulfilled;
                    dispatch(setUserInfo(res?.data?.data));
                } catch (error) {
                    // dispatch(logout());
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    dispatch(setLoading(false));
                }
            },
            providesTags: ['User'],
        }),

        signup: builder.mutation({
            query: (userData) => ({
                url: 'auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const data = result?.data?.data;
                    if (data?.token) {
                        dispatch(setUserInfo(data));
                        dispatch(authApiSlice.util.invalidateTags(['User']));
                    }
                } catch (err) {
                    console.log('rtk login error', err);
                }
            }
        }),
    }),
    overrideExisting: false,
});

export const { useGetUserQuery, useSignupMutation, useLoginMutation } = authApiSlice;