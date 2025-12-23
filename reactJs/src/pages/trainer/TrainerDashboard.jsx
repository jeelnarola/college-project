import { useAuth } from '../../contexts/AuthContext';

const TrainerDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Trainer Dashboard</h2>
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Client #{item}</h2>
                            <p>Session Time: {10 + item}:00 AM</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Start Session</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerDashboard;
