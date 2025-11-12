
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from "../common/LoadingSpinner"
import Home from "../../pages/Home"
import Chat from "../../pages/Chat"

export default function AppRouter() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return isAuthenticated ? <Chat /> : <Home />;
}