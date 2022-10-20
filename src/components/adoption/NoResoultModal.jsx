import { Formik } from "formik"
import "./modaldog.css"
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import * as Yup from "yup";
import axios from 'axios'


const NoResoultModal = ({age, size, gender, name}) => {
    const schema = Yup.object().shape({
        fullName: Yup.string()
        .required("Pleasse enter your name"),
        
          email: Yup.string().email()
          .required("Pleasse enter a valid mail"),
          
        phone: Yup.string()
        .required("Pleasse enter your phone number")
        .min(10, "Phone number should containe 10 numbers exactly")
        .max(10, "Phone number should containe 10 numbers exactly")
        .matches(/[0-9]/, "phone number can contain numbers only."),
    });

    const [alert, setAlert] = useState(false)
    const [dogsOpenForAdoption, setDogsOpenForAdoption] = useState("")
      


    const form = useRef();
    const sendEmail = () => {
        // dogsOpenForAdoption === "0" &&
        emailjs.sendForm('service_fexworp', 'template_i6lbmm8', form.current, 'a-l6-BOufBazyXFlh')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    
    const [reqGender, setReqGender] = useState("");
    const [reqAge, setReqAge] = useState("");
    const [reqSize, setReqSize] = useState("");

    const sendData = (FullName, userEmail, Phone) => {
        const data = { 
            fullName: FullName,
            email: userEmail,
            phone: Phone,
            gender: reqGender, 
            age: reqAge, 
            size: reqSize, 
        };
          axios
            .post('/api/dogRequests', data)
            .catch((err) => console.log(err));
      };

    const searchFordog = (dogs) => {
        console.log(dogs.filter((val) => {
            if(reqGender == ""){
                return val;
            }else if(val.gender.includes(reqGender)){
                return val;
            }
        }).filter((val) => {
            if(reqAge == ""){
                return val;
            }else if(val.age.includes(reqAge)){
                return val;
            }
        }).filter((val) => {
            if(reqSize == ""){
                return val;
            }else if(val.size.includes(reqSize)){
                return val;
            }
        }))
        return(
            dogs.filter((val) => {
                if (val.adopted === false){
                if(reqGender === ""){
                    return val;
                }else if(val.gender.includes(reqGender)){
                    return val;
                }
            }}).filter((val) => {
                if(reqAge === ""){
                    return val;
                }else if(val.age.includes(reqAge)){
                    return val;
                }
            }).filter((val) => {
                if(reqSize === ""){
                    return val;
                }else if(val.size.includes(reqSize)){
                    return val;
                }
            })
        
        )
    }   

    const getDogs = () => {
            axios.get('/api/dogs')
                .then((res) => {
                    if (res.data) {
                        let val = searchFordog(res.data)
                        let amount = val.length.toString()
                        setDogsOpenForAdoption(amount);
                        return(amount); 
                    } 
                })
                .catch((err) => console.log(err));
        }

    const handleSubmition = (values) => {
        sendData(values.fullName, values.email, values.phone)
        getDogs()
        setAlert(true)
        }
  
      const [open, setOpen] = useState(false)
      const handleOpen = () => {setOpen(true)}
      const handleClose = () => {setOpen(false)}
  
      return(
          <div className='modal-container '>
              <button onClick={() => handleOpen()} type="button" className="btn btn-primary">
              {name}
              </button>
          { open &&
              <div className='modal-background '>
                  <div className='modal-fade-container no-resoult-modal'>
                      <div className='modal-title-contianer modal-header'>
                          <h5 className="modal-title left-to-right" id="exampleModalLabel">הזינו את פרטיכם</h5>
                          <button onClick={() => handleClose()} type="button" className="btn-close"/>
                      </div>
                      <div className='add-overflow'>
                          <div className='modal-body-contianer'>
                            <div className="modal-details-container ">
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {gender ? gender: "הכל" }
                                </button>
                                <ul className="dropdown-menu">
                                    <li  onClick={() => {setReqGender("זכר")}}><a className="dropdown-item" href="#">זכר</a></li>
                                    <li  onClick={() => {setReqGender("נקבה")}}><a className="dropdown-item" href="#">נקבה</a></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li  onClick={() => {setReqGender("")}}><a className="dropdown-item" href="#">הכל</a></li>
                                </ul>
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {age ? age: "הכל"} 
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => {setReqAge("עד שנה")}}><a className="dropdown-item" href="#">עד שנה</a></li>
                                    <li onClick={() => {setReqAge("מעל שנה")}}><a className="dropdown-item" href="#">מעל שנה</a></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li onClick={() => {setReqAge("")}}><a className="dropdown-item" href="#">הכל</a></li>
                                </ul>
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {size ? size: "הכל"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => {setReqSize("גדול/ה")}}><a className="dropdown-item" href="#">גדול/ה</a></li>
                                    <li onClick={() => {setReqSize("בינוני/ת")}}><a className="dropdown-item" href="#">בינוני/ת</a></li>
                                    <li onClick={() => {setReqSize("קטן/ה")}}><a className="dropdown-item" href="#">קטן/ה</a></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li onClick={() => {setReqSize("")}}><a className="dropdown-item" href="#">הכל</a></li>
                                </ul>
                            </div>
                              <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    phone: ""
                                }}
                                onSubmit={(values) => {
                                    handleSubmition(values)
                                    sendEmail()
                                }}
                                validationSchema={schema}
                              >
                                  {({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  errors,
                                  touched,
                                  }) => (
                                  <form ref={form} onSubmit={handleSubmit} noValidate>
                                      <div className="form-floating mb-3 right-to-left">
                                          <input name="fullName" type="text" className="form-control" id="floatingInput" placeholder="שם ושם משפחה*" onChange={handleChange} value={values.fullName} onBlur={handleBlur}/>
                                          <label for="floatingInput">שם ושם משפחה*</label>
                                          <p className="error-message">{errors.fullName && touched.fullName && errors.fullName}</p>
                                      </div>
                                      <div className="form-floating mb-3 right-to-left">
                                          <input name="email" type="email" className="form-control" id="floatingInput" placeholder=">אימייל*" onChange={handleChange} value={values.email} onBlur={handleBlur} />
                                          <label for="floatingInput">אימייל*</label>
                                          <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                      </div>
                                      <div className="form-floating mb-3 right-to-left">
                                          <input name="phone" type="text" className="form-control" id="floatingInput" placeholder="טלפון*" onChange={handleChange} value={values.phone} onBlur={handleBlur} />
                                          <label for="floatingInput">טלפון*</label>
                                          <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                      </div>
                                      <div className="form-floating mb-3 right-to-left">
                                          <textarea type="text" className="form-control" id="floatingInput" placeholder="הודעה אישית*"/>
                                          <label for="floatingInput">הודעה אישית*</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary no-resoult-btn right-to-left">שליחה</button>
                                  </form>
                                  )}
                              </Formik>
                                {dogsOpenForAdoption === "0" ? 
                                    <div class="alert alert-success right-to-left"  role="alert" hidden={!alert}>
                                        {"הנתונים נקלטו במאגר שלנו, נחזור אליך ברגע שנמצא התאמה"}  
                                    </div> :
                                    <div class="alert alert-danger"  role="alert" hidden={!alert}>
                                        {"נמצאו " + dogsOpenForAdoption + " התאמות"}  
                                    </div>
                                    }
                          </div>
                      </div>
                      <div className='modal-footer-contianer modal-footer'>
                          <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn right-to-left">סגור</button>
                      </div>
                  </div>
              </div>
              }
          </div>  
    )
}

export default NoResoultModal