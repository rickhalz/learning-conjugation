import { useState } from "react";
import data from "french-verbs-lefff/dist/conjugations.json";
import _ from "lodash";

const FrenchVerbs = require("french-verbs");
const structuredAns = {
  je: "",
  tu: "",
  ilElle: "",
  nous: "",
  vous: "",
  ilsElles: "",
};

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

const subjects = Object.keys(structuredAns);

function StructuredMode({ tenses, words }) {
  const [input, setInput] = useState(structuredAns);
  const [state, setState] = useState(false);
  const [number, setNumber] = useState(0);
  const [tense, setTense] = useState(0);

  let verifyOrNext = state ? "Next" : "Verify";

  function HandleAnswer(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function HandleNumber() {
    setNumber((n) => n + 1);
  }

  function HandleTense() {
    setTense((n) => n + 1);
  }

  let ans = {};

  for (let i = 0; i < subjects.length; i++) {
    ans[subjects[i]] = FrenchVerbs.getConjugation(
      data,
      words[number].word,
      tenses[tense].title,
      i,
    );
  }

  function getObjectDiff(obj1, obj2, compareRef = false) {
    return Object.keys(obj1).reduce((result, key) => {
      if (!obj2.hasOwnProperty(key)) {
        result.push(key);
      } else if (_.isEqual(obj1[key], obj2[key])) {
        const resultKeyIndex = result.indexOf(key);

        if (compareRef && obj1[key] !== obj2[key]) {
          result[resultKeyIndex] = `${key} (ref)`;
        } else {
          result.splice(resultKeyIndex, 1);
        }
      }
      return result;
    }, Object.keys(obj2));
  }

  let comparison = [];
  if (state === true) {
    comparison = getObjectDiff(ans, input);
    console.log(comparison.includes("je"));
  } else {
    comparison = [];
  }

  let body = (
    <>
      <h2>{words[number].word}</h2>
      <h3>{tenses[tense].type}</h3>
      <table className="table table-bordered border-primary">
        <tbody>
          <tr>
            <td>Je</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("je") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.je}
                name="je"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Tu</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("tu") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.tu}
                name="tu"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Il</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("ilElle") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.ilElle}
                name="ilElle"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Nous</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("nous") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.nous}
                name="nous"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Vous</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("vous") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.vous}
                name="vous"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Ils</td>
            <td>
              <input
                style={{
                  backgroundColor: comparison.includes("ilsElles") ? "red" : "",
                }}
                disabled={state ? "disabled" : ""}
                type="text"
                value={input.ilsElles}
                name="ilsElles"
                onChange={(e) => HandleAnswer(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <div>{body}</div>
      <button
        onClick={() => {
          if (state) {
            if (tense === tenses.length - 1) {
              if (number < words.length - 1) {
                setTense(0);
                HandleNumber();
              }
            } else {
              HandleTense();
            }
          }
          setState(!state);
        }}
      >
        {verifyOrNext}
      </button>
    </>
  );
}
