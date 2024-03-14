import React, { useState,useEffect } from "react";

import "./Category.scss";
import apis from "../../service/apis/api.user.js";
import { Rate } from "antd";
import { FaArrowDownAZ, FaCartPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../store/Product.js";
import { getAllAccount } from "../../store/Account.js";
import NavStore from "../../components/layout/navStore/NavStore.jsx";
import instance from "../../service/apis/baseURL.js";
export default function Category() {
  const [height, setHeight] = useState("100vh");
  const [openDetail, setOpenDetail] = useState("0vh");
  const [currentUser, setCurrentUser] = useState([]);
  const [alert,setAlert] = useState("0px")
  const [nameCategory,setNameCategory] = useState("")
  const [categoryForFilms,setCategoryForFilms] = useState([])
  const [timeNow,setTimeNow] = useState()
  const [openBuy,setOpenBuy] = useState("0px")
  const [chair,setChair] = useState([])
  const [openChair,setOpenChair] = useState("0px")
  const [films, setFilms] = useState([]);
  const [newTicket,setNewTicket] = useState({
    idChair:[],
    idRoom:"",
    idFilm:"",
    idUser:"1",
    date:"",
    idShowTime:""
  })
  const [filmDetail, setFilmDetail] = useState({
    name: "",
    duration: "",
    date: "",
    filmDetail: "",
    img: "",
    trailer: "",
    rate: 5,
    id:""
  });
  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: "",
    productDetail: "",
  });
  const [filmForDay, setFilmForDay] = useState([])
  const [day, setDay] = useState([])
  // const dispatch = useDispatch();
  useEffect(() => {
    instance.get("/getChair").then((res)=>{
      setChair(res.data.data[0])
    })
    instance.get("/getCategoryForFilms").then((res)=>{
      // console.log(res.data.data)
      setCategoryForFilms(res.data.data)
      // setCategoryForFilms()
      const now = new Date()
      // console.log(now.toISOString().split("T")[0].split("-").join(""))
      setTimeNow(now.toISOString().split("T")[0].split("-").join(""))
    })
    let arr = []
    let now = new Date()
    for(let i = 0; i< 6;i++){
      let day = new Date(now)
      day.setDate(now.getDate() + i)
      arr.push(day.toUTCString())
    }
   setDay(arr)
  }, []);

  const getFilmForDay = async(value,index) => {
   document.getElementsByClassName("dayShowTime")[index].style.color = "orange"
   for(let i=0;i<6;i++){
    if(i != index){
    document.getElementsByClassName("dayShowTime")[i].style.color = "rgba(255, 166, 0, 0.4)"
    }
   }
   const result = await instance.get(`/getfilmForDay?d=${value}`);
    let arr = []
    result.data.data.forEach((item)=>{
      let check = arr.findIndex((i)=>i.idFilm == item.idFilm)
      if(check == -1){
        arr.push(item)
      }
    })
    setFilmForDay(arr)
  };
  const openDetaila = async(id,index) => {
    console.log(id)
    setOpenDetail("100vh");
    const result = await instance.get(`/getfilmUpdate/${id}`);
    const result2 = await instance.get(`/getCategoryForFilmUpdate?idFilm=${id}`);
    console.log(result2.data.data[0]);
    console.log(result.data.data[0][0]);
    setFilmDetail({
      name: result.data.data[0][0].nameFilm,
      duration: result.data.data[0][0].duration,
      date: result.data.data[0][0].releaseDate,
      img: result.data.data[0][0].imageFilm,
      filmDetail: result.data.data[0][0].detailFilm,
      trailer: result.data.data[0][0].trailer,
      id:result.data.data[0][0].idFilm,
    })
  };
   
  const closeDetial=()=>{
    setOpenDetail("0vh");
  }
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const buyTicket = async(idFilm)=>{
    console.log(idFilm)
    setNewTicket({...newTicket,idFilm:idFilm})
    setOpenBuy("90vh")
    const result = await instance.get(`/getfilmBuyTicket?idFilm=${idFilm}`)
    console.log(result.data.data[0])
    setFilms(result.data.data[0])
  }
  const [ checkRoom, setCheckRoom] = useState([])
  const [ checkShowTimes, setCheckShowTimes] = useState([])
  const [ShowTimeTicket, setShowTimeTicket] = useState([])
  const checkShowTime = (day,index)=>{
    document.getElementsByClassName('dayTicket')[index].style.color = 'orange'
    for(let i = 0;i<6;i++){
      if(i != index){
      document.getElementsByClassName('dayTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
      }
    }
    for(let i =0 ;i<document.getElementsByClassName('roomTicket').length;i++){
      document.getElementsByClassName('roomTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    }
    for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
      document.getElementsByClassName('chair')[i].style.color = 'white'  
    }
    const date = new Date(day)
    setNewTicket({...newTicket, date: date, idRoom: "", idShowTime: "",idChair: []})
    console.log(date.toISOString().split("T")[0].split("-").join(""))
   console.log(films[0].date_show.slice(0,10).split("-").join(""))
    const check = films.filter((item)=>item.date_show.slice(0,10).split("-").join("") == date.toISOString().split("T")[0].split("-").join("")-1)
    let arr = []
    setCheckShowTimes(check)
    check.forEach((itema)=>{
      const check = arr.findIndex((item)=> item.idRoom == itema.idRoom)
      if(check == -1){
        arr.push(itema)
      }
    })
  
    setCheckRoom(arr)
    setShowTimeTicket([])
    setOpenChair("0vh")
  }   
  const chooseRoom = (idRoom,index)=>{
    for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
      document.getElementsByClassName('chair')[i].style.color = 'white'  
    }
    for(let i =0 ;i<document.getElementsByClassName('showTimeTicket').length;i++){
      document.getElementsByClassName('showTimeTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    }
    document.getElementsByClassName('roomTicket')[index].style.color = 'orange'
    if(document.getElementsByClassName('roomTicket').length > 1){
    for(let i = 0;i<document.getElementsByClassName('roomTicket').length;i++){
      if(i != index){
      document.getElementsByClassName('roomTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
      }
    }
    }
    const check = checkShowTimes.filter((item)=>item.idRoom == idRoom)
    console.log(check)
    setShowTimeTicket(check)
    console.log(idRoom)
    setNewTicket({...newTicket, idRoom: idRoom, idShowTime: "",idChair: []})
    setOpenChair("0vh")
  }
  const chooseChair = async()=>{
    console.log(newTicket)
    if(newTicket.idRoom && newTicket.date&& newTicket.idShowTime){
    setOpenChair("30vh")
      const result = await instance.get(`/checkTicket?idRoom=${newTicket.idRoom}&date=${newTicket.date.toISOString().split("T")[0].split("-").join("")}&idShowTime=${newTicket.idShowTime}`)
      console.log(result.data.data)
          result.data.data.forEach((item)=>{
          document.getElementsByClassName('chair')[item.idChair-1].style.color = 'brown'
          })
          for(let i=0;i< chair.length;i++){
            if(result.data.data.findIndex((item)=> item.idChair == i+1) == -1){
              document.getElementsByClassName('chair2')[i].style.zIndex = '2'
            }else{
              document.getElementsByClassName('chair2')[i].style.zIndex = '1'
            }
          }
          
      
    }else{
      setAlert("20vh")
      setContent("Please choose all fields")
    }
  }
  const chooseShowTime = (idShowTime,index)=>{
    console.log(idShowTime)
    for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
      document.getElementsByClassName('chair')[i].style.color = 'white'  
    }
    setNewTicket({...newTicket, idShowTime: idShowTime,idChair: []})
    document.getElementsByClassName('showTimeTicket')[index].style.color = 'orange'
    if(document.getElementsByClassName('showTimeTicket').length > 1){
    for(let i = 0;i<document.getElementsByClassName('showTimeTicket').length;i++){
      if(i != index){
      document.getElementsByClassName('showTimeTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
      }
    }
    }
    setOpenChair("0vh")
  }
  useEffect(() => {
    setTimeout(() => {
      setAlert("0px")
      setContent("")
    },1500)
  },[alert])
  const chooseChairTicket = (idChair,index)=>{
    console.log(idChair)
    if( document.getElementsByClassName('chair')[index].style.color == 'orange'){
      document.getElementsByClassName('chair')[index].style.color = 'white'
    }else{
    document.getElementsByClassName('chair')[index].style.color = 'orange'
    }
    const arr = [...newTicket.idChair]
    const check = arr.findIndex((item)=>item == idChair)
    if(check != -1){
      console.log(check)
       arr.splice(check,1)
       setNewTicket({...newTicket, idChair: arr})
       console.log(arr)
       return
    }
    arr.push(idChair)
    setNewTicket({...newTicket, idChair: arr})
    console.log(arr)
  }

  const bookingTicket = async()=>{
    if(newTicket.idRoom && newTicket.date && newTicket.idShowTime && newTicket.idChair.length > 0){
     console.log(newTicket)
      const result = await instance.post(`/bookingTicket`,newTicket)
      setNewTicket({
        idChair:[],
        idRoom:"",
        idFilm:"",
        idUser:"1",
        date:"",
        idShowTime:""
      })
      for(let i = 0;i<6;i++){
        document.getElementsByClassName('dayTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
      }
      for(let i =0 ;i<document.getElementsByClassName('roomTicket').length;i++){
        document.getElementsByClassName('roomTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
      }
      for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
        document.getElementsByClassName('chair')[i].style.color = 'white'  
      }
      for(let i =0 ;i<document.getElementsByClassName('showTimeTicket').length;i++){
        document.getElementsByClassName('showTimeTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
      }
      setOpenChair("0vh")
      setCheckRoom([])
      setShowTimeTicket([])
    }else{
      setAlert("20vh")
      setContent("Please choose all fields")
    }
  }
  const closeBooking = ()=>{
    setNewTicket({
      idChair:[],
      idRoom:"",
      idFilm:"",
      idUser:"1",
      date:"",
      idShowTime:""
    })
    for(let i = 0;i<6;i++){
      document.getElementsByClassName('dayTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
    }
    for(let i =0 ;i<document.getElementsByClassName('roomTicket').length;i++){
      document.getElementsByClassName('roomTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    }
    for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
      document.getElementsByClassName('chair')[i].style.color = 'white'  
    }
    for(let i =0 ;i<document.getElementsByClassName('showTimeTicket').length;i++){
      document.getElementsByClassName('showTimeTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    }
    setOpenChair("0vh")
    setCheckRoom([])
    setShowTimeTicket([])
    setOpenBuy("0vh")
  }
  return (
    <>
      <NavStore></NavStore>
      <div className="Category">
        {/* <div className="lista" style={{ height: height }}>
          <div className="itema" onClick={() => getFilmForDay("Platform games")}>
            <img
              src="https://anhdepfree.com/wp-content/uploads/2022/02/hinh-nen-laptop-gaming-4k_518700-1280x720.jpg"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Platform games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getFilmForDay("Shooter games")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopBsY-CG_LUGu0DhNxrdOrbKuCJcPGJbe1xf_Ak4yCn4cHSN0urccrnJoJbQ4vghjI14&usqp=CAU"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Shooter games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getFilmForDay("Fighting games")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXC5jfYu35aiHC85hyXCbbyitKuhF8F-5SEmcE_J7KQaL6nqu8-fi3QJ6mP4bNUItYteg&usqp=CAU"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Fighting games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getFilmForDay("Survival games")}>
            <img
              src="https://top10tphcm.com/wp-content/uploads/2023/02/hinh-nen-game-4k-cho-dien-thoai-6.jpg"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Survival games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getFilmForDay("Action RPG")}>
            <img src="https://wallpaperaccess.com/full/2086927.jpg" alt="" />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
                Action RPG
              </h1>
            </div>
          </div>
        </div> */}
        <div  className="Category__name" onClick={()=>{setHeight("100vh")}}>
          <h1>Show Time</h1>
          <div className="dayShowFilm" style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",gap:"10px"}}>
           {
            day.map((item,index)=>{
              return <p key={index} className="dayShowTime" onClick={()=>{getFilmForDay(item,index)}}>{item?item.slice(0,12):""}</p>
            })
           }
          </div>
        </div>
        <div className="day__render--list">
              {
                filmForDay.map((item,index)=>{
                  return <div key={index} className="listRender" onClick={() => openDetaila( item.idFilm)}>
                    <div style={{overflow:"hidden",borderRadius:"10px 10px 0 0",width:"280px",height:"320px"}}>
                    <img src={item.imageFilm} alt="" width={280} height={320} style={{borderRadius:"10px 10px 0 0"}}/>
                    </div>
                    <div className="contentFilm">
                      <h5 style={{color:"brown"}}>{item.nameFilm}</h5>
                      <p><span style={{color:"orange"}}>Duration :</span> {item.duration} h </p>
                      <p><span style={{color:"orange"}}>Category :</span>{ categoryForFilms.map((itema)=>{
                        if(itema.idFilm == item.idFilm){
                        return <span> {itema.name}, </span>
                        }
                        })}</p>
                    </div>
                  </div>
                })
              }
            </div>
        <div className="category__detail" style={{ height: openDetail }}>
          <div style={{ display: "flex", padding: "4rem",width:"100%",height:"60vh" }}>
            <div style={{width:"50%",height:"100%"}}>
              <h1 style={{fontSize:"2rem",width:"100%",height:"5vw"}}>{filmDetail.name}</h1>
              {/* <p>{product.productDetail}</p> */}
              <div style={{margin:"1rem"}}>
              <img src={filmDetail?.img} alt="" width={100} />
              </div>
              <Rate
                disabled
                defaultValue={5}
                value={filmDetail?.rate}
                style={{ paddingRight: "10px" }}
              />

              <p>
                Release Date :
                <span style={{ color: "orange" }}>  {filmDetail.date?new Date(filmDetail.date).toUTCString().slice(0,16):""} </span>
              </p>
              {
                filmDetail.date? new Date(filmDetail.date).toISOString().split("T")[0].split("-").join("") <= timeNow ? <button className="button__detail" onClick={() => buyTicket(filmDetail.id)} >BUY TICKET <FaCartPlus></FaCartPlus></button>:<h5 style={{color:"silver"}}>Comming soon ...</h5>:""
              }
              
            </div>
            <div style={{ width: "400px" }}>
            <div>
              <h3>Infomation</h3>
              {/* <p>Date : {filmDetail.date}</p> */}
              <p style={{marginTop:"3rem"}}>{filmDetail.filmDetail}</p>
              </div>
            </div>
          </div>

          <div style={{ width:"100%",backgroundColor:"black",
          height:"36vh",padding:"1rem 3rem",
          display:"grid",
          gridTemplateColumns:"50% 50%",
          gap:"2rem"

          
          }}>
              {/* <div>
              <h3>Infomation</h3>
              <p>Date : {filmDetail.date}</p>
              <p>{filmDetail.detailFilm}</p>
              </div> */}
              <div>
                <h3>Comment</h3>
                <p>Rate : <Rate allowHalf defaultValue={2} /> </p>
                <textarea name="" id="" cols="46" rows="4" style={{
                  backgroundColor:"transparent",
                  color:"white"
                }}></textarea>
                <button className="button__detail">Sumbit</button>
              </div>
          </div>

          <div style={{ width:"100%",backgroundColor:"rgba(255, 0, 0, 0.5)",color:"black",
          textAlign:"center"
        }}
        onClick={closeDetial}
        >
          <IoIosArrowUp></IoIosArrowUp>
          </div>
        </div>
        <div className="BuyTicket" style={{ height: openBuy }}>
          <p style={{ cursor: "pointer",paddingTop:"1rem" }} onClick={closeBooking}>close</p>
          <h1 style={{color:"brown"}}>{films[0]?.nameFilm}</h1>
          <div style={{ display: "flex", justifyContent:"space-evenly" }}>
            {
              day.map((item,index)=>{
                return <p className="dayTicket" onClick={()=>{checkShowTime(item,index)}}>{item?item.slice(0,12):""}</p>
              })
            }
          </div>
          <h5>Choose Room</h5>
          <div style={{ display: "flex", justifyContent:"space-evenly" }}>
            {
              checkRoom?.map((item,index)=>{
                return <p className="dayTicket roomTicket" onClick={() => chooseRoom(item.idRoom,index)}> Room {item.nameRoom}</p>
              })
            }
          </div>
          <h5>Choose ShowTime</h5>
          <div style={{ display: "flex", justifyContent:"space-evenly" }}>
            {
              ShowTimeTicket?.map((item,index)=>{
                return <p className="dayTicket showTimeTicket" onClick={() => chooseShowTime(item.idShowTime,index)}> {item.showTimeAt}</p>
              })
            }
          </div>
          <div>
            <button onClick={chooseChair} className="btn_ticket btn_ticket_pay">Choose Chair</button>
          </div>
          <div  style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",width:"100%",gap:"0.5rem",height:openChair,overflowY:"scroll",transition:"all 0.5s"}}>
            {
              chair.map((item,index)=>{
                return <div className="chair " ><i  onClick={() => chooseChairTicket(item.idChair,index)} class="fa-solid fa-couch chair2" style={{fontSize:"2rem"}}></i><p style={{width:"45%",textAlign:"center",position:"absolute",zIndex:"5",bottom:"15px"}}>{item.nameChair}</p> </div>
              })
            }
          </div>
          <div>
            <button className="btn_ticket_pay" onClick={bookingTicket}>Booking Ticket</button>
          </div>
        </div>
      </div>

        
      
    </>
  );
}
