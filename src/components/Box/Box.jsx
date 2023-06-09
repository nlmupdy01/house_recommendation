import "./Box.css";
import { AiOutlineHome } from "react-icons/ai";
import { RiRestaurantLine } from "react-icons/ri";
import { FaRegHospital } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

export default function Box({
  data,
  setShowContextMenu,
  setX,
  setY,
  setCurrPlot
}) {
  const handleClick = (e) => {
    setShowContextMenu(true);
    setX(`${e.pageX}px`);
    setY(`${e.pageY}px`);
    setCurrPlot(data.plotNumber);
  };
  return (
    <div onClick={handleClick} className={`BoxContainer ${data.plotType}`}>
      {data.plotType === "house" ? (
        <div className="boxContent">
          <AiOutlineHome /> House No. {data.plotNumber}{" "}
        </div>
      ) : data.plotType === "plot" ? (
        ""
      ) : (
        data.servicesName.map((service) => (
          <div className="boxContent" key={service}>
            {service === "Restaurant" ? (
              <RiRestaurantLine />
            ) : service === "Hospital" ? (
              <FaRegHospital />
            ) : (
              <CgGym />
            )}
            {service}
          </div>
        ))
      )}
    </div>
  );
}
