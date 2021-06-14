import { Radio } from 'antd'

import statusList from '../../constants/scheduleStatusList'

const ScheduleStatusList = () => {

    return (
        <>
            {Object.entries(statusList).map(([id, status]) => (
                <Radio.Button
                    key={id}
                    value={parseInt(id)}>
                    {status.name}
                </Radio.Button>
            ))}
        </>
    )
}

export default ScheduleStatusList
