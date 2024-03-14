import React, { useState,useRef } from 'react'
import NavAdminn from '../../../components/layout/navAdmin/NavAdminn'
import './AdminBill.scss'
import { useEffect } from 'react'
import axios from 'axios'
import instance from '../../../service/apis/baseURL'


export default function AdminBills() {
  const [films, setFilms] = useState([])
  const [dayShowFilm, setDayShowFilm] = useState([])
  const [room, setRoom] = useState([])
  const [time, setTime] = useState([])
  const [arrShowTime, setArrShowTime] = useState([])
  const [allShowTime, setallShowTime] = useState([])
  const [duration, setDuration] = useState("")
  const [shotime, setShotime] = useState({
    idFilm: "",
    idRoom: "",
    date: "",
    duration: "",
    // idShowTime: "",
  })
 useEffect(() => {
   instance.get("/filmsSetup").then((res) => {
     setFilms(res.data.data);
   })
  const now1 = new Date();
  let arr = []
  for(let i = 0;i<5;i++){
    const day = new Date(now1)
    day.setDate(now1.getDate() + i)
    arr.push(day.toISOString().split('T')[0])
    }
  setDayShowFilm(arr)
   instance.get("/getRoom").then((res) => {
    //  console.log(res.data.data);
     setRoom(res.data.data);
   })
   instance.get("/getShowTime").then((res) => {
     setTime(res.data.data);
   })
   instance.get("/getAllDayShowTime").then((res) => {
    console.log(res.data.data)
     setallShowTime(res.data.data)
   })
 },[])
 const changeValue = async(e) => {
  if(e.target.name == "date"){
    console.log(e.target.value)
    const result = await instance.get(`/getFilmChoose?d=${e.target.value}`)
    setFilms(result.data.data)
    setShotime({
      ...shotime,
      date: e.target.value,
    })
    return

  }
   if(e.target.name == "idFilm"){
    const result = await instance.get(`/getFilmSetup/${e.target.value}`)
    setDuration(result.data.data[0].duration)
    setShotime({
      ...shotime,
      idFilm: e.target.value,
      duration: result.data.data[0].duration,
    })
    return
   }
  //  console.log(e.target.value)
   console.log(shotime)
   setShotime({
     ...shotime,
     [e.target.name]: e.target.value,
   })
   
    // if( shotime.idRoom && shotime.date){
    //   console.log(shotime.idRoom,shotime.date)
    // const result = await instance.post(`/checkShowTime`,{room:shotime.idRoom,date:shotime.date}) 

    // }

 }
 const addNewShowTime = async(show,index) => {
  
   const arr = [...arrShowTime]
   if(shotime.idFilm && shotime.idRoom && shotime.date){
    // console.log(index)
    let endtime = (+duration.split(":")[0] + 1 ) * 2 + index
    if(endtime > 24){
      endtime = 25
    }
    if (arr[0] == "") return
      const check = arr.findIndex((item) => +item?.showTime - 1 == index)
      // console.log(check)
      if (check != -1) {
        arr.splice(check, 1)
        setArrShowTime(arr)
        // let endtime = (+duration.split(":")[0] + 1 ) * 2 + index
        // console.log(endtime)
        
        console.log(endtime)
        document.getElementsByClassName(`btn1`)[index].style.backgroundColor = 'black'
        for(let i = index+1;i<= endtime ;i++){
            document.getElementsByClassName(`btn2`)[i].style.zIndex = '1'
        }  
        return
      }
      const arrNew = arr.filter((item) => +item.showTime - 1 > index)
      // console.log(arrNew)
      const result = arrNew.findIndex((item) => +item?.showTime - 1 - index <= endtime)
      const result2 = arrNew[result]?.showTime - 1
      console.log(result2)
      if(result2){
        arr.splice(result, 1)
        setArrShowTime(arr)
        const endtimea = (+duration.split(":")[0] + 1 ) * 2 + result2
        document.getElementsByClassName(`btn1`)[result2].style.backgroundColor = 'black'
        for(let i = result2;i< endtimea ;i++){
            document.getElementsByClassName(`btn2`)[i].style.zIndex = '1'
        }  
      }
    document.getElementsByClassName(`btn1`)[index].style.backgroundColor = 'red'
    if(endtime > 24){
      endtime = 25
      // console.log(endtime)
    }
    for(let i = index+1;i< endtime ;i++){
    document.getElementsByClassName(`btn2`)[i].style.zIndex = '0'
   }
    arr.push({...shotime,showTime:show})
    setArrShowTime(arr)
    console.log(arr)
   }else{
    alert("vui long nhap thong tin")
   }
 }
 const addShowTime = async() => {
  console.log(arrShowTime)
 
   const result = await instance.post("/addShowTime",{data:arrShowTime})
   setallShowTime(result.data.data)
   checkShowTime()
 }
 const checkShowTime = async() => {
  document.getElementsByClassName(`table__time`)[0].style.height = '35vh'
   console.log(shotime.idRoom,shotime.date)
   const result = await instance.post("/checkShowTime",{room:shotime.idRoom,date:shotime.date})
   setArrShowTime(result.data.data)
   console.log(result.data.data)
   for(let i = 0;i<=24;i++){
    document.getElementsByClassName(`btn1`)[i].style.backgroundColor = 'black'
    document.getElementsByClassName(`btn2`)[i].style.zIndex = '1'
   }
   if(result.data.data[0] == undefined){
    // console.log("111111")
    for(let i = 0;i<24;i++){
      document.getElementsByClassName(`btn1`)[i].style.backgroundColor = 'black'
      document.getElementsByClassName(`btn2`)[i].style.zIndex = '1'
     }
     return
   }
  //  console.log(result.data.data[0].idShowTime)
   for(let i = 0;i<=24;i++){
    for (let j = 0; j < result.data.data.length; j++) {
      if(i == +result.data.data[j].idShowTime - 1){
        let endTime = (+result.data.data[j].duration.split(":")[0] +1) * 2 + i
        console.log(endTime)
        console.log(result.data.data[j].idShowTime - 1)
        console.log(result.data.data[j].duration.split(":")[0])
        document.getElementsByClassName(`btn1`)[i].style.backgroundColor = 'red'
        document.getElementsByClassName(`btn2`)[i].style.zIndex = '0'
        for(let k = result.data.data[j].idShowTime;k< endTime ;k++){
          document.getElementsByClassName(`btn2`)[k].style.zIndex = '0'
         }
      }
      }
    }
   
 }
  return (
    <>
    <NavAdminn></NavAdminn>
    {/* <div style={{position:"absolute",width:"100vw",height:"35px",zIndex:"100"}} >
        <div className="admin__bar2__input" onClick={openfinda}>
          <input
            type="text"
            style={{ width: openfind }}
            className="admin__bar2--input"
            onChange={(e)=>{debound(changeValueFind,e)}}
            placeholder="Tìm kiếm theo Id"
          />
          <SiIconfinder
            style={{
              position: "absolute",
              right: "10px",
              top: "8px",
              color: "brown",
            }}
          ></SiIconfinder>
        </div>
        <div
          style={{ visibility: closeIn.current }}
          className="admin__bar2__inputClose"
          onClick={closefinda}
        >
          X
        </div>
      </div> */}
    <div className='AdminBills'>
        <div className='AdminBills__render'>
          <div className='table__setUp'>
          <div>
              <label htmlFor="">Ngày chếu phim :</label>
              <br />
              <select name="date" id="" onChange={(e)=>{changeValue(e)}}>
                <option value="">Chọn Ngày</option>
                {
                  dayShowFilm.map((item,index)=>{
                    return <option value={item}>{item}</option>
                  })
                }
              </select>
            </div>

          <div>
              <label htmlFor="">Phim:</label>
              <br />
              <select name="idFilm" id="" onChange={(e)=>{changeValue(e)}}>
                <option value="">Chọn Phim</option>
                {
                  films?.map((item)=>{
                    return <option value={item.idFilm}>{item.nameFilm}/{item.releaseDate}/{item.duration} h</option>
                  })
                }
              </select>
            </div>

            

            <div>
              <label htmlFor=""> phong chieu :</label>
              <br />
              <select name="idRoom" id="" onChange={(e)=>{changeValue(e)}}>
                <option value="">Chọn Phòng</option>
                {
                  room?.map((item)=>{
                    return <option value={item.idRoom}>{item.nameRoom}</option>
                  })
                }
              </select>
            </div>
            <div><button className='btn3' onClick={checkShowTime}>Check ShowTime</button></div>
            <div className='table__time' >
              <label htmlFor=""> Gio chieu :</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:"10px"}}>
                {
                  time?.map((item,index)=>{
                    return <div className='btn1'><button className='btn2' value={item.idTime} onClick={()=>{addNewShowTime(item.idTime,index)}}>{item.showTimeAt}</button></div> 
                  })
                }
              </div>
            </div>
            <div>
            <button className='btn3' onClick={addShowTime}>ADD SHOW TIME</button>
            </div>
          </div>
          <div className='table__showtime'>
            <h1>Show Film</h1>
            <div className='table__showtime__render'>
              <table>
                <thead>
                  <th>Stt</th>
                  <th>Film</th>
                  <th>Room</th>
                  <th>Show Time</th>
                  <th>Date</th>
                  <th>Duration</th>
                </thead>
                <tbody>
                 
                    {
                      allShowTime?.map((item,index)=>{
                        return <tr>
                          <td>{index+1}</td>
                          <td>{item.nameFilm}</td>
                          <td>{item.nameRoom}</td>
                          <td>{item.showTimeAt}</td>
                          <td>{item.date_show ? new Date(item.date_show).toLocaleDateString():""}</td>
                          <td>{item.duration}</td>
                        </tr>
                      })
                    }
                 
                </tbody>
              </table>
            </div>
          </div>
          
                {/* <table>
                    <thead>
                        <th>Stt</th>
                        <th>Id Bill</th>
                        <th>Time</th>
                        <th>Detail</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            billsPana?.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.time}</td>
                                    <td><button onClick={()=>{showDetail(item.id)}} >Show Bill</button></td>
                                    <td
                                    style={{color:item.status == 0 ?"yellow":item.status == 1?"green":"red"}}
                                    >{item.status == 0 ?"loading":item.status == 1?"accept":"cancel"}</td>
                                    <td>
                                        {
                                            item.status == 0? <div>
                                                <button onClick={()=>acceptBill(item.id)}>Accept</button>
                                                <button onClick={()=>cancelBill(item.id)}>Cancel</button>
                                            </div> :""
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className='adminProduct--pana'>
                    <GrPrevious onClick={prePage}></GrPrevious>
                    {
                       totalPage?.map((item)=>{
                        return <div  className='dot' onClick={()=>{setCurrentPage(item+1)
                        changeColor()
                        }}>{item +1}</div>
                       })
                    }
                   <GrNext onClick={nextPage}></GrNext>
            </div>

            <div className='Bill__detail' style={{height:openDetail}}>
                    <h1>Detail Bill</h1>
                    <p> <span>Name:</span>  {billDetail[0]?.address.name}</p>
                    <p> <span>Phone Number:</span> {billDetail[0]?.address.phonenumber}</p>
                    <p><span>Id:</span> {billDetail[0]?. id}</p>
                    <p><span>Time:</span>  {billDetail[0]?.time}</p>
                    <div>
                        <table>
                            <thead>
                                <th>Stt</th>
                                <th>Product</th>
                                <th>Quatity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </thead>
                            <tbody>
                                {
                                    billDetail[0]?.cart.map((item,index)=>{
                                        return <tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price} $</td>
                                            <td>{item?.quantity * item?.price } $</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <td colSpan={4}>Total Bill:</td>
                                <td >{totalDetail} $</td>
                            </tfoot>
                        </table>
                    </div>
                    <button onClick={()=>{setOpenDetail("0vh")}}>Close</button>
            </div> */}

        </div>
    </div>
    </>
  )
}
