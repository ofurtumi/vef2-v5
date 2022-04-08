import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Logout() {
    const router = useRouter()

	useEffect(() => {
		localStorage.setItem('user', '');
        router.push('/');
	});

    const logoutStyle = {
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <div style={logoutStyle}>
            <h1 style={{font: "bold 5em arial"}}>Skrái þig út!</h1>
        </div>
    )
}

export default Logout;