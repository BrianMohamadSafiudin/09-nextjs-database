import { generateYAxis } from '@/utils/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/components/atoms/fonts';
import { fetchRevenue } from '@/model/query';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
    const revenue = await fetchRevenue();

    const chartHeight = 350;
    const { yAxisLabels, topLabel } = generateYAxis(revenue);

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    } 

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Recent Revenue
            </h2>
            <div className="rounded-xl bg-gray-50 p-4">
    <div className="flex bg-white p-4">
        {/* y-axis */}
        <div className="mr-4 flex flex-col justify-between text-sm text-gray-400">
            {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
            ))}
        </div>

        <div className="flex-grow flex justify-between items-end w-full">
            {revenue.map((month) => (
                <div key={month.month} className="flex flex-col items-center gap-2" style={{ flex: `1 0 calc(100% / 12)` }}>
                    {/* bars */}
                    <div
                        className="w-full rounded-md bg-blue-300"
                        style={{
                            height: `${(chartHeight / topLabel) * month.revenue}px`,
                            width: 'calc(100% - 10px)',
                        }}
                    ></div>
                    {/* x-axis */}
                    <p className="-rotate-0 text-sm text-gray-400">
                        {month.month}
                    </p>
                </div>
            ))}
        </div>
    </div>
    <div className="flex items-center justify-between pb-2 pt-6">
        <div></div>
        <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
    </div>
</div>

        </div>
    );
}