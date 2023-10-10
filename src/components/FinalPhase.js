import { useState } from "react";
import StructuredMode from "./StructuredMode.js";

export default function FinalPhase({ tenses, mode, words }) {
  return (
    <>
      {mode === "option1" && <StructuredMode tenses={tenses} words={words} />}
    </>
  );
}
