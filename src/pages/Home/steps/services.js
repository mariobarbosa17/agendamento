import { Form, Radio, Input } from 'antd'
import { useState, useEffect } from 'react'
import { ServicesList } from '../../../components'

const Services = props => {
    const [data, setData] = useState({})

    const set_data = (column, value) => setData({ ...data, [column]: value })

    useEffect(() => props.onChange(data), [data])

    return (
        <>
            <Form.Item
                name="serviceId"
                label="Serviço"
                rules={[
                    {
                        required: true,
                        message: 'Escolha ao menos um serviço'
                    }
                ]}>

                <Radio.Group onChange={event => set_data('serviceId', event.target.value)}>
                    <ServicesList />
                </Radio.Group>

            </Form.Item>

            <Form.Item
                name="description"
                label="Observações"
                style={{ marginBottom: 0 }}
                onChange={event => set_data('description', event.target.value)}>
                
                <Input.TextArea rows={2} />

            </Form.Item>
        </>
    )
}

export default Services
