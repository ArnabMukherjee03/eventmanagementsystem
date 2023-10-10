import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectStatus, selectRole } from "../features/auth/authSlice";

import { MutatingDots } from "react-loader-spinner";


const User = ({ children }) =>{
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  
 
 
    if(user && role==="user") {
      navigate("/user")
    }

    if(user && role==="vendor") {
      navigate("/vendor")
    }




  
    if (status === "loading") {
      return (
        <div className="h-screen flex items-center justify-center">
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      );
    }
 
  
 
  
 
  
  return children;
}

export default User;
