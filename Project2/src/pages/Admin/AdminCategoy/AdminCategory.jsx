import React, { useState } from 'react'
import './AdminCategory.scss'
import NavAdminn from '../../../components/layout/navAdmin/NavAdminn'
import { useEffect } from 'react'
import axios from 'axios'
import instance from '../../../service/apis/baseURL'
import privateAxios from '../../../../config/Axios'
export default function AdminCategory() {
  const [categorys,setCategory] = useState([])
const [flag,setFlag] = useState(0)
  const uuid=()=>{
    return Math.floor(Math.random()*999999)
  }
  const [ newCategory,setNewCategory] = useState({
    name:"",
    status:1,
  })
  
  useEffect(()=>{
    instance.get('/category').then((res)=>{
      setCategory(res.data.data[0])
    })
  },[])
  
  const addNewCategory = async()=>{
    try {
      if(newCategory.name != ""){
        const result = await privateAxios.post('/addCategory',newCategory)
        setCategory(result.data.data[0])
        setNewCategory({
         name:"",
         status:1,
        })
     }
    } catch (error) {
      console.log(error)
    }
    
  }
  const changeStatus = (index,id)=>{
    let arr = [...categorys]
    if(arr[index].status == 1){
        arr[index].status = 0
    }else{
        arr[index].status = 1
    }
    setCategory(arr)
    axios.put(`http://localhost:8008/category/${id}`,arr[index])
  }
  return (
    <>
        <NavAdminn></NavAdminn>
        <div className='adminCategory'>
            <div className='adminCategory__render'>
                <div>
                    <button onClick={addNewCategory}>Add New Category</button>
                    <input type="text" onChange={(e)=>{ 
                        newCategory.name = e.target.value
                        setNewCategory({...newCategory,name:e.target.value})}} value={newCategory.name} />
                    <table>
                        <thead>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                categorys?.map((item,index)=>{
                                    return <tr key={index}>
                                        <td>{index +1}</td>
                                        <td>{item.name}</td>
                                        <td style={{color:item.status?"green":"red"}}>{item.status?"Active":"Block"}</td>
                                        <td><button style={{color:item.status?"red":"green"}} onClick={()=>changeStatus(index,item.id)}>{item.status?"Block":"Active"}</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}
