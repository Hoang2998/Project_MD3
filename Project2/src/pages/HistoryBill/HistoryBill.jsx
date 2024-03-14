import React, { useEffect, useState } from 'react'
import "./HistoryBill.scss"

import { useDispatch,useSelector} from 'react-redux'
import {getAllBills} from "../../store/Bill"
import axios from 'axios'
import apis from "../../service/apis/api.user.js";
import { GrPrevious,GrNext  } from "react-icons/gr";
import NavStore from '../../components/layout/navStore/NavStore.jsx'
import privateAxios from '../../../config/Axios.js'
import instance from '../../service/apis/baseURL.js'
export default function HistoryBill() {
  const [billRender,setBillRender] = useState([]);
  const [billPana,setBillPana] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPage,setTotalPage] = useState([])
  const [billDetail,setBillDetail]= useState([])
  const distPatch=useDispatch();
//    distPatch(getAllBills())
    const bills = useSelector(res => res.billsReducer.bills)
    // console.log(bills);

    useEffect(()=>{
        const result = privateAxios.get("/getTickets")
        .then(res=>{
        // console.log(res.data.data[0])
        setBillRender(res.data.data[0])
        }
        )
        
    },[])
    useEffect(()=>{
        let arr = []
        let arr2 =[]
        const currentPerPage = 6
        const start = (currentPage - 1)*currentPerPage
        let end = currentPage* currentPerPage
        for(let i =0 ;i<Math.ceil( billRender.length/currentPerPage);i++){
            arr2.push(i)
        }
        setTotalPage(arr2)
        if( end > billRender.length){
           end = billRender.length
        }
        for(let i = start ; i<end;i++){
            arr.push(billRender[i])
        }
        console.log(arr);
        setBillPana(arr)
    },[currentPage,billRender,bills])
    const nextPage=()=>{

        if(currentPage >= totalPage.length){
            setCurrentPage(1)
        }else{
            setCurrentPage(currentPage+1)
        }
    }
    const prePage=()=>{

        if(currentPage < totalPage.length){
            setCurrentPage(totalPage.length)
        }else{
            setCurrentPage(currentPage-1)
        }
    }

    const [openDetail,setOpenDetail] = useState("0vh")
    const [totalDetail,settotalDetail] = useState("0")
    const showDetail=async(id)=>{
        setOpenDetail("90vh")
       const result = await instance.get(`/getTicketDetail?idTicket=${id}`)
       console.log(result.data.data[0]);
       setBillDetail(result.data.data[0])
        // setBillDetail(arr)
    }
  return (
    <>
    <NavStore></NavStore>
    <div className='historyBill'>
        <div className='historyBill__render'>
            <h1>History Bill</h1>
            <div className='historyBill__render__table'>
                <table style={{width:"100%"}}>
                <thead >
                    <th>Stt</th>
                    <th>ID Ticket</th>
                    <th>Date Buy</th>
                    <th>Detail</th>
                    {/* <th>Status</th> */}
                </thead>
                <tbody>
                    {
                        billPana?.map((item,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td style={{width:"60px"}}>{item?.idTicket}</td>
                                <td>{item?.dateBuy}</td>
                                <td className='seeDetail' onClick={()=>{showDetail(item.idTicket)}} > See Detail</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            {/* phan trang */}
            <div className='historyBill--pana'>
                    <GrPrevious onClick={prePage}></GrPrevious>
                    {
                       totalPage?.map((item)=>{
                        return <div  onClick={()=>{setCurrentPage(item+1)}}>{item}</div>
                       })
                    }
                   <GrNext onClick={nextPage}></GrNext>
            </div>
            
            <div className='historyBill__detail' style={{height:openDetail}}>
                    <h1>Detail Bill</h1>
                    <p> <span>Name:</span>  {billDetail[0]?.nameUser}</p>
                    <p><span>IdTicket:</span> {billDetail[0]?.idTicket}</p>
                    <p><span>Date Buy:</span>  {billDetail[0]?.dateBuy.split("-").reverse().join("/")}</p>
                    <div>
                        <table>
                            <thead>
                                <th>STT</th>
                                <th>Movie</th>
                                <th>Chair-Room</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Price</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{billDetail[0]?.nameFilm}</td>
                                    <td>{billDetail[0]?.idChair}-{billDetail[0]?.nameRoom}</td>
                                    <td>{billDetail[0]?.showTimeAt}</td>
                                    <td>{billDetail[0]?.date}</td>
                                    <td>{(+billDetail[0]?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    
                                   
                                </tr>
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                        </table>
                    </div>
                    <button onClick={()=>{setOpenDetail("0vh")}}>Close</button>
            </div>
        </div>
    </div>
    </>
  )
}
