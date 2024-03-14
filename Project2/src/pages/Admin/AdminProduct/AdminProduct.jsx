import React, { useEffect, useState, useRef } from "react";
import "./AdminProduct.scss";
import NavAdminn from "../../../components/layout/navAdmin/NavAdminn";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../service/apis/api.user";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../../../../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import { SiIconfinder } from "react-icons/si";
import instance from "../../../service/apis/baseURL";
import privateAxios from "../../../../config/Axios";

export default function AdminProduct() {
  const uuid = () => {
    return Math.floor(Math.random() * 999999);
  };
  const [openfind, setOpenFind] = useState("35px");
  const closeIn = useRef("hidden");

  const [products, setProducts] = useState({
    name: "",
    duration: "",
    date: "",
    filmDetail: "",
    img: "",
    trailer: "",
    rate: 5,
   
  });
  const [productsRender, setproductsRender] = useState([]);
  const [productsFind, setproductsFind] = useState([]);
  const [productsPana, setproductsPana] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [openAddNew, setOpenAddNew] = useState("0vh");
  const [openEdit, setOpenEdit] = useState("0vw");
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [urlImage2, setUrlImage2] = useState(null);
  const [category, setCategory] = useState([]);
  const [categoryForFilms,setCategoryForFilms] = useState([])
  const [categoryForFilmEdit,setCategoryForFilmEdit] = useState([])
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState("0");
  // const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [chosseCategory, setChosseCategory] = useState("Category");
  const [films, setFilms] = useState([]);


  const [newCategory,setNewCategory] = useState([])
  // const [productsDetail,setproductsDetail]= useState([])
  const navigate = useNavigate();
  useEffect(() => {
    instance.get("/films").then((res) => {
      //  console.log(res.data.data2[0])
    
      setFilms(res.data.data);
      setCategory(res.data.data2[0]);
    });
    instance.get("/getCategoryForFilms").then((res)=>{
      // console.log(res.data.data)
      setCategoryForFilms(res.data.data)
      // setCategoryForFilms()
    })
  }, []);
  const changeColor = () => {
    for (let i = 0; i < Math.ceil(productsRender.length / 6); i++) {
      if (currentPage - 1 == i) {
        document.getElementsByClassName("dot")[i].style.color = "red";
      } else {
        document.getElementsByClassName("dot")[i].style.color = "white";
      }
    }
  };
  useEffect(() => {
    let arr = [];
    let arr2 = [];
    const currentPerPage = 5;
    const start = (currentPage - 1) * currentPerPage;
    let end = currentPage * currentPerPage;
    for (let i = 0; i < Math.ceil(films.length / currentPerPage); i++) {
      arr2.push(i);
    }
    setTotalPage(arr2);
    if (end > films.length) {
      end = films.length;
    }
    for (let i = start; i < end; i++) {
      arr.push(films[i]);
    }
    console.log(arr);
    setproductsPana(arr);
    for (let i = 0; i < Math.ceil(films.length / 6); i++) {
      if (document.getElementsByClassName("dot")[i]) {
        if (currentPage - 1 == i) {
          document.getElementsByClassName("dot")[i].style.color = "red";
        } else {
          document.getElementsByClassName("dot")[i].style.color = "white";
        }
      }
    }
  }, [currentPage, films]);
  const nextPage = () => {
    if (currentPage >= totalPage.length) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
    changeColor();
  };
  const prePage = () => {
    if (currentPage < 2) {
      setCurrentPage(totalPage.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
    changeColor();
  };
  const changeImage = (event) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setProducts({ ...products, img: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const changeValue = (e) => {
    // let arr = { ...products };
    // console.log(arr);
    setProducts({ ...products, [e.target.name]: e.target.value });
    console.log(products);
  };
  const changeValueCategory = (e) => {
    let arr = { ...products };
    arr.category = e.target.value;
    console.log(arr);
    setProducts(arr);
  };

  const newCategoryforfilm = (e)=>{
    // console.log(e.target.value)
    // console.log(e.target.name)
    const arr = [...newCategory]
    const check = arr.findIndex((item)=>item == e.target.value)
    if(check != -1){
      arr.splice(check,1)
      setNewCategory(arr)
      // console.log(arr)
      return
    }
    arr.push(e.target.value)
    setNewCategory(arr)
    // console.log(arr)
  }

  useEffect(() => {}, [alert]);
  const saveNewProduct = async () => {
    console.log(products);
    if (
      products.name != "" &&
      products.duration != "" &&
      products.date != "" &&
      products.img != "" &&
      products.filmDetail != "" &&
      products.trailer != "" 
     
    ) {
      try {
        const formData = new FormData();
        formData.append("file", selectedMedia);
        formData.append("upload_preset", "project3");
        const [uploadMedia] = await Promise.all([
          axios.post(
            "https://api.cloudinary.com/v1_1/dcmrlgyyd/image/upload",
            formData
          ),
        ]);
        const media = uploadMedia.data.secure_url;

        console.log(media);
        const result = await privateAxios.post("/addFilm", {
          ...products,
          img: media,
        });
       //lay dc idFilm de goi lenh vao tao category cho film
        console.log(result.data.data[0][result.data.data[0].length-1].idFilm)
        const result2 = await instance.post("/addCategoryForFilm", {
          idFilm: result.data.data[0][result.data.data[0].length-1].idFilm,
          arr: newCategory
        })
        console.log(result2)
        setFilms(result2.data.data[0]);
        setCategoryForFilms(result2.data.data2);
        setContent(result.data.message);
        setAlert("200px");
        setTimeout(() => {
          setAlert("0");
        }, 1500);
        setProducts({
          name: "",
          duration: "",
          date: "",
          img: "",
          filmDetail: "",
          trailer: "",
        });
        return;
      } catch (error) {
        setContent(error.response.data.message);
        setAlert("200px");
        setTimeout(() => {
          setAlert("0");
        }, 1500);
        return;
      }
    }
    setContent("Please fill in all fields");
    setAlert("200px");
    setTimeout(() => {
      setAlert("0");
    }, 1500);
    // ) {
    //   api.getProducts().then((res) => {
    //     let arr = [...res.data];
    //     let index = arr.findIndex((item) => {
    //       return item.category == products.category;
    //     });
    //     if (index != -1) {
    //       arr[index].products.push(products);
    //       axios.put(
    //         `http://localhost:8008/products/${arr[index].id}`,
    //         arr[index]
    //       );
    //     } else {
    //       let productNew = {
    //         category: products.category,
    //         products: [
    //           {
    //             name: products.name,
    //             price: products.price,
    //             img: products.img,
    //             stock: products.stock,
    //             id: products.id,
    //             rate: products.rate,
    //             date: products.date,
    //             productDetail: products.productDetail,
    //           },
    //         ],
    //       };
    //       axios.post("http://localhost:8008/products", productNew);
    //     }
    //   });

    //   let array = [...productsRender];
    //   array.push(products);
    //   setproductsRender(array);
    //   setProducts({
    //     product: {
    //       name: "",
    //       price: "",
    //       stock: "",
    //       date: "",
    //       productDetail: "",
    //       img: [],
    //       rate: 5,

    //     },
    //     category: "",
    //   });

    //   setUrlImage("");
    //   setUrlImage2("");
    //   setContent("Accept ^^!");
    //   setAlert("200px");
    //   setTimeout(() => {
    //     setAlert("0px");
    //   }, 1500);
    // } else {
    //   console.log("11111111111");
    // }
  };

  const [idDelete, setIdDelete] = useState("");
  const deleteItem = (id) => {
    setContent("Bạn muốn xóa sản phẩm này ?");
    setAlert("200px");
    setIdDelete(id);
  };
  const deleteItemCP = async () => {
    try {
      const result = await privateAxios.delete(`/deletefilm/${idDelete}`);
    setFilms(result.data.data[0]);
    setIdDelete("");
    setAlert("0px");
    } catch (error) {
      setContent(error.response.data.message);
      setAlert("200px");
    }
    
  };
  const [idEdit, setIdEdit] = useState("");
  const editItem = async (id) => {
    setIdEdit(id);
    setOpenEdit("78vw");
    const result = await instance.get(`/getfilmUpdate/${id}`);
    const result2 = await instance.get(`/getCategoryForFilmUpdate?idFilm=${id}`);
    console.log(result2.data.data[0]);
    let arr = []
    result2.data.data[0].forEach(element => {
      arr.push(element.idCategory)
    });
    setNewCategory(arr);
    

    // setCategoryForFilms(result2.data.data[0]);
    console.log(result.data.data[0][0]);
    setChosseCategory(result.data.data[0][0].name);
    setProducts({
      name: result.data.data[0][0].nameFilm,
      duration: result.data.data[0][0].duration,
      date: result.data.data[0][0].releaseDate,
      img: result.data.data[0][0].imageFilm,
      filmDetail: result.data.data[0][0].detailFilm,
      trailer: result.data.data[0][0].trailer,
    });
  };
  const saveEditProduct = async () => {
    console.log(newCategory);
    const result = await instance.put(`/editfilm/${idEdit}`, products);
    const result2 = await privateAxios.put(`/editCategoryFilmUpdate/${idEdit}`, {category: newCategory});
    setFilms(result2.data.data[0]);
    setCategoryForFilms(result2.data.data2);
    setOpenEdit("0vw");
    setProducts({
      name: "",
      duration: "",
      date: "",
      img: "",
      filmDetail: "",
      trailer: "",
      category: "",
    });
    setContent("Accept Update ^^!");
    setAlert("200px");
    setTimeout(() => {
      setAlert("0px");
    }, 1500);
  };
  const sortPriceDe = () => {
    let arr = [...productsRender];
    arr.sort((a, b) => b.price - a.price);
    setproductsRender(arr);
  };
  const sortPriceIn = () => {
    let arr = [...productsRender];
    arr.sort((a, b) => a.price - b.price);
    setproductsRender(arr);
  };
  const openfinda = () => {
    closeIn.current = "visible";
    setOpenFind("250px");
  };
  const closefinda = () => {
    closeIn.current = "hidden";
    setOpenFind("35px");
  };

  const changeValueFind = (e) => {
    let arrFind = productsFind.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
      );
    });
    setproductsRender(arrFind);
  };
  const debound = (arr, e) => {
    clearTimeout(time);

    var time = setTimeout(() => {
      arr(e);
    }, 2000);
  };           
  const closeUpdate = () => {
    setOpenEdit("0vw");
    setProducts({
      name: "",
      duration: "",
      date: "",
      img: "",
      filmDetail: "",
      trailer: "",
    })
    setNewCategory([]);
  } 
  return (
    <>
      <NavAdminn></NavAdminn>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "35px",
          zIndex: "100",
        }}
      >
        <div className="admin__bar2__input" onClick={openfinda}>
          <input
            type="text"
            style={{ width: openfind }}
            className="admin__bar2--input"
            onChange={(e) => {
              debound(changeValueFind, e);
            }}
            placeholder="Tìm kiếm theo tên"
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
      </div>
      <div className="adminProduct">
        <div className="admin__Alert" style={{ height: alert }}>
          <p>{content}</p>
          {idDelete ? (
            <div>
              <button onClick={deleteItemCP}>OK</button>
              <button
                onClick={() => {
                  setAlert("0px");
                  setIdDelete("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="adminProduct__render">
          <div className="adminProduct--addNew">
            <button
              onClick={() => {
                setOpenAddNew("75vh");
              }}
            >
              Add new Film +
            </button>
            <div
              className="admin__addNewProduct"
              style={{ height: openAddNew }}
            >
              <button
                onClick={() => {
                  setOpenAddNew("0vh");
                }}
              >
                close
              </button>
              <div style={{ display: "flex" }}>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="">Name</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="name"
                        value={products.name}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Category</label>
                    </td>
                    <td>
                      {/* <select name="category" onChange={changeValueCategory}>
                        <option value={""}>Category</option>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <option key={index} value={item.idCategory}>
                                {item.name}
                                <input type="checkbox" />
                              </option>
                            );
                          }
                        })}
                      </select> */}
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <div>
                                <input
                                  type="checkbox"
                                  name={index}
                                  value={item.idCategory}
                                  onChange={newCategoryforfilm}
                                  // checked={true}
                                 
                                />
                                {item.name}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Duration</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="duration"
                        value={products.duration}
                      />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Date</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="date"
                        onChange={changeValue}
                        name="date"
                        value={products.date}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Film Detail</label>
                    </td>
                    <td>
                      <textarea
                        cols="30"
                        rows="5"
                        type="text"
                        onChange={changeValue}
                        name="filmDetail"
                        value={products.filmDetail}
                      ></textarea>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Image</label>
                    </td>
                    <td>
                      <input type="file" onChange={changeImage} />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Trailer</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={changeValue}
                        name="trailer"
                        placeholder="link url"
                        value={products.trailer}
                      />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                </table>
                <div>
                  <div>
                    <h5>Poster</h5>
                    <div
                      style={{
                        width: "200px",
                        height: "280px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={products.img} alt="" width={200} height={280} />
                    </div>
                  </div>
                  {/* <iframe width="340" height="260" src="https://www.youtube.com/embed/FV3bqvOHRQo" title="Aquaman and the Lost Kingdom | Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

                  {/* <div>
                    <h5>Trailer</h5>
                    <div
                      style={{
                        width: "300px",
                        height: "200px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={urlImage2} alt="" width={300} height={200} />
                    </div>
                  </div> */}
                  <div>
                    <button
                      style={{ border: "1px solid brown" }}
                      onClick={saveNewProduct}
                    >
                      Save New Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="adminProduct--addNew">
            {/* <button onClick={()=>{setOpenAddNew("75vh")}}>Add new product +</button> */}
            <div className="admin__addNewProduct" style={{ width: openEdit }}>
              <button
                onClick={
                  closeUpdate
                }
              >
                close
              </button>
              <div style={{ display: "flex" }}>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="">Name</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="name"
                        value={products.name}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Category</label>
                    </td>
                    <td>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <div>
                                <input
                                  type="checkbox"
                                  name={index}
                                  value={item.idCategory}
                                  onChange={newCategoryforfilm}
                                  checked={newCategory.findIndex(ite=>ite==item.idCategory)==-1?false:true}
                                />
                                {item.name}
                              </div>
                            );
                          }
                        })}
                      </div>
                      {/* <select name="category" onChange={changeValueCategory}>
                        <option value={""}>{chosseCategory}</option>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <option key={index} value={item.idCategory}>
                                {item.name}
                              </option>
                            );
                          }
                        })}
                      </select> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Duration</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="duration"
                        value={products.duration}
                      />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Date</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="date"
                        onChange={changeValue}
                        name="date"
                        value={products.date}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Film Detail</label>
                    </td>
                    <td>
                      <textarea
                        cols="30"
                        rows="5"
                        type="text"
                        onChange={changeValue}
                        name="filmDetail"
                        value={products.filmDetail}
                      ></textarea>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Image</label>
                    </td>
                    <td>
                      <input type="file" onChange={changeImage} />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Trailer</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={changeValue}
                        name="trailer"
                        placeholder="link url"
                        value={products.trailer}
                      />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                </table>
                <div>
                  <div>
                    <h5>Poster</h5>
                    <div
                      style={{
                        width: "200px",
                        height: "280px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={products.img} alt="" width={200} height={280} />
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ border: "1px solid brown" }}
                      onClick={saveEditProduct}
                    >
                      Save Edit Film
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <th>Stt</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>
                Release Date
                {/* <button
                  onClick={sortPriceDe}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    padding: "0px",
                    borderRadius: "50%",
                  }}
                >
                  <HiArrowCircleDown />
                </button> */}
                {/* <button
                  onClick={sortPriceIn}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    padding: "0px",
                    borderRadius: "100%",
                  }}
                >
                  <HiArrowCircleUp />
                </button>{" "} */}
              </th>
              <th>Duration</th>
              <th>Action</th>
            </thead>
            <tbody>
              {productsPana?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item?.imageFilm} alt="" width={60} />
                    </td>
                    <td>{item?.nameFilm}</td>
                    <td>
                      {
                        categoryForFilms.map((itema)=>{
                          if(itema.idFilm == item.idFilm ){
                            return <span> {itema.name}, </span> 
                          }
                        })
                      }
                    </td>
                    <td>{item?.releaseDate}</td>
                    <td>{item?.duration}</td>
                    <td>
                      <button onClick={() => editItem(item.idFilm)}>
                        <FaEdit></FaEdit>
                      </button>
                      <button onClick={() => deleteItem(item.idFilm)}>
                        <MdDelete></MdDelete>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="adminProduct--pana">
            <GrPrevious onClick={prePage}></GrPrevious>
            {totalPage?.map((item) => {
              return (
                <div
                  className="dot"
                  onClick={() => {
                    setCurrentPage(item + 1);
                    changeColor();
                  }}
                >
                  {item + 1}
                </div>
              );
            })}
            <GrNext onClick={nextPage}></GrNext>
          </div>
        </div>
      </div>
    </>
  );
}
