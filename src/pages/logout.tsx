import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Logout() {
    const router = useRouter()

	useEffect(() => {
		localStorage.setItem('isLoggedIn', 'false');
        router.push('/');
	});

    return (
        <h1>Skrá þig út!</h1>
    )
}

export default Logout;