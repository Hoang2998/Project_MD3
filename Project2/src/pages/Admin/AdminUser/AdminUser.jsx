import React, { useEffect, useState } from 'react'
import './AdminUser.scss'
import NavAdminn from '../../../components/layout/navAdmin/NavAdminn'
import api from '../../../service/apis/api.user'
import axios from 'axios'
import instance from '../../../service/apis/baseURL'

export default function AdminUser() {
const [users,setUsers] = useState([])

useEffect(()=>{
    instance.get("/users").then((res)=>{
        setUsers(res.data.data)
    })
},[])
const changeStatus= async(id,active)=>{
    const activea = active ? 0 : 1
    console.log(activea)
    const result = await instance.put(`/usersActive/${id}`,{active : activea})
    setUsers(result.data.data[0])
}


  return (
    <>
    <NavAdminn></NavAdminn>
    <div className='AdminUser'>
        <div className='AdminUser__render'>
            <table>
                <thead>
                <th>Stt</th>
                <th>Name User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                </thead>
                <tbody>
                    {
                        users.map((item,index)=>{
                            return <tr key={index}>
                                <td>{index +1}</td>
                                <td>{item?.nameUser}</td>
                                <td>{item?.email}</td>
                                <td style={{color:item?.active?"green":"red"}} >{item?.active?"Active":"Block"}</td>
                                <td><button style={{color:item?.active?"red":"green"}} onClick={()=>changeStatus(item.idUser,item.active)} >{item?.active?"Block":"Active"}</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}
