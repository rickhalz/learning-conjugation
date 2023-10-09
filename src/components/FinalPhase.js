import { useState } from "react";
import data from "../out.json";
// import _ from "lodash";
import "./index.css";

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
  const [points, setPoints] = useState(0);
  const [input, setInput] = useState(structuredAns);
  const [state, setState] = useState(false);
  const [number, setNumber] = useState(0);
  const [tense, setTense] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
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
      <h2 className="w-50 mx-auto text-white">
        {words[number].word} - {additional + tenses[tense].type}
      </h2>
      <table className="table table-striped w-50 mx-auto">
        <tbody>
          {input.map((i) => (
            <tr key={i.id}>
              <td
                style={{
                  width: "90px",
                  borderRight:
                    i.id % 2 === 0 ? "2px solid #fff" : "2px solid #f2f2f2",
                  borderTopLeftRadius: i.id === 0 ? "0.5rem" : "",
                  borderBottomLeftRadius: i.id === 5 ? "0.5rem" : "",
                }}
              >
                {i.title}
              </td>
              <td
                style={{
                  borderTopRightRadius: i.id === 0 ? "0.5rem" : "",
                  borderBottomRightRadius: i.id === 5 ? "0.5rem" : "",
                }}
              >
                {state === true ? (
                  <>
                    <input
                      disabled
                      type="text"
                      value={i.ans}
                      style={{
                        width: "100%",
                        backgroundColor: i.id % 2 === 0 ? "#f2f2f2" : "#ffffff",
                      }}
                    />
                    {diffAns.includes(i.id) ? <>&times;</> : <>&#x2713;</>}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={i.ans}
                      style={{
                        width: "100%",
                        backgroundColor: i.id % 2 === 0 ? "#f2f2f2" : "#ffffff",
                      }}
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

  return (
    <>
      {showPoints ? (
        <div>
          {points <= (words.length * 6) / 2 ? (
            <>
              <h3 className="text-center text-white">
                {points} / {words.length * tenses.length * 6}
              </h3>
              <div>
                <h3 className="text-white">u suck</h3>
              </div>
              <div className="pot">
                <iframe
                  src="https://giphy.com/embed/h3e3Tch1zrXgrtHwaF"
                  title="dumbass1"
                ></iframe>
              </div>
              <div className="d-flex justify-content-center">
                <iframe
                  src="https://giphy.com/embed/kF2dSGhb3O5NJZnV0A"
                  title="dumbass2"
                ></iframe>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center text-white">
                {points} / {words.length * tenses.length * 6}
              </h3>
              <h2 className="text-center">practise more pls..........</h2>
            </>
          )}
        </div>
      ) : (
        <>
          <div>{body}</div>
          <div className="w-100 d-flex justify-content-center">
            <button
              className="shadow-lg p-3 mb-5 rounded bg-body-tertiary btn btn-sm"
              onClick={() => {
                if (state) {
                  setInput(structuredAns);
                  if (tense === tenses.length - 1) {
                    if (number < words.length - 1) {
                      setTense(0);
                      HandleNumber();
                    } else {
                      setShowPoints(!showPoints);
                    }
                  } else {
                    HandleTense();
                  }
                }
                if (state) {
                  setPoints((p) => p + 6 - diffAns.length);
                } else {
                  setDiffAns([]);
                }

                HandleDiff(inputAns, tensesAnswer);
                setState(!state);
              }}
            >
              {verifyOrNext}
            </button>
          </div>
        </>
      )}
    </>
  );
}
