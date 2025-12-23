import { useAuth } from '../../contexts/AuthContext';

const MemberDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">My Activity</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Workout" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Next Workout</h2>
                        <p>Leg Day - 5:00 PM</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Plan</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Progress</h2>
                        <div className="radial-progress text-primary" style={{ "--value": 70 }} role="progressbar">70%</div>
                        <p>Weekly Goal Reached</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
