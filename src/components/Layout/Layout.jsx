import { useState, useEffect } from "react";
import "./Layout.css";
import Box from "../Box/Box";
import SubMenu from "../SubMenu/SubMenu";
import Modal from "../Modal/Modal";

export default function Layout({ columns, data, setData, generateLayout }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendedHouse, setRecommendedHouse] = useState({});
  const [showBestHouse, setShowBestHouse] = useState(false);
  const [currPlot, setCurrPlot] = useState("");
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const showRecommendedHouse = () => {
      const houses = [];
      for (let row of data) {
        for (let plot of row) {
          if (plot.plotType === "house") houses.push(plot);
        }
      }

      let score = 100000;
      for (let house of houses) {
        let currHouseScore =
          (house.gymDistance === 10000 ? 0 : house.gymDistance) +
          (house.restaurantDistance === 100000 ? 0 : house.restaurantDistance) +
          (house.hospitalDistance === 10000 ? 0 : house.hospitalDistance);
        if (currHouseScore < score) {
          score = currHouseScore;
          setRecommendedHouse({ ...house });
        }
      }
    };
    showRecommendedHouse();
  }, [showBestHouse, flag]);

  const distanceCalculator = (row1, col1, row2, col2) => {
    const xDiff = col2 - col1;
    const yDiff = row2 - row1;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    return distance;
  };

  const addPlot = (i, j, servicesArray) => {
    setData((prevLayout) => {
      const newLayout = [...prevLayout];
      newLayout[i][j] = {
        ...newLayout[i][j],
        plotType: servicesArray ? "service" : "house",
        servicesName: servicesArray || null
      };
      return newLayout;
    });
  };

  const deletePlot = (i, j) => {
    setData((prevLayout) => {
      const newLayout = [...prevLayout];
      newLayout[i][j] = {
        ...newLayout[i][j],
        gymDistance: 100000,
        hospitalDistance: 100000,
        restaurantDistance: 100000,
        plotType: "plot",
        servicesName: null
      };
      return newLayout;
    });
  };

  const recommendHouse = () => {
    let houseData = [];
    let serviceData = [];
    for (let row of data) {
      for (let plot of row) {
        if (plot.plotType === "house") houseData.push(plot);
        if (plot.plotType === "service") serviceData.push(plot);
      }
    }

    for (let house of houseData) {
      for (let service of serviceData) {
        let serviceDistance = distanceCalculator(
          house.row,
          house.column,
          service.row,
          service.column
        );
        if (service.servicesName.includes("Gym")) {
          setData((prevLayout) => {
            const newLayout = [...prevLayout];
            newLayout[house.row][house.column] = {
              ...newLayout[house.row][house.column],
              gymDistance: Math.min(
                newLayout[house.row][house.column].gymDistance,
                Math.ceil(serviceDistance)
              )
            };
            return newLayout;
          });
        }
        if (service.servicesName.includes("Hospital")) {
          setData((prevLayout) => {
            const newLayout = [...prevLayout];
            newLayout[house.row][house.column] = {
              ...newLayout[house.row][house.column],
              hospitalDistance: Math.min(
                newLayout[house.row][house.column].hospitalDistance,
                Math.ceil(serviceDistance)
              )
            };
            return newLayout;
          });
        }
        if (service.servicesName.includes("Restaurant")) {
          setData((prevLayout) => {
            const newLayout = [...prevLayout];
            newLayout[house.row][house.column] = {
              ...newLayout[house.row][house.column],
              restaurantDistance: Math.min(
                newLayout[house.row][house.column].restaurantDistance,
                Math.ceil(serviceDistance)
              )
            };
            return newLayout;
          });
        }
      }
    }
    setShowBestHouse(true);
    setFlag((prev) => !prev);
  };

  const resetHandler = () => {
    setShowBestHouse(false);
    generateLayout();
  };

  return (
    <>
      <div className="LayoutContainer">
        <div
          className="grid-container"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {data.map((row, i) =>
            row.map((house, j) => (
              <Box
                key={`${i}${j}`}
                data={house}
                setShowContextMenu={setShowContextMenu}
                setX={setXPos}
                setY={setYPos}
                setCurrPlot={setCurrPlot}
              />
            ))
          )}
          {showContextMenu && (
            <div
              style={{ position: "absolute", top: yPos, left: xPos, zIndex: 5 }}
            >
              <SubMenu
                setShowContextMenu={setShowContextMenu}
                setShowModal={setShowModal}
                deletePlot={deletePlot}
                currPlot={currPlot}
              />
            </div>
          )}
        </div>
        <button className="recommendButton" onClick={recommendHouse}>
          Recommend best facilities house 
        </button>

        {showBestHouse &&
          (recommendedHouse.plotNumber ? (
            <div className="recommendedContainer">
              <h4>Recommended House</h4>
              <h4> House No: {recommendedHouse.plotNumber} </h4>
              {recommendedHouse.gymDistance > 0 &&
                recommendedHouse.gymDistance !== 100000 && (
                  <p> This house is {recommendedHouse.gymDistance}km to Gym </p>
                )}
              {recommendedHouse.hospitalDistance > 0 &&
                recommendedHouse.hospitalDistance !== 100000 && (
                  <p>
                    This house is {recommendedHouse.hospitalDistance}km to
                    Hospital
                  </p>
                )}
              {recommendedHouse.restaurantDistance > 0 &&
                recommendedHouse.restaurantDistance !== 100000 && (
                  <p>
                    This house is {recommendedHouse.restaurantDistance}km to
                    restaurant
                  </p>
                )}
            </div>
          ) : (
            <h4 className="errorMessage"> Please select any house</h4>
          ))}
        {showBestHouse && (
          <button className="resetButton" onClick={resetHandler}>
            Reset
          </button>
        )}
      </div>
      {showModal && (
        <Modal
          currPlot={currPlot}
          data={data}
          setShowModal={setShowModal}
          addPlot={addPlot}
        />
      )}

      {showContextMenu && (
        <div
          onClick={() => setShowContextMenu(false)}
          className="backdrop"
        ></div>
      )}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="backdrop"></div>
      )}
    </>
  );
}
