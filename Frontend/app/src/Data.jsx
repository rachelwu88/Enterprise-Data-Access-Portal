import React from "react";
import Navbar from "./Navbar";
import DataChart from "./DataChart";
import Footer from "./components/Footer";
import "./Data.css";

const Data = () => {
    return (
        <>
            <Navbar />
            <div className="data-c">
                <h1>Plant Data Visualization</h1>
                <DataChart />
                <Footer />
            </div>
        </>
    );
};

export default Data;
