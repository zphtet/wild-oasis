type Props = {
  css?: string;
};
const Navbar = ({ css }: Props) => {
  const modeHandler = () => {
    if (!document.body.className) {
      document.body.className = "dark";
      return;
    }
    if (document.body.className) {
      document.body.className = "";
      return;
    }
  };
  return (
    <div className={css}>
      Navbar
      <button onClick={modeHandler} className="cursor-pointer px-3 py-1 border">
        Mode
      </button>
    </div>
  );
};

export default Navbar;
