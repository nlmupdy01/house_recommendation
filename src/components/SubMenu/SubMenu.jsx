import {
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete
} from "react-icons/ai";
import "./SubMenu.css";

export default function SubMenu({
  setShowContextMenu,
  setShowModal,
  deletePlot,
  currPlot
}) {
  const handleClose = () => {
    setShowContextMenu(false);
  };

  const handleEdit = () => {
    setShowContextMenu(false);
    setShowModal(true);
  };

  const handleDelete = () => {
    let [x, y] = currPlot.split("");
    deletePlot(+x, +y);
    setShowContextMenu(false);
  };

  return (
    <>
      <div className="submenuContainer">
        <div className="closeIcon" onClick={handleClose}>
          <AiOutlineCloseCircle />
        </div>
        <div className="buttonWrapper">
          <button className="button edit" onClick={handleEdit}>
            <AiOutlineEdit /> Edit
          </button>
        </div>
        <div className="buttonWrapper">
          <button className="button delete" onClick={handleDelete}>
            <AiOutlineDelete /> Empty
          </button>
        </div>
      </div>
    </>
  );
}
