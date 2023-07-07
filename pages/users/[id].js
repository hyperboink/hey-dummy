export const getStaticPaths = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const paths = users.map((user) => {
        return {
            params: {
                id: user.id.toString()
            }
        }
    });

    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async(context) => {
    const id = context.params.id;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();

    return {
        props: { user: user }
    }
}

const UserDetails = ({user}) => {
    return (
        <div>
            <div>Name: {user.name}</div>
            <div>Username: {user.userame}</div>
            <div>City: {user.address.city}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.phone}</div>
        </div>
    );
}

export default UserDetails;