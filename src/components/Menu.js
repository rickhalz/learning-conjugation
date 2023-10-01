import { motion } from "framer-motion";

export default function Menu({ tenses, HandleToggle }) {
  return (
    <div className="w-75 mx-auto">
      <table
        className="table table-light table-striped table-bordered"
        style={{ opacity: "0.9" }}
      >
        <tbody>
          <tr>
            <th colSpan="8">
              <div className="text-center">Indicatif</div>
            </th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id <= 3 && (
                  <td key={tense.id}>
                    <label>
                      <motion.input
                        animate={{
                          scale: tense.ticked ? 1 : 0.8,
                          backgroundColor: tense.ticked
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                        style={{ marginRight: "4px" }}
                        type="checkbox"
                        checked={tense.ticked}
                        onChange={(e) => {
                          HandleToggle({
                            ...tense,
                            ticked: e.target.checked,
                          });
                        }}
                      />
                      {tense.type}
                    </label>
                  </td>
                ),
            )}
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 3 &&
                tense.id <= 7 && (
                  <td key={tense.id}>
                    <label>
                      <motion.input
                        animate={{
                          scale: tense.ticked ? 1 : 0.8,
                          backgroundColor: tense.ticked
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                        style={{ marginRight: "4px" }}
                        type="checkbox"
                        checked={tense.ticked}
                        onChange={(e) => {
                          HandleToggle({
                            ...tense,
                            ticked: e.target.checked,
                          });
                        }}
                      />
                      {tense.type}
                    </label>
                  </td>
                ),
            )}
          </tr>

          <tr>
            <th colSpan={4}>
              <div className="text-center">Subjonctif</div>
            </th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 7 &&
                tense.id <= 11 && (
                  <td key={tense.id}>
                    <label>
                      <motion.input
                        animate={{
                          scale: tense.ticked ? 1 : 0.8,
                          backgroundColor: tense.ticked
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                        style={{ marginRight: "4px" }}
                        type="checkbox"
                        checked={tense.ticked}
                        onChange={(e) => {
                          HandleToggle({
                            ...tense,
                            ticked: e.target.checked,
                          });
                        }}
                      />
                      {tense.type}
                    </label>
                  </td>
                ),
            )}
          </tr>
          <tr>
            <th colSpan={2}>
              <div className="text-center">Conditonnel</div>
            </th>
            <th colSpan={2}>
              <div className="text-center">Imperatif</div>
            </th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 11 &&
                tense.id <= 13 && (
                  <td key={tense.id}>
                    <label>
                      <motion.input
                        animate={{
                          scale: tense.ticked ? 1 : 0.8,
                          backgroundColor: tense.ticked
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                        style={{ marginRight: "4px" }}
                        type="checkbox"
                        checked={tense.ticked}
                        onChange={(e) => {
                          HandleToggle({
                            ...tense,
                            ticked: e.target.checked,
                          });
                        }}
                      />
                      {tense.type}
                    </label>
                  </td>
                ),
            )}
            {tenses.map(
              (tense) =>
                tense.id > 13 &&
                tense.id <= 15 && (
                  <td key={tense.id}>
                    <label>
                      <motion.input
                        animate={{
                          scale: tense.ticked ? 1 : 0.8,
                          backgroundColor: tense.ticked
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                        style={{ marginRight: "4px" }}
                        type="checkbox"
                        checked={tense.ticked}
                        onChange={(e) => {
                          HandleToggle({
                            ...tense,
                            ticked: e.target.checked,
                          });
                        }}
                      />
                      {tense.type}
                    </label>
                  </td>
                ),
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
