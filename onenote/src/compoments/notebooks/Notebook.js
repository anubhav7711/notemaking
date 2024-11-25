import React, { useContext, useState } from "react";
import "./Notebook.css";
import Chapter from "../chapters/Chapter";
import { Data } from "../../context/AppProvider";

export default function Notebook(props) {
  const a = useContext(Data);
  const [chaptername, setchaptername] = useState("");
  const [shouldfetch, setshouldfetch] = useState(true);
  return (
    <div className={`notebook ${props.opened[props.index] ? "open" : ""}`}>
      <button
        className="chapt"
        onClick={() => {
          if (props.opened[props.index] === true) {
            let temp1 = Array(props.size).fill(false);
            props.setopened([...temp1]);
          } else {
            let temp = props.index;
            let temp1 = Array(props.size).fill(false);
            temp1[temp] = true;
            props.setopened([...temp1]);
          }
        }}
      >
        {props.name}
        <svg
          style={
            props.opened[props.index] ? { transform: "rotate(90deg)" } : {}
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="white"
          stroke="white"
          strokeWidth="5"
        >
          <path d="M443.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-176-176c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L393.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l377.4 0L244.7 420.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l176-176z" />
        </svg>
      </button>

      <Chapter
        opened={props.opened}
        index={props.index}
        id={props.id}
        shouldfetch={shouldfetch}
        setshouldfetch={setshouldfetch}
      />
      {props.opened[props.index] ? (
        <form
          className="addchapter"
          onSubmit={async (e) => {
            e.preventDefault();
            let response = await fetch(
              "http://localhost:5000/chapter/create/",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  notebook_id: props.id,
                  chapter_name: chaptername,
                }),
              }
            );
            if (response.status === 200) {
              setshouldfetch(!shouldfetch);
              setchaptername("");
            }
          }}
        >
          <input
            type="text"
            placeholder="Add Note"
            value={chaptername}
            onChange={(e) => {
              setchaptername(e.target.value);
            }}
          />
          <button disabled={chaptername.length < 3} type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </form>
      ) : (
        ""
      )}

      {props.opened[props.index] ? (
        <button
          className="w-full py-1 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 h-8 mt-2"
          onClick={async () => {
            console.log(props);
            let response = await fetch(
              "http://localhost:5000/notebook/delete",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  notebook_id: props.id,
                },
              }
            );
            response = await response.json();
            a.setcanvasid("");
            // if(response.status===200){
            props.setshouldfetch(!props.shouldfetch);
            // }
          }}
        >
          Delete NoteBook
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
