import Link from "next/link";

const isAdmin = false;
const isLoggedIn = false;

const cssClasses = "flex-1 text-center py-4 text-sm text-themeGray-300 hover:text-white";

const Header = () => (
  <header className="fixed top-0 w-full bg-themeGray-700 z-10">
    <nav className="NavigationBar inner-wrap flex justify-around text-white">
      <Link href="/">
        <a className={cssClasses}>Home</a>
      </Link>
      <Link href="/shop">
        <a className={cssClasses}>Shop</a>
      </Link>
      <Link href="/category/mobile">
        <a className={cssClasses}>#mobile</a>
      </Link>
      {isAdmin && (
        <Fragment>
          <Link href="/admin/users">
            <a className={cssClasses}>Users</a>
          </Link>
          <Link href="/admin/products">
            <a className={cssClasses}>Products</a>
          </Link>
        </Fragment>
      )}
      {isLoggedIn ? (
        <Fragment>
          <Link href="/orders">
            <a className={cssClasses}>Orders</a>
          </Link>
          <Link href="/cart">
            <a className={cssClasses}>
              My Cart{" "}
              {this.props.itemsInCart > 0 ? `(${this.props.itemsInCart})` : ``}
            </a>
          </Link>
          <Link href="/logout">
            <a className={cssClasses}>Logout</a>
          </Link>
        </Fragment>
      ) : (
        <Link href="/login">
          <a className={cssClasses}>Login</a>
        </Link>
      )}
    </nav>
  </header>
);

export default Header;
