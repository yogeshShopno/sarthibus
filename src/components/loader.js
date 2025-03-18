import React from 'react';
import './loader.css';
import { Dialog } from '@mui/material';

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
        <div className="loader">

        </div>
        <h2>Please Wait...</h2>
      </Dialog>
    </>
  );
};

export default Loader;

// import '../loader/loader.css'
// const Loader = () => {
//     return (
//         <>
//             <div class="loader-wrapper">
//                 <div class="truck-wrapper">
//                     <div class="truck">
//                         <div class="truck-container"></div>
//                         <div class="glases"></div>
//                         <div class="bonet"></div>

//                         <div class="base"></div>

//                         <div class="base-aux"></div>
//                         <div class="wheel-back"></div>
//                         <div class="wheel-front"></div>

//                         <div class="smoke"></div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Loader