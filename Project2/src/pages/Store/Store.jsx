import React, { useEffect, useRef, useState } from "react";
import "./Store.scss";
import { Rate } from "antd";
import apis from "../../service/apis/api.user.js";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../store/Product.js";
import { getAllAccount } from "../../store/Account.js";
import {useNavigate} from "react-router-dom"
import NavStore from "../../components/layout/navStore/NavStore.jsx"
import instance from "../../service/apis/baseURL.js";
import privateAxios from "../../../config/Axios.js";

export default function Store() {
  const [user, setUser] = useState({});
  const [openfind, setOpenFind] = useState("35px");
  const now = useRef("");
  const [timeNow,setTimeNow] = useState()
  const [films, setFilms] = useState([]);
 
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
  const [openDetail, setOpenDetail] = useState(0);
  const [alert,setAlert] = useState("0px")
  const [content,setContent] = useState ("Thê giỏ hàng thành công ^^")
  const [filmComing,setFilmComing] = useState([])
  const [filmNowShowing,setFilmNowShowing] = useState([])
  const [categoryForFilms,setCategoryForFilms] = useState([])
  const [openBuy,setOpenBuy] = useState("0px")
  const [chair,setChair] = useState([])
  const [openChair,setOpenChair] = useState("0px")

  const [day, setDay] = useState([]);
  const [newTicket,setNewTicket] = useState({
    idChair:[],
    idRoom:"",
    idFilm:"",
    idUser:"",
    date:"",
    idShowTime:"",
    dateBuy:"",
    price:""
  })
  const [openPayment,setOpenPayment] = useState("0px")
  useEffect(() => {
    instance.get("/getChair").then((res)=>{
      setChair(res.data.data[0])
    })
    const now = new Date()
    now.current = now.toISOString().split("T")[0]
    setTimeNow(now.toISOString().split("T")[0].split("-").join(""))
    instance.get("/filmComing").then((res) => {
      console.log(res.data.data);
      setFilmComing(res.data.data);
    instance.get("/filmNowShowing").then((res) => {
      console.log(res.data.data);
      setFilmNowShowing(res.data.data);
    })
    let arr = []
    let now = new Date()
    for(let i = 0; i< 6;i++){
      let day = new Date(now)
      day.setDate(now.getDate() + i)
      arr.push(day.toUTCString())
    }
   setDay(arr)
    })
    instance.get("/getCategoryForFilms").then((res)=>{
      // console.log(res.data.data)
      setCategoryForFilms(res.data.data)
      // setCategoryForFilms()
    })
  }, []);
  
  // console.log(currentUser);
  // const data = useSelector((state) => state.productReducer);
  // console.log(data);
  // useEffect(() => {
  //   apis.checkLogin().then((res) => {
  //     // console.log(res.data);
  //     setCurrentUser(res.data);
  //   });
  // }, []);
  // const navigate = useNavigate()
  const buyTicket = async(idFilm)=>{
    const now = new Date()

    try {
      const result = await privateAxios.get(`/getfilmBuyTicket?idFilm=${idFilm}`)
      console.log(result.data.user.id)
      
      setUser(result.data.user)
      console.log(result.data.data[0])
      setFilms(result.data.data[0])
      console.log(idFilm)
      setNewTicket({...newTicket,idFilm:idFilm,idUser:result.data.user.id,dateBuy:now.toISOString().split("T")[0]})
      setOpenBuy("90vh")
    } catch (error) {
      setContent(error.response.data.message)
      setAlert("200px")
    }
    
  }
  const next = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").appendChild(lists[0]);
  };
  const pre = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").prepend(lists[lists.length - 1]);
  };
  // const next__render = (index,length) => {
  //   let lists = document.querySelectorAll(".itemRender");

  //   data.products.forEach((element,ind) => {
  //     if(ind == index){
  //       if(index == 0){
  //       document.getElementsByClassName("listRender")[index].appendChild(lists[0]);
  //       }else{
  //         let count = 0
  //         for(let i = 0;i<index;i++){
  //           count += data.products[i].products.length 
  //         }
  //       document.getElementsByClassName("listRender")[index].appendChild(lists[count]);
  //       }
  //     }
  //   });
  // };
  // const pre__render = (index,length) => {
   
  //   let lists = document.querySelectorAll(".itemRender");
  //   data.products.forEach((element,ind) => {
  //     if(ind == index){
  //       if(index == 0){
  //         let count = data.products[0].products.length -1 
        
  //         document.getElementsByClassName("listRender")[index].prepend(lists[count]);
  //       }else{
  //         let count = data.products[0].products.length -1 
  //         for(let i = 1;i<=index;i++){
  //           count += data.products[i].products.length 
  //         }
  //       document.getElementsByClassName("listRender")[index].prepend(lists[count]);
  //       }
  //     }
  //   });
  // };
  const openDetaila = async(index, id) => {
    setOpenDetail("100vh");
    const result = await instance.get(`/getfilmUpdate/${id}`);
    const result2 = await instance.get(`/getCategoryForFilmUpdate?idFilm=${id}`);
    console.log(result2.data.data[0]);
    console.log(result.data.data[0][0]);
    setFilmDetail({
      id:result.data.data[0][0].idFilm,
      name: result.data.data[0][0].nameFilm,
      duration: result.data.data[0][0].duration,
      date: result.data.data[0][0].releaseDate,
      img: result.data.data[0][0].imageFilm,
      filmDetail: result.data.data[0][0].detailFilm,
      trailer: result.data.data[0][0].trailer,
    })
  };
  const closeDetial=()=>{
    setOpenDetail("0vh");
  }
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
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
      
      const cur = new Date()
      const date = cur.getDay()
      console.log(date)
      if(date == 6 || date == 0){
        setNewTicket({
          ...newTicket,price:"55000"
        })
      }else{
        setNewTicket({
          ...newTicket,price:"45000"
        })
      }
      setOpenPayment("40vw")

    //  console.log(newTicket)
    //   const result = await instance.post(`/bookingTicket`,newTicket)
    //   setNewTicket({
    //     idChair:[],
    //     idRoom:"",
    //     idFilm:"",
    //     idUser:"1",
    //     date:"",
    //     idShowTime:""
    //   })
    //   for(let i = 0;i<6;i++){
    //     document.getElementsByClassName('dayTicket')[i].style.color = ' rgba(255, 166, 0, 0.2)'
    //   }
    //   for(let i =0 ;i<document.getElementsByClassName('roomTicket').length;i++){
    //     document.getElementsByClassName('roomTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    //   }
    //   for(let i =0 ;i<document.getElementsByClassName('chair').length;i++){
    //     document.getElementsByClassName('chair')[i].style.color = 'white'  
    //   }
    //   for(let i =0 ;i<document.getElementsByClassName('showTimeTicket').length;i++){
    //     document.getElementsByClassName('showTimeTicket')[i].style.color = 'rgba(255, 166, 0, 0.2)'  
    //   }
    //   setOpenChair("0vh")
    //   setCheckRoom([])
    //   setShowTimeTicket([])
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
  const closePayment = ()=>{
    setOpenPayment("0vw")
  }
  const Payment = async()=>{
     console.log(newTicket)
      const result = await instance.post(`/bookingTicket`,newTicket)
      setNewTicket({
        ...newTicket,
        idChair:[],
        idRoom:"",
        idFilm:"",
        idUser:"",
        date:"",
        idShowTime:"",
        price:""
        
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
      setContent("Payment success")
      setAlert("20vh")
      setOpenPayment("0vw")
    }
  return (
    <>
      <NavStore></NavStore>
      <div className="Store">

        <div className="BuyTicket" style={{ height: openBuy,zIndex: "1" }}>
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

          {/* payment */}

          <div className="payment"  style={{width:openPayment}}>
            <div className="close" onClick={closePayment}>X</div>
            <div>
              <h1>TICKET</h1>
            </div>
            <div>
              <div style={{margin:"1rem"}}>
              <p>User: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Date Buy : {newTicket.dateBuy}</p>
              </div>
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
                  {
                    newTicket.idChair.map((item,index)=>{
                      return <tr>
                        <td>{index+1}</td>
                        <td>{newTicket.idFilm ? films[films.findIndex(x => x.idFilm == newTicket.idFilm)]?.nameFilm : "" }</td>
                        <td>
                          {
                            newTicket.idChair ? chair[chair.findIndex(x => x.idChair == item)]?.nameChair : ""
                          }
                          -
                          {
                            newTicket.idRoom ? checkRoom[checkRoom.findIndex(x => x.idRoom == newTicket.idRoom)]?.nameRoom : ""
                          }
                        </td>
                        <td>
                          {
                            newTicket.idShowTime ? ShowTimeTicket[ShowTimeTicket.findIndex(x => x.idShowTime == newTicket.idShowTime)]?.showTimeAt : ""
                          }
                        </td>
                        <td>
                          {
                            newTicket?.date.toISOString().slice(0,10)
                          }
                          </td>
                          <td>
                          { newTicket?.price ? (1 * newTicket?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }):"" }
                          </td>  
                      </tr>
                    })
                  }
                  <tr style={{fontWeight:"bold"}}><td colSpan="5">Total</td><td>{newTicket?.price ? (newTicket?.price * newTicket?.idChair.length).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }):"0"}</td></tr>
                </tbody>

              </table>
            </div>
            <div  style={{margin:"1rem",}}>
              <button style={{border:"none",backgroundColor:"brown",color:"white",padding:"0.5rem 2rem"}}  onClick={Payment}>Payment</button>
            </div>
          </div>

          
        </div>

        <div className="Alert__store" style={{height:alert}}>
          <p>{content}</p>
        </div>

        <div className="Store__render">
          
          <div className="Store__render--slide">
            <div className="container">
              {/* <div style={{position:"absolute",left:"100px",top:"10px",zIndex:"100",color:"white",padding:"10px",backgroundColor:"rgba(0,0,0,0.6)",borderRadius:"10px"}}>
                <h1>Movies Comming Soon</h1>
              </div> */}
              <div id="slide">
              {
                filmComing.map((item,index)=>{
                  return <div
                  className="item"
                  style={{
              
                    backgroundImage:item ? `url(${item.imageFilm})` : "url()",
                  }}
                >
                  <div className="content">
                    <div className="name">{item.nameFilm}</div>
                    <div style={{color: "orange"}}>{item.releaseDate?new Date(item.releaseDate).toUTCString().slice(0,16):""}</div>
                    <div className="desa">
                      {item.detailFilm}
                    </div>
                    <button  onClick={() => openDetaila( 0 , item.idFilm)}>See more</button>
                  </div>
                </div>
                })
              }
              </div>
              <div className="buttons">
                <button id="prev" onClick={pre}>
                  <GrFormPrevious></GrFormPrevious>
                </button>
                <button id="next" onClick={next}>
                  <GrFormNext></GrFormNext>
                </button>
              </div>
            </div>
          </div>

          <div style={{position:"relative",left:"20vw",zIndex:"100",color:"white",padding:"20px",backgroundColor:"rgba(0,0,0,0.6)",borderRadius:"10px"}}>
            <h2>Now Showing</h2>
          </div>

            <div className="Store__render--list">
              {
                filmNowShowing.map((item,index)=>{
                  return <div key={index} className="listRender" onClick={() => openDetaila( 0 , item.idFilm)}>
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
        </div>

        <div className="Store__detail" style={{ height: openDetail }}>
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

        

      </div>
    </>
  );
}
