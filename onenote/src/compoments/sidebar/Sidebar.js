import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Notebook from "../notebooks/Notebook";
import Addnotebook from "../addnotbook/Addnotebook";
export default function Sidebar() {
  const [notebooks, setnotebooks] = useState([]);
  const [opened, setopened] = useState([]);
  const [shouldfetch, setshouldfetch] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch("http://localhost:5000/notebook/",{
        headers: {
          "Content-Type": "application/json",
          "user":localStorage.getItem("data.user._id")
      },
      });
      data = await data.json();
      setnotebooks(data);
      setopened(Array(notebooks.length).fill(false));
    };
    fetchData();
  }, [shouldfetch]);

  return (
    <div className="sidebar">
      {notebooks.map((e, i) => {
        // console.log(e)
        return (
          <div>
            <Notebook
              key={i}
              name={e.name}
              id={e._id}
              index={i}
              setopened={setopened}
              opened={opened}
              size={notebooks.length}
              shouldfetch={shouldfetch}
              setshouldfetch={setshouldfetch}
            />
          </div>
        );
      })}
      <Addnotebook setshouldfetch={setshouldfetch} shouldfetch={shouldfetch} />
    </div>
  );
}
