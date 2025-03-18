import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Button, FormControl, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';
import DatePicker from 'react-datepicker';
import profileIcon from "../../Images/Untitled-3-01 (1).png";
import bg_img from "../../Images/Sarthi bus banner website (new)-01.jpg";
import { set } from 'date-fns';

const EditProfile = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [userID, setUserID] = useState(localStorage.getItem('UserID'))
    const [refferralCd, setRefferralCd] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [showPasswordIcon, setShowPasswordIcon] = useState(false)
    const [showrptPasswordIcon, setShowRptPasswordIcon] = useState(false)
    const [errors, setErrors] = useState({});
    const handleClickPassword = () => setShowPasswordIcon((show) => !show);
    const handleRptClickPassword = () => setShowRptPasswordIcon((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const [isEditing, setIsEditing] = useState(false);
    const [isFormVisiable, setIsFormVisiable] = useState(false);
    const [activeCard, setActiveCard] = useState('default');
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [gender, setGender] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validUpdateDetails = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Name is required';
            toast.error('Name is required');
        }
        if (!password) {
            newErrors.password = 'Password is required';
            toast.error('Password is required');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            updateProfile();
            setActiveCard('default')
        }
    }
    const updateProfile = async () => {
        let data = new FormData();
        data.append('user_id', userID)
        data.append('name', name)
        data.append('password', password)
        const formattedDOB = selectedDate instanceof Date && !isNaN(selectedDate)
            ? selectedDate.toISOString().split('T')[0] // Converts to 'YYYY-MM-DD'
            : null;

        data.append('dob', formattedDOB);
        data.append('gender', gender)
        try {
            await axios.post("edit_profile", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    // setLoginData(res.data.data)
                    // setShowOtpBox(true)
                    // setLoginBox(false)
                    setIsEditing(false);

                    toast.success(res.data.message)
                    // setTimeout(() => {

                    //     history.push('/')
                    // }, 2000);
                } else {
                    toast.error(res.data.message)
                }
            })
        } catch (error) {
            toast.error(error.data.message || 'API is not working');
        }
    }

    // const handlePasswordChange = () => {
    //     // Your password change logic here
    //     validUpdateDetails();  // This triggers the update process
    //     setActiveCard('default'); // Ensure the card returns to 'default' after updating
    // }
    const getProfileDate = async (searchTerm) => {
        let data = new FormData();
        data.append('user_id', userID)

        try {
            await axios.post("get_profile ", data

            ).then((res) => {
                setName(res.data.data.fname)
                setPassword(res.data.data.password)
                setMobileNo(res.data.data.number)
                setEmail(res.data.data.email)
                setSelectedDate(res.data.data.dob && !isNaN(new Date(res.data.data.dob)) ? new Date(res.data.data.dob) : new Date());
                setGender(res.data.data.gender)
                setUserID(res.data.data.id)
            })
        }
        catch (error) {
        }
    }

    useEffect(() => {
        getProfileDate()
    }, [])

    const handlePasswordChange = () => {
        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
        } else {
            validUpdateDetails();
            setActiveCard('default'); // Proceed with password change if valid
        }
    };
    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setGender(selectedGender);
    };

    return (

        <div className="tab-pane active" id="editprofile">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="profile--content--div" style={{ marginLeft: "5%" }}>
                <div className="prflmindiv">
                    <div className="edtprof--div">
                        <div className="eidtproftitle titlediv my-3">
                            <h5 className="text-capitalize fw-semibold fs-4">My Profile</h5>
                        </div>
                        <div className="profileinfo--collectdiv mt-4">
                            <form className="pasngerdet--colectform">
                                <div className="passengerticktcard">
                                    <div className="psngrdet--1 mt-3">

                                        {activeCard === "default" && (
                                            <Card className='col-md-12' >
                                                <div className='profile_bg_img '>
                                                    <img src={bg_img} className='img-fluid' style={{
                                                        height: '250px',
                                                        width: '100%',
                                                        objectFit: 'cover',
                                                        filter: "brightness(0.9)",
                                                        objectPosition: "top"
                                                    }}
                                                    />
                                                    <Avatar className='Profle_icon' src={profileIcon} style={{ height: '71%', width: ' 133px', padding: '2%', backgroundColor: 'white', marginTop: "-75px", marginLeft: '15px', boxShadow: '0 10px 14px #dddddd8a' }}></Avatar>
                                                </div>
                                                <div className="roww px-4">
                                                    <div className="proff000 mt-3">
                                                        <div className="mb-4 form-group d-flex" style={{ flexDirection: 'column', gap: '25px', justifyContent: "center" }}>

                                                        </div>

                                                        <div className="mb-4 form-group d-flex" style={{ flexDirection: 'column', gap: '19px', justifyContent: "center" }}>

                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="name" className="form-label fs-6 fw-semibold text-capitalize col-md-4">Name : </label>
                                                                <div className='col-md-8'>
                                                                    {name}
                                                                </div>
                                                            </div>
                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="mobilenumber" className="form-label fs-6 fw-semibold text-capitalize col-md-4">mobile number : </label>
                                                                <div className='col-md-8'>
                                                                    {mobileNo}
                                                                </div>
                                                            </div>
                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="email" className="form-label fs-6 fw-semibold text-capitalize col-md-4">email : </label>
                                                                <div className='col-md-8'>
                                                                    {email}
                                                                </div>
                                                            </div>
                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="password" className="form-label fs-6 fw-semibold text-capitalize col-md-4">Password : </label>
                                                                <div className='col-md-8'>
                                                                    <FormControl variant="outlined" className="form-control default_sec_dis_pass">
                                                                        <OutlinedInput
                                                                            value={password}
                                                                            size="small"
                                                                            sx={{ minWidth: 370 }}
                                                                            placeholder="Password"
                                                                            id="outlined-basic"
                                                                            disabled
                                                                            type={showPasswordIcon ? 'text' : 'password'}
                                                                            endAdornment={
                                                                                <InputAdornment position="end">
                                                                                    <IconButton
                                                                                        aria-label="toggle password visibility"
                                                                                        disabled
                                                                                    >
                                                                                        {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                                    </IconButton>
                                                                                </InputAdornment>
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="dob" className="form-label fs-6 fw-semibold text-capitalize col-md-4">DOB : </label>
                                                                <div className='col-md-8' >
                                                                    <DatePicker
                                                                        selected={selectedDate || '- - -'}
                                                                        onChange={() => { }} // Disable date change in this card
                                                                        dateFormat="d MMM yyyy"
                                                                        className="custom-date-input default_sec_datepicker"
                                                                        style={{ border: "1px solid gray" }}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="form-group00 fs-6 row ">
                                                                <label htmlFor="gender" className="form-label fs-6 fw-semibold text-capitalize col-md-4">Gender : </label>
                                                                <RadioGroup
                                                                    className='col-md-8'
                                                                    aria-label="gender"
                                                                    name="gender"
                                                                    value={gender}
                                                                    onChange={handleGenderChange}
                                                                    row

                                                                >
                                                                    <FormControlLabel value="Male" control={<Radio disabled />} label="Male" />
                                                                    <FormControlLabel value="Female" control={<Radio disabled />} label="Female" />
                                                                    <FormControlLabel value="Other" control={<Radio disabled />} label="Other" />
                                                                </RadioGroup>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </Card>
                                        )}
                                        {activeCard === 'edit' && (
                                            <Card className='p-3 col-md-12' >
                                                <div className="roww">
                                                    <div className="col-md-9 mt-3 mx-auto">
                                                        <div className="mb-4 form-group">
                                                            <label htmlFor="name" className="form-label fs-6 fw-semibold text-capitalize edit_profile_flds">Name</label>
                                                            <div className='customfield'>
                                                                <TextField size='small' className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 form-group">
                                                            <label htmlFor="mobilenumber" className="form-label fs-6 fw-semibold text-capitalize edit_profile_flds">mobile number</label>
                                                            <div className='customfield'>
                                                                <TextField size='small' className="form-control edit_sec_dis" placeholder="Mobile Number" disabled value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 form-group">
                                                            <label htmlFor="email" className="form-label fs-6 fw-semibold text-capitalize edit_profile_flds">email</label>
                                                            <div className='customfield'>
                                                                <TextField size='small' className="form-control edit_sec_dis" placeholder="Email" value={email} disabled onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 form-group">
                                                            <label htmlFor="password" className="form-label fs-6 fw-semibold text-capitalize edit_profile_flds">Password</label>
                                                            <div className='customfield'>
                                                                <FormControl variant="outlined" className="form-control edit_sec_pass_fld">
                                                                    <OutlinedInput
                                                                        value={password}
                                                                        size="small"
                                                                        sx={{ minWidth: 370 }}
                                                                        placeholder="Password"
                                                                        id="outlined-basic"
                                                                        type={showPasswordIcon ? 'text' : 'password'}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        endAdornment={
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    aria-label="toggle password visibility"
                                                                                    onClick={handleClickPassword}
                                                                                    onMouseDown={handleMouseDownPassword}
                                                                                >
                                                                                    {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                        <div className="form-label mb-4" >
                                                            <label htmlFor="dob" className="form-label fs-6 fw-semibold text-capitalize">DOB</label>

                                                            <div className='customfield'>
                                                                <DatePicker
                                                                    selected={selectedDate}
                                                                    onChange={(date) => setSelectedDate(date)}
                                                                    dateFormat="d MMM yyyy"
                                                                    className="custom-date-input"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-label mb-4">
                                                            <label htmlFor="gender" className="form-label fs-6 fw-semibold text-capitalize">Gender</label>

                                                            <RadioGroup
                                                                aria-label="gender"
                                                                name="gender"
                                                                value={gender}
                                                                onChange={(e) => setGender(e.target.value)}
                                                                row
                                                            >
                                                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )}

                                        {activeCard === 'changePassword' && (
                                            <Card className='p-3 col-md-12' >
                                                <div className="roww">
                                                    <div className="col-md-9 mt-3 mx-auto">

                                                        <div className="mb-4 form-group edit_profile_flds">
                                                            <label htmlFor="email" className="form-label fs-6 fw-semibold text-capitalize">New Password</label>
                                                            <div className='customfield'>

                                                                <FormControl variant="outlined" className="form-control edit_sec_pass_fld">
                                                                    <OutlinedInput
                                                                        value={password}
                                                                        size="small"
                                                                        sx={{ minWidth: 370 }}
                                                                        placeholder="Password"
                                                                        id="outlined-basic"
                                                                        type={showPasswordIcon ? 'text' : 'password'}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        endAdornment={
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    aria-label="toggle password visibility"
                                                                                    onClick={handleClickPassword}
                                                                                    onMouseDown={handleMouseDownPassword}
                                                                                >
                                                                                    {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 form-group edit_profile_flds">
                                                            <label htmlFor="email" className="form-label fs-6 fw-semibold text-capitalize">Repeat Password</label>
                                                            <div className='customfield'>
                                                                <FormControl variant="outlined" className="form-control edit_sec_pass_fld">
                                                                    <OutlinedInput
                                                                        value={repeatPassword}
                                                                        size="small"
                                                                        sx={{ minWidth: 370 }}
                                                                        placeholder="Password"
                                                                        id="outlined-basic"
                                                                        type={showrptPasswordIcon ? 'text' : 'password'}
                                                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                                                        endAdornment={
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    aria-label="toggle password visibility"
                                                                                    onClick={handleRptClickPassword}
                                                                                    onMouseDown={handleMouseDownPassword}
                                                                                >
                                                                                    {showrptPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )}

                                        <div className="d-flex form-group gap-5 justify-content-end mb-4 mt-5 text-end">
                                            {activeCard === "default" && (
                                                <Button variant='contained' onClick={() => { setActiveCard('edit') }} style={{ backgroundColor: "rgb(121 44 143)", width: "30%" }}> Edit </Button>
                                            )}
                                            {activeCard === "edit" && (
                                                <Button variant='contained' onClick={() => { validUpdateDetails(); }} style={{ backgroundColor: "rgb(121 44 143)", width: "30%" }}> Update </Button>
                                            )}
                                            {activeCard === "default" && (
                                                <Button variant='contained' onClick={() => { setActiveCard("changePassword") }} style={{ backgroundColor: "white", color: 'rgb(121 44 143)', width: "30%", border: "1px solid rgb(121 44 143)" }}>Change Password</Button>
                                            )}

                                            {activeCard === "changePassword" && (

                                                <Button variant='contained' onClick={() => { setActiveCard('default') }} style={{ backgroundColor: "white", color: 'rgb(121 44 143)', width: "30%", border: "1px solid rgb(121 44 143)" }}>Back</Button>
                                            )}

                                            {activeCard === "changePassword" && (

                                                <Button variant='contained' onClick={() => { handlePasswordChange() }} style={{ backgroundColor: "rgb(121 44 143)", width: "30%" }}>Change Password</Button>
                                            )}

                                        </div>
                                        <div className="mb-4 form-group text-end mt-5">
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default EditProfile;
