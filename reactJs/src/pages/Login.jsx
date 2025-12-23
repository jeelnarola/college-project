import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role, `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`);
        navigate(`/${role}/dashboard`);
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Select a role to simulate the login process and access the corresponding dashboard.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control mt-6 gap-4">
                            <button
                                onClick={() => handleLogin('admin')}
                                className="btn btn-primary w-full"
                            >
                                Login as Admin
                            </button>
                            <button
                                onClick={() => handleLogin('trainer')}
                                className="btn btn-secondary w-full"
                            >
                                Login as Trainer
                            </button>
                            <button
                                onClick={() => handleLogin('member')}
                                className="btn btn-accent w-full"
                            >
                                Login as Member
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
