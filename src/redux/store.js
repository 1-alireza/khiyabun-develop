import {configureStore} from "@reduxjs/toolkit";
import storage from "@react-native-async-storage/async-storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import themeReducer from "./slices/themeSlice";
import loginReducer from "./slices/loginSlice";
import languageReducer from "./slices/languageSlice";
import profileReducer from "./slices/profileSlice";

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, loginReducer);

const store = configureStore({
    reducer: {
        theme: themeReducer,
        login: loginReducer,
        language: languageReducer,
        profile: profileReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// export const persistor = persistStore(store);
export default store;
