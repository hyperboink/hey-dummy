import Link from "next/link";
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter();

    return ( 
        <div className="header">
            <div className="container">
                <div className="flex flex-center">
                    <h1 className="logo"><Link href="/">Hey Dummy!</Link></h1>

                    <nav className="navigation">
                            {router.asPath !== '/' ? (
                                <Link href="/"><span>&#8592;</span> Back to Categories</Link>
                            ) : ''}
                    </nav>
                </div>
            </div>

            <hr/>
        </div>
     );
}
 
export default Header;