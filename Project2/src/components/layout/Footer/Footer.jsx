import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineTwitter,AiOutlineInstagram,AiOutlineGoogle } from "react-icons/ai";
export default function Footer() {
  return (
    <MDBFooter bgColor='black' className='text-center text-lg-start text-muted'  >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'style={{
        backgroundColor:"black ",color:"white"
      }} >
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div >
          <a href='' className='me-4 text-reset'>
           <BiLogoFacebook></BiLogoFacebook>
          </a>
          <a href='' className='me-4 text-reset'>
            <AiOutlineTwitter></AiOutlineTwitter>
          </a>
          <a href='' className='me-4 text-reset'>
            <AiOutlineGoogle></AiOutlineGoogle>
          </a>
          <a href='' className='me-4 text-reset'>
            <AiOutlineInstagram></AiOutlineInstagram>
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className='' style={{backgroundColor:'black',color:'white'}}>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Shark Cinema <br></br>
                Fouder:Khuong Danh Hoang <br></br>
                Design:Khuong Danh Hoang 
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Address</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Cinema HaNoi
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cinema Hai Phong
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cinema Nam Dinh
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cinema Ho Chi Minh
                </a>
              </p>
          
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Ha Noi, Bac Tu Liem , VN
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                khuongdanhhoang123@gamil.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 07 9323 5498
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color:'whitesmoke' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href=''>
          SharkGame.com
        </a>
      </div>
    </MDBFooter>
  )
}
