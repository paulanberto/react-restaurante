export default function Button({ onClick, text, type = "submit" }) {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
}
