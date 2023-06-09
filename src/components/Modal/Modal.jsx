import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Modal.css";

export default function Modal({ currPlot, setShowModal, addPlot }) {
  const [checkedValue, setCheckedValue] = useState(true);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gym = e.target.gym.checked;
    const restaurant = e.target.restaurant.checked;
    const hospital = e.target.hospital.checked;
    let servicesArray = [];

    if (!gym && !restaurant && !hospital && !checkedValue) {
      alert("Please select any one service");
      return;
    }
    if (gym) servicesArray.push("Gym");
    if (restaurant) servicesArray.push("Restaurant");
    if (hospital) servicesArray.push("Hospital");

    let [x, y] = currPlot.split("");
    if (checkedValue) {
      addPlot(+x, +y);
    } else {
      addPlot(+x, +y, servicesArray);
    }

    setShowModal(false);
  };
  return (
    <div className="ModalContainer">
      <div className="ModalHeader">
        <h4>Plot Number {currPlot} </h4>
        <div className="closeIcon" onClick={handleClose}>
          <AiOutlineCloseCircle />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="radio"
            name="Home"
            checked={true === checkedValue}
            onChange={() => setCheckedValue(true)}
            value="house"
          />
          House
        </div>
        <div>
          <input
            type="radio"
            name="Services"
            value="Services"
            checked={false === checkedValue}
            onChange={() => setCheckedValue(false)}
          />
          Services
        </div>

        <div className="CheckBoxWrapper">
          <div>
            <input
              type="checkbox"
              name="hospital"
              value="Hospital"
              disabled={checkedValue}
              defaultChecked
            />{" "}
            Hospital
          </div>
          <div>
            <input
              type="checkbox"
              name="restaurant"
              value="Restaurant"
              disabled={checkedValue}
            />{" "}
            Restaurant
          </div>
          <div>
            <input
              type="checkbox"
              name="gym"
              value="Gym"
              disabled={checkedValue}
            />{" "}
            Gym
          </div>
        </div>

        <div>
          <button className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
