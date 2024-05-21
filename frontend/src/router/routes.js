import Home from "../pages/Home";
import BookCreate from "../pages/BookCreate";
import BookRead from "../pages/BookRead";
import BookUpdate from "../pages/BookUpdate";
import LogIn from "../pages/auth/LogIn";
import SignUp from "../pages/auth/SignUp";

export const authenticatedRoutes = [
    { path: '/', element: <Home /> },
    { path: '/book/read/:bookId', element: <BookRead /> },
];

export const adminRoutes = [
    ...authenticatedRoutes,
    { path: '/book/create', element: <BookCreate /> },
    { path: '/book/update/:bookId', element: <BookUpdate /> },
];

export const publicRoutes = [
    { path: '/auth/log-in', element: <LogIn /> },
    { path: '/auth/sign-up', element: <SignUp /> },
];
