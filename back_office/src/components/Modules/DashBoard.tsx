import { PaymentStatusChart, ReservationChart, RevenueChart } from "../Dashboard/Charts";
import RecentActivity from "../Dashboard/RecentActivity";
import StatsCards from "../Dashboard/StatsCards";

const DashBoard = () => {
    return (
        <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ReservationChart />
                <RevenueChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PaymentStatusChart />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
