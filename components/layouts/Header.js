import Link from "next/link";

const Header = () => {
    return ( 
        <div className="header">
            <div className="container">
                <nav className="navigation">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">Categories</Link></li>
                    </ul>
                </nav>
            </div>

            <hr/>
        </div>
     );
}
 
export default Header;