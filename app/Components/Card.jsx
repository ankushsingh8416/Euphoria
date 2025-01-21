import React from 'react'

const Card = ({ title, value, icon, percentage }) => {
    const percentageColor = percentage.startsWith('-') ? 'text-red-500' : 'text-green-500';

    return (
        <>

            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <div>
                    <img src={icon} alt={`${title} icon`} className="w-10  h-10" />
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-gray-600">{title}</p>
                    <p className="text-xl font-semibold">{value}</p>
                    <p className={`text-sm ${percentageColor}`}>{percentage}</p>
                </div>
            </div>


        </>
    )
}

export default Card