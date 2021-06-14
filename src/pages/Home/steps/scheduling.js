import { useState, useEffect } from 'react'
import { Form, DatePicker, TimePicker } from 'antd'

const Scheduling = props => {
    const [data, setData] = useState({})

    const set_data = (column, value) => setData({ ...data, [column]: value })

    useEffect(() => props.onChange(data), [data])

    return (
        <>
            <Form.Item
                name="date"
                label="Data"
                rules={[
                    {
                        type: 'object',
                        required: true,
                        message: 'Informe a data'
                    }
                ]}>

                <DatePicker
                    format="DD/MM/YYYY"
                    onChange={date => set_data('date', date.format('YYYY-MM-DD'))} />

            </Form.Item>

            <Form.Item
                name="hour"
                label="Hora"
                style={{ marginBottom: 0 }}
                rules={[
                    {
                        type: 'object',
                        required: true,
                        message: 'Informe a hora'
                    }
                ]}>

                <TimePicker
                    format="HH:mm:ss"
                    onChange={hour => set_data('hour', hour.format('HH:mm:ss'))} />

            </Form.Item>
        </>
    )
}

export default Scheduling
