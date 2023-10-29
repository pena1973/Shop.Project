import "./header.css";
import logo  from './images/bookstore-shop-logo-icon.jpg';
export interface HeaderProps {
}

export const Header = ({
}: HeaderProps) => {
  return (
    <div>
    <img className="logo" src={logo} alt="logo"></img>
    <h1 className="text-body-header">Shop.Client</h1>
    </div>
  );
}
