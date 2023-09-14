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
                tense.id < 6 && (
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
            <th>CIS</th>
          </tr>
          <tr>
            {tenses.map(
              (tense) =>
                tense.id > 5 && (
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
