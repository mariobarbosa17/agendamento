import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Form, Input, Button, InputNumber, message } from 'antd'

import serviceApi from '../../../services/services'

const Add = () => {
    let history = useHistory()

    const [isLoading, setIsLoading] = useState(false)
    const [form]                    = Form.useForm()


    const on_finish = async () => {

        setIsLoading(true)

        const formData = await form.validateFields()
        const response = await serviceApi.add(formData)

        setIsLoading(false)

        if(!!!response.error){

            message.success('O serviço foi salvo com sucesso!')

            history.push('/dashboard/servicos')

            return

        }
        
        message.error('Não foi possível salvar o serviço.')
    
    }


    return (
        <>
            <h2> Adicionar Tipo de Serviço </h2>

            <div className="content-fields">

                <Form
                    scrollToFirstError
                    form={form}
                    onFinish={on_finish}
                    size="large"
                    layout="vertical"
                    initialValues={{
                        description: '',
                        price: ''
                    }}>

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
                        loading={isLoading}>
                        Salvar
                    </Button>

                </Form>

            </div>
        </>
    )
}

export default Add
