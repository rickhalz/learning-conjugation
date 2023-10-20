import StructuredMode from "./StructuredMode.js";

export default function FinalPhase({ tenses, mode, words }) {
  return (
    <>
      <StructuredMode tenses={tenses} words={words} />
    </>
  );
}
