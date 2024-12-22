import React, { useContext } from 'react';

import { Navigate} from 'react-router-dom';
import Loader from '../../components/Loader';
import { AuthContext } from '../context/AuthContextProvider';

const PrivateRoute = ({children}) => {
const {user, loader, setLoader} = useContext(AuthContext)


if(loader){
  return <div className='min-h-[calc(100dvh-430px)] flex items-center justify-center mx-auto w-full'><Loader></Loader> </div>
}
  if(user){

    return <div >{children}</div>
  }else{
    return (
      <div>
        {
          <Navigate  to='/login'></Navigate>
        }
      </div>
    );
  }
};

export default PrivateRoute;