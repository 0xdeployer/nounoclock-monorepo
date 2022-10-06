import * as styles from "./styles";

const options = [
  { display: "Auction", id: "auction" },
  { display: "Chat", id: "chat" },
];

type ToggleProps = { value: string; onClick: (s: string) => void };

export default function Toggle({ value, onClick }: ToggleProps) {
  return (
    <div css={styles.wrap}>
      {options.map((option) => {
        return (
          <div
            key={option.id}
            onClick={() => onClick(option.id)}
            css={styles.option(option.id === value)}
          >
            {option.display}
          </div>
        );
      })}
    </div>
  );
}
