import { useState } from "react";

export default function Modes({ whichMode }) {
  const [mode, setMode] = useState(whichMode);

  return (
    <fieldset className="d-flex w-100">
      <div className="d-flex w-100 justify-content-center">
        <input
          type="radio"
          value="option1"
          checked={mode === "option1"}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          className="btn-check"
          name="options-outlined"
          id="1st-outlined"
        />
        <label className="btn btn-outline-primary" htmlFor="1st-outlined">
          Structured Mode
        </label>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <input
          type="radio"
          value="option2"
          checked={mode === "option2"}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          className="btn-check"
          name="options-outlined"
          id="2nd-outlined"
          disabled
        />
        <label className="btn btn-outline-primary" htmlFor="2nd-outlined">
          Random Mode
        </label>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <input
          type="radio"
          value="option3"
          checked={mode === "option3"}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          className="btn-check"
          name="options-outlined"
          id="3rd-outlined"
          disabled
        />
        <label className="btn btn-outline-primary" htmlFor="3rd-outlined">
          Matching Card
        </label>
      </div>
    </fieldset>
  );
}
