// import { useEffect, useState } from 'react';
import './Home.css';
import LogInOrOut from '../LogInOrOut';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css'
import parker from './assets/img/speakers/1.jpg';
import yasir from './assets/img/speakers/2.jpg';



const Home = () => {
    return (
        <main id="main">
            <head>
            <meta charset="utf-8"></meta>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"></meta>
            <title>Civitas</title>

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet"></link>
            {/* css */}
            <link href="assets/vendor/aos/aos.css" rel="stylesheet"></link>
            <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></link>
            <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"></link>
            <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet"></link>
            <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" ></link>
            <link href="assets/css/style.css" rel="stylesheet" ></link>
                
            </head>

            <header id="header" className="d-flex align-items-center ">
            <div className="container-fluid container-xxl d-flex align-items-center">
                <div id="logo" className="me-auto" >
                    <a href="index.html" className="scrollto"></a>
                </div>
                
                <div className="nava" >
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                        <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                        <li><a className="nav-link scrollto" href="/calendar">Events Schedule</a></li>
                        <li><a className="nav-link scrollto" href="/Pay">Pay for Membership</a></li>
                        {/* <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li> */}
                       
                        </ul>
                    </nav>
                   
                </div>
            </div>
            </header >
           
            <section id="hero" >
                <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
                     <h1 className="mb-4 pb-0">Welcome<br></br><span>To</span> Civitas </h1>
                     <p className="mb-4 pb-0">Community Page</p>
                     
                     <div className="container" >
                     <LogInOrOut />
                     </div>
                </div>
            </section>

            <section id="speakers">
                <div className="container" data-aos="fade-up">
                    <div className="section-header">
                        <h2> Developers </h2>
                        <p>Here are our Developers </p>
                        
                    </div>
                    <div className="row">
                       <div className="col-lg-6 col-md-4">
                           <div className="speaker" data-aos="fade-up" data-aos-delay="100"> 
                                <img src = {parker} alt="Speaker 1" className="img-fluid"></img>
                                <div className="details">
                                        <h3><a> <span>Parker Sjogren</span> </a></h3>
                                        <p></p>
                                        <div className="social">
                                        <a href="https://www.linkedin.com/in/parkersjogren">
                                            <i className="bi bi-linkedin"></i>
                                            
                                            </a>
                                        <a href="https://github.com/ParkerSjogren">
                                         <i className="bi bi-github "  ></i>
                                        </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                           <div className="speaker" data-aos="fade-up" data-aos-delay="100"> 
                                <img src = {yasir} alt="Speaker 1" className="img-fluid"></img>
                                <div className="details">
                                        <h3><a> <span>Yasir Sabri </span></a></h3>
                                        <p></p>
                                        <div className="social">
                                        <a href="https://www.linkedin.com/in/yasir-sabri-5877079301/">
                                            <i className="bi bi-linkedin"></i>
                                            
                                            </a>
                                        <a href="https://github.com/Yasirzsabri">
                                         <i className="bi bi-github "  ></i>
                                        </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </section> 

            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
            <script src="assets/js/main.js"></script> 


        </main>
        
    );
}
 
export default Home;