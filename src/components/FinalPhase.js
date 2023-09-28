import { useState } from "react";
import data from "../out.json";
import _ from "lodash";

const structuredAns = [
  { id: 0, ans: "", title: "1st sg." },
  { id: 1, ans: "", title: "2nd sg." },
  { id: 2, ans: "", title: "3rd sg." },
  { id: 3, ans: "", title: "1st pl." },
  { id: 4, ans: "", title: "2nd pl." },
  { id: 5, ans: "", title: "3rd pl." },
];

let inputAns = [];

export default function FinalPhase({ tenses, mode, words }) {
  return (
    <>
      {mode === "option1" && (
        <>
          <StructuredMode tenses={tenses} words={words} />
        </>
      )}
    </>
  );
}

function StructuredMode({ tenses, words }) {
  const [input, setInput] = useState(structuredAns);
  const [state, setState] = useState(false);
  const [number, setNumber] = useState(0);
  const [tense, setTense] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [diffAns, setDiffAns] = useState([]);

  let verifyOrNext = state ? "Next" : "Verify";

  let tensesAnswer = data[words[number].word][tenses[tense].title];

  let additional = "";
  if (tenses[tense].id <= 7) {
    additional = "";
  } else if (tenses[tense].id > 7 && tenses[tense].id <= 11) {
    additional = "Subjonctif ";
  } else if (tenses[tense].id > 11 && tenses[tense].id <= 13) {
    additional = "Conditionnel ";
  } else {
    additional = "Imperatif ";
  }

  function HandleAnswer(currentInput) {
    setInput(
      input.map((i) => {
        if (i.id === currentInput.id) {
          return currentInput;
        } else {
          return i;
        }
      }),
    );
  }

  function HandleDiff(obj1, obj2) {
    for (let i = 0; i < obj2.length; i++) {
      if (obj2[i] !== obj1[i]) {
        setDiffAns((old) => [...old, i]);
      }
    }
  }

  function HandleNumber() {
    setNumber((n) => n + 1);
  }

  function HandleTense() {
    setTense((n) => n + 1);
  }

  inputAns = input.map((value) => value.ans);
  // function getObjectDiff(obj1, obj2, compareRef = false) {
  //   return Object.keys(obj1).reduce((result, key) => {
  //     if (!obj2.hasOwnProperty(key)) {
  //       result.push(key);
  //     } else if (_.isEqual(obj1[key], obj2[key])) {
  //       const resultKeyIndex = result.indexOf(key);
  //
  //       if (compareRef && obj1[key] !== obj2[key]) {
  //         result[resultKeyIndex] = `${key} (ref)`;
  //       } else {
  //         result.splice(resultKeyIndex, 1);
  //       }
  //     }
  //     return result;
  //   }, Object.keys(obj2));
  // }

  let body = (
    <>
      <h2>{words[number].word}</h2>
      <h3>{additional + tenses[tense].type}</h3>
      <table className="table table-bordered border-primary">
        <tbody>
          {input.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>
                {state === true ? (
                  <>
                    <input disabled type="text" value={i.ans} />
                    {diffAns.includes(i.id) ? <>&times;</> : <>&#x2713;</>}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={i.ans}
                      onChange={(e) => {
                        HandleAnswer({
                          ...i,
                          ans: e.target.value,
                        });
                      }}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  console.log(diffAns);

  return (
    <>
      <div>{body}</div>
      <button
        disabled={isDisabled}
        onClick={() => {
          if (state) {
            setDiffAns([]);
            setInput(structuredAns);
            if (tense === tenses.length - 1) {
              if (number < words.length - 1) {
                setTense(0);
                HandleNumber();
              } else {
                setIsDisabled(true);
              }
            } else {
              HandleTense();
            }
          } else {
            HandleDiff(inputAns, tensesAnswer);
          }
          setState(!state);
        }}
      >
        {verifyOrNext}
      </button>
    </>
  );
}
