import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateElapsedTime } from "../../redux/slices/workLogSlice";

const useTimer = () => {
    const dispatch = useDispatch();
    const workLogStartTime = useSelector(state => state.workLog.workLogStartTime);
    const workLogTime = useSelector(state => state.workLog.workLogTime); // Get elapsed time from state

    useEffect(() => {
        if (!workLogStartTime) return; // Early exit if start time isn't set

        const interval = setInterval(() => {
            dispatch(updateElapsedTime());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [dispatch, workLogStartTime]); // Depend on workLogStartTime

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return formatTime(workLogTime); // Return the formatted time
};

export default useTimer;