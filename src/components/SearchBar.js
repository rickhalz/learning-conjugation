import { React, useState } from "react";
import data from "../verbs.json";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function AddInput({ output, onOutput, onDelete }) {
  const [input, setInput] = useState("");

  function notify() {
    toast.error("no more than 6 verbs...");
  }

  function notify2() {
    toast.error("not a word...");
  }

  function InputHandler(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="input-group mb-3 justify-content-center w-25 mx-auto">
        <input
          className="form-control"
          type="text"
          value={input}
          placeholder="Search a verb..."
          onChange={InputHandler}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              data.includes(input.toLowerCase().trim())
            ) {
              if (output.length < 6) {
                setInput("");
                onOutput(input.toLowerCase().trim());
              } else {
                notify();
              }
            } else if (
              e.key === "Enter" &&
              data.includes(input.toLowerCase().trim()) === false
            ) {
              notify2();
            }
          }}
          list="words"
        />
        <List word={input.toLowerCase()} />
        <button
          className="input-group-text"
          disabled={output.length >= 6}
          onClick={() => {
            if (data.includes(input.toLowerCase().trim())) {
              setInput("");
              onOutput(input.toLowerCase().trim());
            } else {
              notify2();
            }
          }}
        >
          <motion.i className="bi bi-search"></motion.i>
        </button>
      </div>
      <ul style={{ listStyleType: "none" }}>
        <div
          className="d-flex flex-row justify-content-center"
          style={{ height: "30px" }}
        >
          <AnimatePresence mode="sync">
            {output.map((each) => (
              <motion.li
                layout
                key={each.id}
                className="ms-4 badge rounded-pill text-bg-light pt-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                }}
              >
                {each.word}
                <i
                  className="bi bi-x"
                  onClick={() => {
                    onDelete(each.id);
                  }}
                ></i>
              </motion.li>
            ))}
          </AnimatePresence>
        </div>
      </ul>
    </div>
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
