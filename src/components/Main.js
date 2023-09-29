import { React, useState } from "react";
import AddInput from "./SearchBar";
import Menu from "./Menu";
import Modes from "./Modes";
import FinalPhase from "./FinalPhase";
import toast, { Toaster } from "react-hot-toast";

const initialStates = {
  phase1: true,
  phase2: false,
  phase3: false,
};

const tensesInfo = [
  { id: 0, title: "present", ticked: false, type: " présent" },
  { id: 1, title: "imparfait", ticked: false, type: " imparfait" },
  { id: 2, title: "passeSimple", ticked: false, type: " passé simple" },
  { id: 3, title: "futurSimple", ticked: false, type: " futur simple" },
  { id: 4, title: "passeCompose", ticked: false, type: " passé composé" },
  { id: 5, title: "plusQueParfait", ticked: false, type: " plus-que-parfait" },
  {
    id: 6,
    title: "passeAnterieur",
    ticked: false,
    type: " passé anterieur",
  },
  {
    id: 7,
    title: "futurAnterieur",
    ticked: false,
    type: " futur anterieur",
  },
  {
    id: 8,
    title: "subjonctifPresent",
    ticked: false,
    type: " présent",
  },
  {
    id: 9,
    title: "subjonctifImparfait",
    ticked: false,
    type: " imparfait",
  },
  {
    id: 10,
    title: "subjonctifPasse",
    ticked: false,
    type: " passé",
  },
  {
    id: 11,
    title: "subjonctifPlusQueParfait",
    ticked: false,
    type: " plus-que-parfait",
  },
  {
    id: 12,
    title: "conditionnelPresent",
    ticked: false,
    type: " présent",
  },
  {
    id: 13,
    title: "conditionnelPasse",
    ticked: false,
    type: " passé",
  },
  {
    id: 14,
    title: "imperatif",
    ticked: false,
    type: " présent",
  },
  {
    id: 15,
    title: "imperatifPasse",
    ticked: false,
    type: " passé",
  },
];

const selectedMode = "option1";
let nextId = 0;

export default function Main() {
  const [states, setStates] = useState(initialStates);
  const [output, setOutput] = useState([]);
  const [tenses, setTenses] = useState(tensesInfo);

  let checkTenses = tenses.filter((each) => each.ticked !== false);

  function notify() {
    toast.error("Add verb or tense...");
  }

  function HandleToggle(currentTense) {
    setTenses(
      tenses.map((t) => {
        if (t.id === currentTense.id) {
          return currentTense;
        } else {
          return t;
        }
      }),
    );
  }
  function HandleDelete(wordId) {
    setOutput(output.filter((w) => w.id !== wordId));
  }

  function HandleAdd(word) {
    setOutput([
      ...output,
      {
        id: nextId++,
        word: word,
      },
    ]);
  }

  function ToggleInfo(e, firstState, secondState) {
    e.preventDefault();
    setStates({ ...states, [firstState]: true, [secondState]: false });
  }

  return (
    <>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <h1>progressbar incoming...</h1>
      <div style={{ display: states.phase1 ? "block" : "none" }}>
        <fieldset>
          <AddInput
            output={output}
            onOutput={HandleAdd}
            onDelete={HandleDelete}
          />
          <Menu tenses={tenses} HandleToggle={HandleToggle} />
        </fieldset>
        <button
          onClick={(e) => {
            if (output.length !== 0 && checkTenses.length !== 0) {
              ToggleInfo(e, "phase2", "phase1");
            } else {
              notify();
            }
          }}
        >
          Next
        </button>
      </div>
      <div style={{ display: states.phase2 ? "block" : "none" }}>
        <Modes whichMode={selectedMode} />
        <button
          onClick={(e) => {
            ToggleInfo(e, "phase1", "phase2");
          }}
        >
          Back
        </button>
        <button
          onClick={(e) => {
            ToggleInfo(e, "phase3", "phase2");
          }}
        >
          Next
        </button>
      </div>
      <div style={{ display: states.phase3 ? "block" : "none" }}>
        {states.phase3 && (
          <FinalPhase tenses={checkTenses} mode={selectedMode} words={output} />
        )}
        <button
          onClick={(e) => {
            ToggleInfo(e, "phase1", "phase3");
            setTenses(tensesInfo);
            setOutput([]);
          }}
        >
          Back Home
        </button>
      </div>
    </>
  );
}
