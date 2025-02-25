import { css } from "@hono/hono/css";

interface FormProps {
  url?: string;
  name?: string;
  googlesuggest?: string | boolean;
  suggest?: string;
}

const formClass = css`
  display: flex;
  flex-direction: column;
  div {
    padding: 0 1rem 1rem;
  }
  input[type="text"], input[type="url"] {
      width: 100%;
      font: inherit;
  }
  button {
    width: 100%;
    font: inherit;
    border: none;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    cursor: pointer;
    color:#fff;
    background-color: #0d6efd;
    &:hover {
      background-color: #0a58ca
    }
  }
`;

const Form = ({ url, name, googlesuggest, suggest }: FormProps) => (
  <form method="get" class={formClass}>
    <label for="url" class="label">Search URL</label>
    <div>
      <input
        id="url"
        type="url"
        name="url"
        placeholder="https://example.org/search?q=%s"
        required
        pattern=".*%(25)?[sS].*|.*\{searchTerms\}.*"
        value={url}
      />
      [必須] %s を検索し、URLをコピーして入力する
    </div>
    <label for="name" class="label">Name</label>
    <div>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Example検索"
        value={name}
      />
    </div>
    <label for="suggest" class="label">Suggestions URL</label>
    <div>
      <input
        id="suggest"
        type="url"
        name="suggest"
        placeholder="https://example.org/suggestions?q=%s"
        pattern=".*%(25)?[sS].*|.*\{searchTerms\}.*"
        value={suggest}
      />

      <label>
        <input
          type="checkbox"
          name="googlesuggest"
          checked={!!googlesuggest}
        />
        Google Suggestionsを使用する
      </label>
    </div>
    <div>
      <button type="submit">追加用ページ生成</button>
    </div>
  </form>
);

export default Form;
