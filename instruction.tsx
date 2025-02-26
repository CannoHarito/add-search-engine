import { css } from "@hono/hono/css";
import { PropsWithChildren } from "@hono/hono/jsx";

interface InstructionProps {
  shortName: string;
}

const sectionClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 0;
  }
  li::marker{
    font-family: "BIZ UDGothic", monospace;
  }
`;

const Instruction = (
  { shortName, children }: PropsWithChildren<InstructionProps>,
) => (
  <section class={sectionClass}>
    <h2>完了まであと2ステップです</h2>
    <ol>
      <li>アドレスバーを右クリック</li>
      <li>「"{shortName}"を追加」をクリック</li>
    </ol>
    <image src="https://i.gyazo.com/44de036a29cf8f14e96e74f3bfc2e8f9.png" />
    {children}
  </section>
);
export default Instruction;
