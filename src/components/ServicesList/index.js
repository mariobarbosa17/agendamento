import { useState, useEffect } from 'react'
import { Space, Radio, Spin, message } from 'antd'

import serviceApi from '../../services/services'
import { format_currency } from '../../utils'

import './style.css'

const ServicesList = () => {

    const [services, setServices]   = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const fetch_services = async () => {

        setIsLoading(true)

        const response = await serviceApi.fetchAll()

        setIsLoading(false)

        if(!!!response.error){
            
            setServices(response.data)
            return

        }
        
        message.error('Não foi possível carregar os serviços.')

    }

    
    useEffect(() => fetch_services(), [])

    
    return (
        <Space direction="vertical" size="middle" style={{ paddingLeft: '15px', paddingTop: '6px' }}>
            { isLoading ? <Spin /> : services.map((service, key) => (
                <Radio
                    key={key}
                    value={service.id}
                    className="radio-item">

                    <div>{service.name}</div>

                    <div className="service-list-description">
                        {format_currency(service.price)}
                        {service.description ? ` • ${service.description}` : ''}
                    </div>

                </Radio>
            ))}
        </Space>
    )
}

export default ServicesList
