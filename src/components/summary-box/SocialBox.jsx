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

const SocialBox = ({ item }) => {
    return (
        <Box>
            <div className='social-box'>
                <div className="social-box__info">
                    <div className="social-box__info__title">
                        <div>{item.title}</div>
                    </div>
                    <div className="social-box__info__value">
                        <div>{item.followers} Followers</div> 
                        <div>{item.posts} Posts</div> 
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default SocialBox

