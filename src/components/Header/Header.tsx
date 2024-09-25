interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={() => onLogout()}>Log out</button>
    </div>
  );
};

export default Header;
