import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const ProtectedRoute = ({ children }) => {
    const location = useLocation()
    const { isAuthenticated, loading } = useAuthStore()



    return children
}

export default ProtectedRoute