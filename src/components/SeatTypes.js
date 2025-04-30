import React from "react"
const SeatType = () =>{
return(<>
<div className="col-xxl-4">

<div className="w-100 justify-content-between knowabt3">
  <h5 className="my-4">
    Know About Seats
    Type
  </h5>
  <div className="row justify-content-center">
    <div className="col-xxl-12 col-4">
      <div
        className="d-flex flex-column-reverse flex-xxl-row justify-content-between"
        style={{
          alignItems:
            "center"
        }}
      >
        <h6 className="text-secondary">
          Not
          Available
        </h6>
        <div className="seat-gray mb-3">
          <span className="text-black fs-6"></span>
          <label></label>
        </div>
      </div>
    </div>
    <div className="col-xxl-12 col-4">
      <div
        className="d-flex flex-column-reverse flex-xxl-row justify-content-between"
        style={{
          alignItems:
            "center"
        }}
      >
        <h6 className="text-secondary">

          Available
        </h6>
        <div className="seat-available mb-3">
          <span className="text-black fs-6"></span>
          <label></label>
        </div>
      </div>
    </div>
    <div className="col-xxl-12 col-4">
      <div
        className="d-flex flex-column-reverse flex-xxl-row justify-content-between"
        style={{
          alignItems:
            "center"
        }}
      >
        <h6 className="text-secondary">

          Selected
        </h6>
        <div className="seat-selected mb-3">
          <span className="text-black fs-6"></span>
          <label></label>
        </div>
      </div>
    </div>
  </div>

</div>
</div>
</>)
}

export default SeatType

