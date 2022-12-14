import "./updatePassword.css"
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { UpdateUsersPassword } from "../../Redux/Actions/User"
import swal from "sweetalert"

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const { isAuthenticated, loading } = useSelector(
    (state) => state?.Auth,
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }
  
  }, [isAuthenticated, loading, navigate])

const changePassword = () =>{
  if (oldPassword !== "" && newPassword !=="") {
    if (oldPassword !== newPassword) {
      dispatch(UpdateUsersPassword(oldPassword, newPassword))
    } else {
      swal({text:"OldPassword and NewPassword can't be same",icon:"error"})
    }
  } else {
    swal({text:"OldPassword and NewPassword are Required",icon:"error"})
  }
}
  return (
<div className="updatePassword">
  {
    loading?<>loading ...</>:<div className="updatePasswordContainer">
    <Typography variant="h3" style={{ padding: "2vmax" , color:"#155799" }}>
      Social App
    </Typography>
        <input placeholder="Old Password" value={oldPassword}   onChange={(e)=>setOldPassword(e.target.value)}  type={"password"} />
        <input placeholder="New Password" value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)} type={"password"}/>
    
            <Button onClick={changePassword}>Change Password</Button>
       
    </div>
  }

</div> 
  )
}

export default UpdatePassword