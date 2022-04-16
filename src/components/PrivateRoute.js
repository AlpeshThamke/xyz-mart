import {Navigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const PrivateRoute = ({children})=>{
    const {user} = useUserAuth();
    if(!user)
    {
        return <Navigate to='/' />
    }
    return children;
}

export default PrivateRoute;