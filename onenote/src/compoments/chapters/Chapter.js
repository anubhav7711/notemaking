import React, { useContext, useEffect, useState } from "react";
import "./Chapter.css";
import { Data } from "../../context/AppProvider";

export default function Chapter(props) {
  const a = useContext(Data);
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const fetchFunc = async () => {
      let response = await fetch("http://localhost:5000/chapter/", {
        method: "GET",
        headers: { "Content-Type": "application/json", notebook_id: props.id },
      });
      response = await response.json();
      setChapters(response.response);
      console.log(response);
    };
    if (props.opened[props.index]) {
      fetchFunc();
    }
  }, [props.opened, props.id, props.index, props.shouldfetch]);

  return (
    <div className="chapterlist">
      {props.opened[props.index] ? "" : ""}
      {props.opened[props.index]
        ? chapters.map((e, i) => {
            return (
              <div key={i}>
                <button className="chaptername focus:outline-none" onClick={() => a.setcanvasid(e._id)}>{e.name}</button>
                <button
                  type="button"
                  className="py-1 focus:outline-none text-white bg-blueviolet-200 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 h-8 mt-2"
                  onClick={async()=>{
                    let response = await fetch('http://localhost:5000/chapter/delete',{
                        method:"DELETE",
                        headers:{"Content-Type": "application/json",chapter_id:e._id}
                    })
                    response = await response.json()
                    console.log(response)
                    if(e._id===a.canvasid){
                      a.setcanvasid("")
                    }
                    props.setshouldfetch(!props.shouldfetch)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
}
