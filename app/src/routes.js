import { LOGIN_ROUTE } from "./utils/consts";


export const PublickRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
];

export const PrivateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
];
