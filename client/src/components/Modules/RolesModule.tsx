import { useDispatch, useSelector } from "react-redux"
import { getAllRoles } from "../../Redux/AsyncThunk/RoleThunk"
import { getRoleState } from "../../Redux/Slice/RoleSlice"
import { AppDispatchType } from "../../Redux/Store";
import { useEffect } from "react";
import { RoleType } from "../../types";


const RolesModule = () => {
  const { datas, action } = useSelector(getRoleState);
  const dispatch: AppDispatchType = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles())
  }, [dispatch]);


  return (
    <div>
      {
        datas.map( ( data: RoleType ) => 
          <div>{ data.nom_role } </div>
        )
      }
    </div>
  )
}

export default RolesModule