import React from "react";
import PlanListItem from '../../Plan/PlanListItem/PlanListItem';

const PlanList = ({ plan_list, onRemove }) => {
    if (plan_list == '') {
        return <div className="dark:bg-grey-800 dark:text-white bg-grey-200 text-center p-20 transition-all duration-150 rounded-md min-h-full">Планов пока нет</div>
    }
    return(
        <div className='dark:bg-grey-800 bg-grey-200 transition-all duration-150 rounded-md w-full min-h-full'>
            <ul className="flex flex-col space-y-2 dark:text-white transition-all duration-150 p-2 text-sm">
                {plan_list.map((item) => (
                    <PlanListItem 
                        key={item.id} 
                        item={item} 
                        onRemove={onRemove}
                    />
                ))}
            </ul>
        </div>
    )
};

export default PlanList;