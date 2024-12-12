import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Card, CardHeader, CardBody } from '@nextui-org/react';
import "../app/globals.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            

            if (response.ok) {
                router.push('/admin-dashboard');
            } else {
                console.error('Login failed:', await response.json());
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Card className="p-8 rounded-lg shadow-md w-96 gap-4">
                <CardHeader >
                    <h1 className="text-2xl font-bold mb-2 text-center w-full">Login</h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                clearable
                                underlined
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                clearable
                                underlined
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}