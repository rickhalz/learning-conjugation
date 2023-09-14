import { useState } from "react";

export default function Modes({ whichMode }) {
  const [mode, setMode] = useState(whichMode);

  return (
    <>
      <fieldset>
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
        />
        <label className="btn btn-outline-primary" htmlFor="2nd-outlined">
          Random Mode
        </label>
      </fieldset>
    </>
  );
}
