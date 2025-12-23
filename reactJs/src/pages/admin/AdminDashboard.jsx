import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Members</div>
                    <div className="stat-value text-primary">256</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Active Trainers</div>
                    <div className="stat-value text-secondary">14</div>
                    <div className="stat-desc">2 new hired</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value text-accent">$45,200</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>

            <div className="mt-8 bg-base-100 p-6 rounded-box shadow">
                <h2 className="text-2xl font-bold mb-4">Admin Controls</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
