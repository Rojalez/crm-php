import React, { useState, useEffect } from "react";
import { getUser } from "../API/UserService";
import { getAll } from "../API/TaskService";
import { useFetching } from "../hooks/useFetching";
import useHeader from "../hooks/useHeader";
import Moment from "react-moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Profile = () => {
  const [user, setUser] = useState([]);
  const id = user.id
  const header = useHeader();
  const [subscribe, setSubscribe] = useState(false);
  const [fetchUser, isLoading] = useFetching(async () => {
    const response = await getUser(header);
    setUser(response);
  });

  useEffect(() => {
    setSubscribe(true);
    fetchUser(user);
    return () => setSubscribe(false);
  },[]);

  if (!subscribe) {
    return null;
  }
  return (
    <div className="p-10 space-y-4">
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center p-10">
          <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {isLoading ? (
              <Skeleton
                enableAnimation={false}
                width={200}
                className="dark:bg-gray-700 animate-pulse"
              />
            ) : (
              user.name
            )}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {isLoading ? (
              <Skeleton
                enableAnimation={false}
                width={200}
                className="dark:bg-gray-700 animate-pulse"
              />
            ) : (
              user.queue_tasks
            )}
          </span>
          {isLoading ? (
            <Skeleton
              enableAnimation={false}
              width={200}
              className="dark:bg-gray-700 animate-pulse"
            />
          ) : (
            <Moment
              format="HH:mm:ss DD.MM.YY"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {user.created_at}
            </Moment>
          )}
        </div>
      </div>
      {/* <div className="p-4 mx-auto max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      {tasks.map(task => (
        <div key={task.id} className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {task.author.name}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {task.created_at}
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}
      </div> */}
    </div>
  );
};

export default Profile;