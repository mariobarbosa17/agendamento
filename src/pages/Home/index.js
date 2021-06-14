import { useState } from 'react'
import { Steps, Form, Button, message, Modal, Result } from 'antd'

import Info from './steps/info'
import Services from './steps/services'
import Scheduling from './steps/scheduling'

import scheduleApi from '../../services/schedules'
import { SCHEDULE_SCHEDULED } from '../../constants/scheduleStatus';

import './style.css'

const steps = [
    {
        title: 'Informações do Veículo',
        component: Info
    },
    {
        title: 'Serviços',
        component: Services
    },
    {
        title: 'Agendamento',
        component: Scheduling
    }
]

const Home = () => {

    const [currentStep, setCurrentStep]       = useState(0)
    const [formData, setFormData]             = useState({})
    const [isLoading, setIsLoading]           = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form]                              = Form.useForm()

    
    const component = () => {

        const ComponentName = steps[currentStep].component

        return <ComponentName onChange={data => setFormData({ ...formData, ...data })} />

    }
    
    const next = async () => {

        let currentStepFieldsNames = []

        switch(currentStep){

            case 0:
                currentStepFieldsNames = ['license_plate', 'owner']
                break
            
            case 1:
                currentStepFieldsNames = ['serviceId', 'description']
                break
            
            default:
                currentStepFieldsNames = ['date', 'hour']

        }

        try{
            await form.validateFields(currentStepFieldsNames)
        }catch{
            return
        }

        if(currentStep + 1 === steps.length){
            
            on_finish()
            return

        }

        setCurrentStep(currentStep + 1)

    }

    const on_finish = async () => {

        setIsLoading(true)

        const response = await scheduleApi.add({
            ...formData,
            status: SCHEDULE_SCHEDULED
        })

        setIsLoading(false)

        if(!!!response.error){

            form.resetFields()

            setCurrentStep(0)

            setIsModalVisible(true)

            return

        }

        message.error('Não foi possível salvar o agendamento.')

    }

    
    return (
        <section>
            <div className="home-content">

                <Steps progressDot current={currentStep}>
                    {steps.map((step, key) => <Steps.Step key={key} title={`Passo ${key + 1}`} description={step.title} />)}
                </Steps>

                <div className="steps">

                    <Form
                        form={form}
                        name="schedule"
                        layout="horizontal"
                        labelCol={{ span: 6 }}
                        size="large">

                        {component()}

                    </Form>

                </div>

                <div className="steps-buttons">

                    <Button
                        type="default"
                        size="large"
                        disabled={currentStep === 0}
                        style={{ marginRight: '10px' }}
                        onClick={() => setCurrentStep(currentStep - 1)}>
                        Voltar
                    </Button>

                    <Button
                        size="large"
                        type="primary"
                        onClick={next}
                        loading={isLoading}>
                        { currentStep < (steps.length - 1) ? 'Continuar' : 'Agendar' }
                    </Button>

                </div>

                <Modal
                    visible={isModalVisible}
                    footer={null}
                    closable={false}>

                    <Result
                        status="success"
                        title="Pronto!"
                        subTitle="O seu agendamento foi realizado com sucesso."
                        extra={[
                            <Button
                                type="primary"
                                key="done"
                                onClick={() => setIsModalVisible(false)}>
                                Concluir
                            </Button>
                        ]} />

                </Modal>

            </div>
        </section>
    )
}

export default Home
