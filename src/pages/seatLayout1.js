import React, { useEffect, useState } from "react";
// import seatData from "./seatLayout.json";
import { GiSteeringWheel } from "react-icons/gi";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import './layout.css';
import SeatType from "../components/SeatTypes";

const SeatLayout1 = ({ busLayoutData, selectedSeatsFromParent = [], onSeatsChange }) => {

  const seatEmpty = process.env.PUBLIC_URL + "assets/images/imgpsh_fullsize_anim (3).png";
  const seatBlack = process.env.PUBLIC_URL + "assets/images/seat-black.png";
  const seatBlue = process.env.PUBLIC_URL + "assets/images/seat purpule.png";
  const location = useLocation();

  const occupied = {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (selectedSeatsFromParent && selectedSeatsFromParent.length > 0) {
      setSelectedSeats(selectedSeatsFromParent);
    }
  }, [selectedSeatsFromParent]);

  const handleSelect = (seat) => {
    if (seat.is_booked || seat.seat_type === "G") return;

    setSelectedSeats((prev) => {
      const updatedSeats = prev.some((s) => s.seat_number === seat.seat_number)
        ? prev.filter((s) => s.seat_number !== seat.seat_number)
        : [...prev, seat];

      if (onSeatsChange) {
        onSeatsChange(updatedSeats); // call parent's function with latest selected seats
      }
      return updatedSeats;
    });
  };

  const renderTable = () => {
    return Object.keys(busLayoutData).map((rowKey) => {
      const row = busLayoutData[rowKey];

      // Check if all seats in the row have BlockType === 3
      const isAllGallery = Object.keys(row).every((colKey) => {
        const seat = row[colKey];
        return seat.BlockType === 3;
      });

      // Skip rendering this row if all seats have BlockType 3
      if (isAllGallery) return null;

      return (
        <tr key={rowKey} className="flex flex-row bg-lime-600">
          {Object.keys(row).map((colKey) => {
            const seat = row[colKey];
            const rowIndex = parseInt(rowKey);
            const colIndex = parseInt(colKey);

            if (occupied[`${rowIndex}-${colIndex}`] || seat === "_occupied_") return null;
            if (!seat) return <td key={colKey}></td>;

            let rs = parseInt(seat.RowSpan || 1);
            let cs = parseInt(seat.ColumnSpan || 1);
            if (rs === 0) rs = 1;
            if (cs === 0) cs = 1;

            // Mark occupied cells
            for (let r = 0; r < rs; r++) {
              for (let c = 0; c < cs; c++) {
                if (r === 0 && c === 0) continue;
                occupied[`${rowIndex + r}-${colIndex + c}`] = true;
              }
            }

            let className = " ";
            if (seat.seat_type === "G") className += " gallery";
            else if (seat.seat_number) {
              className += " sleeper ";
            };

            return (
              <td
                key={colKey}
                rowSpan={rs}
                colSpan={cs}
                onClick={() => handleSelect(seat)}
              >
                <div
                  className={
                    className +
                    (seat.is_booked ? " booked " : " available ") +
                    (selectedSeats.includes(seat) ? " selected" : "") +
                    (seat.ColumnSpan == 2 ? " rotate-seat" : "")
                  }
                >
                  {className.includes("sleeper ") ? (
                    <div className="stacked-seat">
                      {seat.seat_type === "UB" && (
                        <>
                          <div className="deck">Upper</div>
                          <div>{seat.seat_number}</div>
                          <div className="seat-price">{seat.seat_price}</div>
                        </>
                      )}
                      {seat.seat_type === "LB" && (
                        <>
                          <div className="deck">Lower</div>
                          <div className="seat-number">{seat.seat_number}</div>
                          <div className="seat-price">{seat.seat_price}</div>
                        </>
                      )}
                    </div>
                  ) : (   
                    <div className="seater">
                      <img
                        className="seatLayout2"
                        src={seat.is_booked ? seatBlack : selectedSeats.includes(seat) ? seatBlue : seatEmpty}
                      />
                      <div>{seat.seat_number}</div>
                      <div className="seat-price">{seat.seat_price}</div>
                    </div>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <>
      <div className="layout gap-2 flex-column flex-lg-row customrow">
        <table className="main-table rrrr">
          <GiSteeringWheel
            style={{
              fontSize: "5.5rem",
              color: "rgb(121 44 143)",
              alignSelf: "flex-end",
              margin: "10px"
            }}
          />
          <tbody>{renderTable()}</tbody>
        </table>
        <SeatType />
      </div>
    </>
  );
};

export default SeatLayout1;
