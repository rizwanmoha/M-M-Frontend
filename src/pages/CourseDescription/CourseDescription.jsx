import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import {addToWl } from '../../store/auth';

import {Link, useNavigate, useParams} from 'react-router-dom'; 
import styles from './CourseDescription.module.css'; 

import playButton from './images/play-button.png'; 
import courseContentIcon from './images/course-content-icon.png'; 
import martyPic from './images/marty-pic.jpg'; 
import tv from './images/tv.png';
import subtitles from './images/subtitles.png';
import highFive from './images/high-five.png';
import hours from './images/24-hours.png';
import checkmark from './images/checkmark.png'
import certificate from './images/certificate.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Input, InputAdornment, Skeleton, TextField } from '@mui/material';



function capitalizeFirstLetter(string) {
  if(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}



const CourseDetails = () => {

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

    const [comment, setComment] = useState('');
    const [courseComments, setCourseComments] = useState([]);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

 

    useEffect(() => {
      if(user?.isLoggedin == false){
        setIsPurchased(false);
        setIsWishlisted(false);
        return ;
      }
      if(user?.wishlist?.find(course => course._id === params.courseId)){
        setIsWishlisted(true);
      }
      console.log(user?.courses)
      if(user?.courses?.find(course => course?.course?._id === params.courseId)){
        setIsPurchased(true);
      }
      if(user.isLoggedin == false){
        setIsPurchased(false);
        setIsWishlisted(false);
      }
    },[user?.wishlist, user?.courses, user?.isLoggedin])
    
    async function getCourseComments() {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/course/get-comments",
          {
            courseId: params.courseId,
          }
        );

        if (res.status === 200) {
          console.log(res.data.comments);
          setCourseComments(res.data.comments);
        }
      } catch (e) {
        console.log(e);
      }
    }


    useEffect(() => {
      async function getCourseInfo() {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/course/description/${params.courseId}`
          );
          if (res.status == "200") {
            setCourse(res.data.course);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          toast.error("Something Went Wrong, Please try again");
        }
      }


      getCourseInfo();
      getCourseComments();
    }, []);


    async function addToWishlist(){
      if(user?.isLoggedin == false){
        toast.info('Please Login to add to wishlist');
        navigate('/login');
        return ;
      }
      if(isPurchased){
        toast.info('Already Bought')
        return ;
      }
      if(isWishlisted){
        toast.info('Already in Wishlist');
        return ;
      }
      try {
        const req = await axios.post('http://localhost:8000/api/v1/user/add-to-wl', {
          userId: user?.id,
          courseId: params.courseId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token,
          }

        })

        if(req.status === 200){
          toast.success('Added to Wishlist');
          dispatch(addToWl(course));
        }}
         catch (e){
          console.log(e);
          toast.error('Failed to add to wishlist');
        }

    }

    function purchaseCourseHandler(){
      if(!user?.isLoggedin){
        toast.error("Please Login to Buy Course")
        navigate('/login')
        return ;
      }
      if(isPurchased){
        navigate(`/course/${params.courseId}`)
      } else {
        navigate(`/checkout/${params.courseId}`)
      }
    }

    async function commentHandler(e){
      e.preventDefault();
      if(comment == ""){
        toast.info("Please Enter a Comment")
        return ;
      }
      try {
        const request = await axios.post('http://localhost:8000/api/course/add-comment', {
          courseId: params.courseId,
          comment: comment,
          userId: user?.id
        })

        if(request.status === 200){
          getCourseComments();
          toast.success('Comment Added');
          setComment('');
        }

      } catch (e) {
        console.log(e)
        toast.error("Something Went Wrong");
      }

    }

  return (
    <Fragment>
      <div className="bg-slate-300">
        <div className={styles.maintop}>
          <div className={styles.courseContainer}>
            <div className="row px-5 mx-4">
              <div className="col-lg-8 px-3">
                <div className={styles["course-title"]}>
                  <h1
                    style={{
                      fontFamily: "Archivo Black",
                      color: "aqua",
                      fontSize: "2.5rem",
                      letterSpacing: "-.02rem",
                      fontWeight: 600,
                    }}
                  >
                    {!loading ? (
                      course?.title
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={500}
                        sx={{
                          width: "100%",
                          fontSize: "2.5rem",
                          backgroundColor: "hsl(0, 0%, 22%)",
                        }}
                      />
                    )}
                  </h1>
                </div>
                <div className={styles["course-info"]}>
                  <p>
                    {!loading ? (
                      course?.description
                    ) : (
                      <Fragment>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            width: "100%",
                            fontSize: "1.2rem",
                            backgroundColor: "hsl(0, 0%, 22%)",
                          }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{
                            width: "100%",
                            fontSize: "1.2rem",
                            backgroundColor: "hsl(0, 0%, 22%)",
                          }}
                        />
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="d-flex mb-2">
                  <div className="w-[60%]">
                    {!loading ? (
                      <Fragment>
                        <div className="flex">
                          <span className="mr-3">4.0</span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                          <span className="mx-2">(22 Ratings)</span>
                        </div>
                      </Fragment>
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          width: "200",
                          fontSize: "1rem",
                          backgroundColor: "hsl(0, 0%, 22%)",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.author}>
                  <Link to="#">
                    {!loading ? (
                      <div
                        onClick={() => {
                          navigate(`/teacher/${course?.teacher[0]?._id}`);
                        }}
                      >
                        Created By{" "}
                        {capitalizeFirstLetter(course?.teacher[0]?.firstName)}
                      </div>
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={300}
                        sx={{
                          width: "80%",
                          fontSize: "1.5rem",
                          backgroundColor: "hsl(0, 0%, 22%)",
                        }}
                      />
                    )}
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className={styles["course-leftbar"]}>
                  <div className="inner">
                    <div
                      className={`card d-none d-lg-block p-0`}
                      style={{
                        width: "20rem",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <img
                        src={course?.imageUrl}
                        className="card-img-top"
                        alt="Card image cap"
                      />
                      <a href="#">
                        <div className={styles.play}>
                          <img src={playButton} width="40px" />
                        </div>
                      </a>
                      <div className="card-body">
                        <h5
                          className="card-title prc"
                          style={{ color: "black", marginBottom: "1.5rem" }}
                        >
                          <div className="flex justify-between">
                            <div style={{ fontFamily: "quicksand" }}>
                              Price :{" "}
                            </div>
                            <div style={{ fontFamily: "quicksand" }}>
                              {course?.price}
                            </div>
                          </div>
                        </h5>
                        <p
                          className={styles.cardDesc}
                          style={{ color: "black" }}
                        >
                          {!loading ? (
                            course?.description.slice(0,200)+"..."
                          ) : (
                            <Fragment>
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ width: "100%", fontSize: "1rem" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ width: "100%", fontSize: "1rem" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ width: "100%", fontSize: "1rem" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ width: "54%", fontSize: "1rem" }}
                              />
                            </Fragment>
                          )}
                        </p>
                        <div className="d-flex justify-content-between">
                          <button
                            className={styles.cardButton}
                            style={
                              isPurchased ? { backgroundColor: "green" } : {}
                            }
                            onClick={purchaseCourseHandler}
                          >
                            {isPurchased ? "Go To Course" : "Buy This Course"}
                          </button>
                          <button
                            className={styles.cardButton}
                            style={
                              isWishlisted ? { backgroundColor: "green" } : {}
                            }
                            onClick={addToWishlist}
                          >
                            {isWishlisted
                              ? "Already in Wishlist"
                              : "Add To Wishlist"}
                          </button>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.courseContainer}>
          <div className="row g-5">
            <div className="col-lg-8">
              <div className={styles.course_info}>
                <div
                  className={`${styles.thumnail} ${styles.courseBox} ${styles["container-img"]}`}
                >
                  <img src={martyPic} alt="" className="w-100" />
                  <div className={styles["bottom-right"]}>
                    <div style={{ color: "black" }}></div>
                    <div></div>
                  </div>
                </div>

                <div className={styles.courseBox}>
                  <div className={styles.titleStyle1}>
                    <div className={styles.style1}>Course Content: </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className={styles.list1}>
                        {!loading ? (
                          <ul className={styles.list1}>
                            {course?.sections?.map((section, index) => {
                              return (
                                <li className="mt-0" key={section._id}>
                                  <span className={`${styles.greentick} mt-0`}>
                                    <img
                                      src={courseContentIcon}
                                      alt=""
                                      width="20px"
                                    />
                                  </span>
                                  {index + 1}.
                                  <a
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      marginLeft: "6px",
                                    }}
                                    href="#"
                                  >
                                    {" " + section.name}
                                  </a>
                                  <hr style={{ color: "black" }} />
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <Fragment>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{
                                width: "100%",
                                fontSize: "1rem",
                                borderRadius: 0,
                              }}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{
                                width: "100%",
                                fontSize: "1rem",
                                borderRadius: 0,
                                marginTop: "4px",
                              }}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{
                                width: "100%",
                                fontSize: "1rem",
                                borderRadius: 0,
                                marginTop: "4px",
                              }}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{
                                width: "100%",
                                fontSize: "1rem",
                                borderRadius: 0,
                                marginTop: "4px",
                              }}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{
                                width: "100%",
                                fontSize: "1rem",
                                borderRadius: 0,
                                marginTop: "4px",
                              }}
                            />
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.courseBox}>
                  <div className={styles.titleStyle1}>
                    <div className={styles.style1}>This Course Includes: </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className={styles.list1}>
                        <ul className={styles.list1}>
                          <li className="mt-0">
                            <span className={`${styles.greentick} mt-0`}>
                              <img src={tv} alt="" width="20px" />
                            </span>
                            10 Hours of Video Lectures
                          </li>
                          <li className="mt-0">
                            <span className={`${styles.greentick} mt-0`}>
                              <img src={subtitles} alt="" width="20px" />
                            </span>
                            Closed Captions
                          </li>

                          <li className="mt-0">
                            <span className={`${styles.greentick} mt-0`}>
                              <img src={highFive} alt="" width="20px" />
                            </span>
                            Community Support
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className={styles.list1}>
                        <ul className={styles.list1}>
                          <li className="mt-0">
                            <span className={`${styles.greentick} mt-0`}>
                              <img src={hours} alt="" width="20px" />
                            </span>
                            Live Support 24/7
                          </li>
                          <li className="mt-0">
                            <span className={`${styles.greentick} mt-0`}>
                              <img src={certificate} alt="" width="20px" />
                            </span>
                            Certification
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Other course boxes */}
                </div>

                <div className={`${styles.courseBox} mt-4`}>
                  <div className={styles.courseContent}>
                    <div className="row g-5 mb-5">
                      <div className="col-lg-6">
                        <div className="title">
                          <div className={styles.titleStyle1}>
                            <h4 className={styles.style1}>Requirements</h4>
                          </div>
                        </div>
                        <div className={`${styles.list1} ${styles.req}`}>
                          <ul className={`${styles.list1} ${styles.req}`}>
                            <li className="mt-0">
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              No Prior Experience Required.
                            </li>
                            <li className="mt-0">
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              A working Internet connection.
                            </li>
                            <li>
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              Access to a well tuned Guitar.
                            </li>

                            
                          </ul>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="title">
                          <div className={styles.titleStyle1}>
                            <h4 className={styles.style1}>Decription</h4>
                          </div>
                        </div>
                        <div className={`${styles.list1} ${styles.req}`}>
                          <ul className={`${styles.list1} ${styles.req}`}>
                            <li className="mt-0">
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              Learn Basics of Music Notes
                            </li>
                            <li className="mt-0">
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              Be Able to Play Pop Songs
                            </li>
                            <li>
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" className="pt-1" />
                              </span>
                              Become an advanced Guitar Player.
                            </li>

                            {/* <li>
                              <span className={`${styles.greentick} mt-0`}>
                                <img src={checkmark} alt="" />
                              </span>
                              A Burning Passion to Learn.
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.courseBox} mt-4`}>
                  <div className={styles.titleStyle1}>
                    <div className={styles.commentTitle}>Comments : </div>
                    <div className="mt-4">
                      <form noValidate autoComplete="off">
                        <div className="flex flex-col">
                          <TextField
                            id="comment-input"
                            label="Add a comment"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                            
                                </InputAdornment>
                              ),
                            }}
                            value={comment}
                            onChange={handleChange}
                          />
                          <div className="flex justify-end">
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ width: "6rem", marginTop: "1rem" }}
                              onClick={(e) => commentHandler(e)}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>

                      <div>
                        {courseComments && courseComments?.map((comment)=>{
                          return (<div key={comment._id} className='text-slate-950 border-2 p-2 mt-2 border-violet-900 rounded-xl'>
                          <div className='ml-5 '>
                          {comment.comment}
                          </div>
                          </div>)
                          
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseDetails;


//                     <div className="course-content">
//                         <div className="row g-5 mb-5">
//                             <div className="col-lg-6">
//                                 <div className="title">
//                                     <div className="title-style">
//                                         <h4 className = "style1">Requirements</h4>
//                                     </div>
//                                 </div>
//                                 <div className="list1 req">
//                                     <ul className="list1 req">
//                                         <li className="mt-0">
//                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
//                                             No Prior Experience Required. 
//                                         </li>
//                                         <li className="mt-0">
//                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
//                                             A working Internet connection. 
//                                         </li>
//                                         <li>
//                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
//                                             Access to a well tuned Guitar.
//                                         </li>

//                                         <li>
//                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/>
//                                             </span>
//                                             A Burning Passion to Learn. 
//                                         </li>
                        
//                                     </ul>
//                                 </div>
//                             </div>

// //                             <div className="col-lg-6">
// //                                 <div className="title">
// //                                     <div className="title-style">
// //                                         <h4 className = "style1">Description</h4>
// //                                     </div>
// //                                 </div>
// //                                 <div className="list1 req">
// //                                     <ul className="list1 req">
// //                                         <li className="mt-0">
// //                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
// //                                             Learn Basics of Music Notes and pitches 
// //                                         </li>
                                      

// //                                         <li>
// //                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
// //                                             Be Able to Play Pop Songs
// //                                         </li>
// //                                         <li>
// //                                             <span className = "greentick mt-1"><img src="/images/checkmark.png" alt=""/></span>
// //                                             Become an advanced and confident Guitar Player within a month. 
// //                                         </li>
                                      
                        
// //                                     </ul>
// //                                 </div>
// //                             </div>
// //                         </div>

                       
// //                     </div>
                    
// //                     </div>
// //                     <div className="course-box" style="margin-bottom: 10px;">
// //                         <div className="title">
// //                             <div className="title-style">
// //                                 <h4 className = "style1">Rating</h4>
// //                             </div>
// //                         </div>

// //                         <div className="row g-5 mb-5">
// //                             <div className="col-lg-12">
// //                                 <div className="ratingval">
// //                                     <div className="numb">4.3</div>
// //                                     <div className="rating">
                                   
// //                                 <span className="fa fa-star checked"></span>
// //                                 <span className="fa fa-star checked"></span>
// //                                 <span className="fa fa-star checked"></span>
// //                                 <span className="fa fa-star checked"></span>
// //                                 <span className="fa fa-star"></span>
// //                                 </div>

// //                                 <span className="gb">
// //                                    Course Rating
// //                                 </span>
// //                                 </div>
// //                             </div>


// //                             <a href="/checkout" className="btn btn-dark">Buy This Course</a>
// //                                   <a href="/wishlist" className="btn btn-dark">Add to Wishlist</a>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
            // </div>
            // </div>
//             </div>
//             </div>
//         </div>

//         </div>
//             </Fragment>


//     )

// }


// export default CourseDescription;