import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { apiSlice } from '../../../app/apiSlice';
import authReducer from '../../../features/authentication/authSlice';
import NotificationProvider from "../../../contexts/NotificationContext"

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = configureStore({
            reducer: {
                auth: authReducer,
                [apiSlice.reducerPath]: apiSlice.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(apiSlice.middleware),
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </BrowserRouter>
            </Provider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const wrapper = ({ children }) => {
    const store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    });

    return (
        <Provider store={store}>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </Provider>
    );
};

export * from '@testing-library/react'