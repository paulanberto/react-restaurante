export default function Footer({ author, year }) {
  return (
    <footer>
      Desenvolvido por <strong>{author}</strong> - {year}
    </footer>
  );
}
