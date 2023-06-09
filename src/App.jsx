import { useState, useEffect } from "react";
import "./styles.css";
import Layout from "./components/Layout/Layout";

export default function App() {
  const [rows] = useState(8);
  const [columns] = useState(5);
  const [data, setData] = useState([]);

  const generateLayout = () => {
    const housingLayout = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: columns }, (_, j) => ({
        plotNumber: `${i}${j}`,
        gymDistance: 100000,
        hospitalDistance: 100000,
        restaurantDistance: 100000,
        plotType: "plot",
        servicesName: null,
        row: i,
        column: j
      }))
    );

    setData([...housingLayout]);
  };

  useEffect(() => {
    generateLayout();
  }, []);

  return (
    <div className="App">
      <h1> Best House Facilities Recommendation</h1>
      {/* <InputContainer
        rows={rows}
        columns={columns}
        setRows={setRows}
        setColumns={setColumns}
        generateLayout={generateLayout}
      /> */}
      <Layout
        columns={columns}
        data={data}
        setData={setData}
        generateLayout={generateLayout}
      />
    </div>
  );
}
