import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authslice from "./authSlice";
import productsSlice from "./productsSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderSlice from "./orderSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    products: productsSlice.reducer,
    auth: authslice.reducer,
    users: userSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
export default store;