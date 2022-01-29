import React from "react";
import TrackerListItem from '../../Tracker/TrackerListItem/TrackerListItem';

const TrackerList = ({ time, tracker_list, onRemove }) => {
    if (tracker_list == '') {
        return <div className="dark:bg-grey-800 dark:text-white bg-grey-200 text-center p-20 transition-all duration-150 rounded-md min-h-full">Трекер пуст</div>
    }
    return(
        <div className='dark:bg-grey-800 bg-grey-200 transition-all duration-150 rounded-md w-full min-h-full'>
            <ul className="flex flex-col space-y-2 dark:text-white transition-all duration-150 p-2 text-sm">
                {tracker_list.map((item) => (
                    <TrackerListItem 
                        key={item.id} 
                        item={item} 
                        onRemove={onRemove}
                        time={time}

                    />
                ))}
            </ul>
        </div>
    )
};

export default TrackerList;