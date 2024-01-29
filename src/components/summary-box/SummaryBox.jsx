import React from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = ({ item }) => {
    return (
        <Box>
            <div className='summary-box'>
                <div className="summary-box__info"> 
                    <div className="summary-box__info__title">
                        <div>{item.title}</div>
                    </div>
                    <div className="summary-box__info__value">
                        <span>{item.subtitle}</span> 
                       <div> {item.value}</div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default SummaryBox

