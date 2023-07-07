import Image from "next/image";

export const getStaticProps = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());

    console.log(res);
    return {
        props: { nekos: res }
    }
}

const Neko = ({nekos}) => {
    return ( 
        <div>
            {nekos && nekos.map((neko, i) => (
                console.log(neko)
            ))}
            
        </div>
     );
}
 
export default Neko;