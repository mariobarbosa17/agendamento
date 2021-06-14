import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { Form, Input, Button, InputNumber, message } from 'antd'

import serviceApi from '../../../services/services'
import { Loading } from '../../../components'

const Edit = () => {
    let history  = useHistory()
    const [form] = Form.useForm()
    const { id } = useParams()
    
    const [service, setService]     = useState({})
    const [isSaving, setIsSaving]   = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const fetch_service = async () => {

        setIsLoading(true)

        const response = await serviceApi.fetch(id)

        if(!!!response.error)
            setService(response.data)
        else
            message.error('Não foi possível carregar o serviço.')

        setIsLoading(false)

    }

    const on_finish = async () => {

        setIsSaving(true)

        const formData = await form.validateFields()
        const response = await serviceApi.edit(id, { ...service, ...formData })

        setIsSaving(false)

        if(!!!response.error){

            message.success('O serviço foi salvo com sucesso!')

            history.push('/dashboard/servicos')

            return

        }
        
        message.error('Não foi possível salvar o serviço.')
    
    }


    useEffect(() => fetch_service(), [])


    return (
        <>
            <h2> Editar Tipo de Serviço </h2>

            { isLoading ? <Loading /> : (

                <div className="content-fields">

                    <Form
                        scrollToFirstError
                        form={form}
                        onFinish={on_finish}
                        size="large"
                        layout="vertical"
                        initialValues={service}>

                        <Form.Item
                            name="name"
                            label="Nome"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe o nome'
                                }
                            ]}>

                            <Input ref={(input) => input && input.focus()} />

                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Descrição">

                            <Input.TextArea rows={2} />

                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Preço Base"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe o preço'
                                }
                            ]}>

                            <InputNumber
                                min={0}
                                precision={2}
                                decimalSeparator=","
                                parser={value => value.replace(',', '.')}
                                style={{ width: 120 }} />

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
