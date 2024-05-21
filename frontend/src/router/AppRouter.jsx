import { Route, Routes, Navigate } from 'react-router-dom';
import {adminRoutes, authenticatedRoutes, publicRoutes} from "./routes";
import {useAuth} from "../components/AuthProvider";

const renderRoutes = (routes) => {
    return routes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
    ));
};

const AppRouter = () => {
    const { user } = useAuth();

    const renderAuthenticatedRoutes = () => {
        if (user.role === "ROLE_ADMIN") {
            return renderRoutes(adminRoutes);
        } else {
            return (
                <>
                    {renderRoutes(authenticatedRoutes)}
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            );
        }
    };

    const renderPublicRoutes = () => {
        return (
            <>
                {renderRoutes(publicRoutes)}
                <Route path="/*" element={<Navigate to="/auth/log-in" />} />
            </>
        );
    };

    return (
        <Routes>
            {user ? renderAuthenticatedRoutes() : renderPublicRoutes()}
        </Routes>
    );
};

export default AppRouter;
