import { useMemo } from 'react'
import type { IChartData } from './chartData'

const Bar = ({ height, name, color, ticketCount }: any) => {
    return (
        <div className='bar' style={{ backgroundColor: color, height: `${height}%` }}> 
            <div className='tooltip'>
                {name} - {ticketCount}
            </div>
        </div>
    )
}

function BarChart({ data }: { data: IChartData[] }) {
    const maxCount = useMemo(() => {
        return Math.max(...data.map(item => item.ticketCount));
    }, [data])


    return (
        <div className='chart-container'>
            <div className='chart'>
                {
                    data?.map((barItem: IChartData) => (
                        <Bar
                            key={barItem.id}
                            height={(barItem.ticketCount / maxCount) * 100}
                            {...barItem}
                        />
                    ))
                }
            </div>
            <div className='y-axis-label'>Number of tickets</div>
            <div className='x-axis-label'>Departments</div>
        </div>
    )
}

export default BarChart