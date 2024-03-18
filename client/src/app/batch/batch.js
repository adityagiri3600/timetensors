"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./batch.css";

const Batch = ({ setData, section }) => {

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        Papa.parse(`/data/${section}1.csv`, {
            download: true,
            header: true,
            complete: data => {
                setData1(data.data);
            }
        });
        Papa.parse(`/data/${section}2.csv`, {
            download: true,
            header: true,
            complete: data => {
                setData2(data.data);
            }
        });
    }, []);

    const [batch, setBatch] = useState("1");

    useEffect(() => {
        setLocalStorage(setBatch, setData, data1, data2);
    }, [section]);

    useEffect(() => {
        if (window !== undefined) localStorage.setItem("batch", batch);
    }, [batch]);

    const handleBatch = () => {
        if (batch === "1") {

            setBatch("2");
            setData(data2);

        } else {

            setBatch("1");
            setData(data1);
        }
    };

    const batchNames = {
        "a1": "A1/A2",
        "a2": "A3",
        "b1": "B1/B2",
        "b2": "B3",
        "c1": "C1/C2",
        "c2": "C3",
        "d1": "D1/D2",
        "d2": "D3",
        "e1": "E1/E2",
        "e2": "E3",
        "f1": "F1/F2",
        "f2": "F3",
        "g1": "G1/G2",
        "g2": "G3",
        "ds4a1": "A1/A3",
        "ds4a2": "A2/A4",
        "ds4b1": "B1/B3",
        "ds4b2": "B2/B4",
        "o1": "O1",
        "o2": "O2",
        "o3": "O3",
        "n1": "N1",
        "n2": "N2",
        "n3": "N3"
    }

    return (
        <div className="container">
            <div className="text" onClick={handleBatch}>
                <p className={`batchname ${batch === "1" ? "selected" : "not-selected"}`}>{batchNames[section + '1']}</p>
                <p className={`batchname ${batch === "2" ? "selected" : "not-selected"}`}>{batchNames[section + '2']}</p>
            </div>
            <label className="switch">
                <input type="checkbox" onChange={handleBatch} checked={batch === "2"} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

const setLocalStorage = (setBatch, setData, data1, data2) => {

    if (window == undefined) return;

    const storedBatch = localStorage.getItem("batch");

    if (storedBatch) {

        setBatch(storedBatch);

        if (storedBatch === "1") setData(data1);
        else setData(data2);
    }
}

export default Batch;
