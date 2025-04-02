import React from 'react';
import './loader.css';
import { Dialog } from '@mui/material';
const busIcon = process.env.PUBLIC_URL + 'assets/images/bus-icon.svg';

const Loader = () => {
  return (
    <>
      <Dialog
        open={true}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "400px", // Set fixed width
              height: "300px", // Set fixed height
              display: "flex", // Ensures loader is centered inside
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              borderRadius: "15px", // Optional: Rounded corners
            },
          },
        }}
      >
        {/* <div className="loader">

        </div> */}
        <div className="runningbus my-5">
          <div className="runningbusanim">
            <img src={busIcon} alt="" className="img-fluid" />
          </div>
        </div>
        <h4 className=''>Please Wait...</h4>
      </Dialog>
    </>
  );
};

export default Loader;

