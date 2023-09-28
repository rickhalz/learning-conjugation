import { React, useState } from "react";
import data from "../verbs.json";

export default function AddInput({ output, onOutput, onDelete }) {
  const [input, setInput] = useState("");

  function InputHandler(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={input}
          placeholder="Search a verb..."
          onChange={InputHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter" && data.includes(input.toLowerCase())) {
              setInput("");
              onOutput(input.toLowerCase());
            }
          }}
          list="words"
        />
        <List word={input.toLowerCase()} />
        <button
          onClick={() => {
            if (data.includes(input.toLowerCase())) {
              setInput("");
              onOutput(input.toLowerCase());
            } else {
              alert("Not a word");
            }
          }}
        >
          Add
        </button>
        {output.map((each) => (
          <div key={each.id}>
            <button>
              {each.word}
              <i
                className="bi bi-x"
                onClick={() => {
                  onDelete(each.id);
                }}
              ></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function List({ word }) {
  const filteredData = data.filter((w) => {
    if (word !== "") {
      return w
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .startsWith(word);
    } else {
      return "";
    }
  });

  return (
    <div>
      <datalist id="words">
        {filteredData.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
    </div>
  );
}
