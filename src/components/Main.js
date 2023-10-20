import { React, useState } from "react";
import AddInput from "./SearchBar";
import Menu from "./Menu";
import FinalPhase from "./FinalPhase";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="mt-5" style={{ display: "" }}>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      {states.phase1 && (
        <AnimatePresence>
          <motion.div
            style={{ display: states.phase1 ? "block" : "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: "1",
            }}
          >
            <fieldset>
              <AddInput
                output={output}
                onOutput={HandleAdd}
                onDelete={HandleDelete}
              />
              <Menu tenses={tenses} HandleToggle={HandleToggle} />
            </fieldset>
            <div className="w-25 mx-auto d-flex justify-content-center">
              <motion.button
                className="shadow-lg p-3 mb-5 bg-body-tertiary mt-3 btn-sm btn rounded"
                whileHover={{ scale: 1.2 }}
                whileTap={{
                  scale: 1,
                }}
                onClick={(e) => {
                  if (output.length !== 0 && checkTenses.length !== 0) {
                    ToggleInfo(e, "phase2", "phase1");
                  } else {
                    notify();
                  }
                }}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {states.phase2 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: "1",
            }}
          >
            <FinalPhase
              tenses={checkTenses}
              mode={selectedMode}
              words={output}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
