export default function Menu({ tenses, HandleToggle }) {
  return (
    <>
      <table className="table table-light table-striped">
        <tbody>
          <tr>
            <th>Indicatif</th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id <= 7 && (
                  <td key={tense.id}>
                    <label>
                      <input
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
            <th>Subjonctif</th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 7 &&
                tense.id <= 11 && (
                  <td key={tense.id}>
                    <label>
                      <input
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
            <th>Conditionnel</th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 11 &&
                tense.id <= 13 && (
                  <td key={tense.id}>
                    <label>
                      <input
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
            <th>Imperatif</th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 13 &&
                tense.id <= 15 && (
                  <td key={tense.id}>
                    <label>
                      <input
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

          <tr></tr>
        </tbody>
      </table>
    </>
  );
}
