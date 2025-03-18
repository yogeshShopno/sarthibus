import { useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Otp() {
    const [otp, setOtp] = useState()
    const [errors, setErrors] = useState({});
    const history = useHistory()
    const handleOtp = () => {
        const newErrors = {};
        if (!otp) {
            newErrors.otp = 'please enter Otp';
            toast.error('Please enter Otp');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
        }
    };
    return (
        <>
            <div className="center-container" >
                <div className="form-wrapper">
                    <form >
                        <div className="my-4">
                            <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Enter OTP</h5>
                            <span style={{ color: "#6c2a7f", fontWeight: 500 }}  >Please enter the OTP sent to your number</span>
                        </div>
                        <div>
                            <div className="mt-4 mb-1">
                                <TextField
                                    required
                                    type="number"
                                    id="outlined-number"
                                    sx={{ minWidth: 370 }}
                                    size="small"
                                    value={otp}
                                    placeholder="Enter otp"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-end mb-4">
                                <span style={{ color: "blue", fontWeight: 500, cursor: "pointer" }}>Re-send otp</span>
                            </div>
                            <div className="d-flex justify-content-center gap-4">
                                <Button onClick={() => history.push('/user-info')} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Back</Button>
                                <Button variant="contained" onClick={handleOtp} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Register</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}