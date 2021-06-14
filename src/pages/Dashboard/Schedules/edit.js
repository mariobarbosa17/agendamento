import moment from 'moment'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { Form, Input, Button, message, Radio, DatePicker, TimePicker } from 'antd'

import scheduleApi from '../../../services/schedules'
import { ServicesList, ScheduleStatusList, Loading } from '../../../components'

const Edit = () => {
    let history  = useHistory()
    const [form] = Form.useForm()
    const { id } = useParams()

    const [schedule, setSchedule]   = useState({})
    const [isSaving, setIsSaving]   = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const fetch_schedule = async () => {

        setIsLoading(true)

        const response = await scheduleApi.fetch(id)

        if(!!!response.error){

            setSchedule({
                ...response.data,
                date: moment(response.data.date),
                hour: moment(`${response.data.date} ${response.data.hour}`)
            })

        }else{
            
            message.error('Não foi possível carregar o agendamento.')

        }

        setIsLoading(false)

    }
    
    const on_finish = async () => {

        setIsSaving(true)

        const formData = await form.validateFields()

        const response = await scheduleApi.edit(id, {
            ...schedule,
            ...formData,
            date: formData.date.format('YYYY-MM-DD'),
            hour: formData.hour.format('HH:mm:ss')
        })

        setIsSaving(false)

        if(!!!response.error){

            message.success('O Agendamento foi salvo com sucesso!')

            history.push('/dashboard/agendamentos')

            return

        }
        
        message.error('Não foi possível salvar o agendamento.')
    
    }


    useEffect(() => fetch_schedule(), [])


    return (
        <>
            <h2> Editar Agendamento </h2>

            { isLoading ? <Loading /> : (

                <div className="content-fields">

                    <Form
                        scrollToFirstError
                        form={form}
                        onFinish={on_finish}
                        size="large"
                        layout="vertical"
                        initialValues={schedule}>

                        <Form.Item
                            name="license_plate"
                            label="Placa do Veículo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe a placa do veículo'
                                }
                            ]}
                            style={{ width: 120 }}>

                            <Input ref={(input) => input && input.focus()} />

                        </Form.Item>

                        <Form.Item
                            name="owner"
                            label="Proprietário do Veículo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe o nome do proprietário do veículo'
                                }
                            ]}>
                            
                            <Input />

                        </Form.Item>

                        <Form.Item
                            name="serviceId"
                            label="Serviço"
                            rules={[
                                {
                                    required: true,
                                    message: 'Escolha ao menos um serviço'
                                }
                            ]}>

                            <Radio.Group>
                                <ServicesList />
                            </Radio.Group>

                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Descrição">
                            
                            <Input.TextArea rows={2} />

                        </Form.Item>

                        <div style={{ display: 'flex' }}>

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

                                <DatePicker format="DD/MM/YYYY" />

                            </Form.Item>

                            <Form.Item
                                name="hour"
                                label="Hora"
                                style={{ marginLeft: '10px' }}
                                rules={[
                                    {
                                        type: 'object',
                                        required: true,
                                        message: 'Informe a hora'
                                    }
                                ]}>

                                <TimePicker format="HH:mm:ss" />

                            </Form.Item>

                        </div>

                        <Form.Item
                            name="status"
                            label="Situação"
                            rules={[
                                {
                                    required: true,
                                    message: 'Escolha ao menos uma situação'
                                }
                            ]}>

                            <Radio.Group buttonStyle="solid">
                                <ScheduleStatusList />
                            </Radio.Group>

                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSaving}>
                            Salvar
                        </Button>

                    </Form>

                </div>
            )}
        </>
    )
}

export default Edit
