import { useState, useEffect } from 'react'
import { Form, Input } from 'antd'

const Info = props => {
    const [data, setData] = useState({})

    const set_data = (column, value) => setData({ ...data, [column]: value })

    useEffect(() => props.onChange(data), [data])

    return (
        <>
            <Form.Item
                name="license_plate"
                label="Placa"
                onChange={event => set_data('license_plate', event.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Informe a placa do veículo',
                    }
                ]}>

                <Input />

            </Form.Item>

            <Form.Item
                name="owner"
                label="Nome do Proprietário"
                style={{ marginBottom: 0 }}
                onChange={event => set_data('owner', event.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Informe o nome do proprietário do veículo',
                    },
                ]}>

                <Input />

            </Form.Item>
        </>
    )
}

export default Info
