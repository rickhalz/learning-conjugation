import { React, useState } from "react";
import AddInput from "./SearchBar";
import Menu from "./Menu";
import Modes from "./Modes";
import FinalPhase from "./FinalPhase";

const initialStates = {
  phase1: true,
  phase2: false,
  phase3: false,
};

const tensesInfo = [
  { id: 0, title: "PRESENT", ticked: false, type: "présent" },
  { id: 1, title: "FUTUR", ticked: false, type: "futur simple" },
  { id: 2, title: "IMPARFAIT", ticked: false, type: "imparfait" },
  { id: 3, title: "PASSE_SIMPLE", ticked: false, type: "passé simple" },
  { id: 4, title: "PASSE_COMPOSE", ticked: false, type: "passé composé" },
  { id: 5, title: "PLUS_QUE_PARFAIT", ticked: false, type: "plus-que-parfait" },
  {
    id: 6,
    title: "CONDITIONNEL_PRESENT",
    ticked: false,
    type: "conditionnel présent",
  },
  {
    id: 7,
    title: "IMPERATIF_PRESENT",
    ticked: false,
    type: "imperatif présent",
  },
  {
    id: 8,
    title: "SUBJONCTIF_PRESENT",
    ticked: false,
    type: "subjonctif présent",
  },
  {
    id: 9,
    title: "SUBJONCTIF_IMPARFAIT",
    ticked: false,
    type: "subjonctif imparfait",
  },
];

const selectedMode = "option1";
let nextId = 0;

export default function Main() {
  const [states, setStates] = useState(initialStates);
  const [output, setOutput] = useState([]);
  const [tenses, setTenses] = useState(tensesInfo);
  let checkTenses = tenses.filter((each) => each.ticked !== false);

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
              alert("ADD SOMEFUCKING VERBS OR TENSES");
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
          }}
        >
          Back Home
        </button>
      </div>
      <h1>hi</h1>
    </>
  );
}
