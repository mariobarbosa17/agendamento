import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Table, message, Tooltip, Popconfirm } from 'antd'
import { LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import serviceApi from '../../../services/services'
import { format_currency, format_date } from '../../../utils'
import { Loading } from '../../../components'

import '../style.css'

const Services = () => {
    const [data, setData]                                 = useState([])
    const [searchTerm, setSearchTerm]                     = useState('')
    const [isLoading, setIsLoading]                       = useState(false)
    const [servicesBeingRemoved, setServicesBeingRemoved] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Preço Base',
            dataIndex: 'price',
            key: 'price',
            render: price => format_currency(price)
        },
        {
            title: 'Data de Cadastro',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: date => format_date(date)
        },
        {
            title: '',
            key: 'action',
            align: 'center',
            width: '50px',
            render: (_, record) => (
                <div style={{ whiteSpace: 'nowrap' }}>

                    <Link to={`/dashboard/servicos/editar/${record.id}`}>
                        <Tooltip title="Editar" placement="bottom">
                            <Button
                                shape="circle"
                                size="large">
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                    </Link>

                    <Popconfirm
                        title="Confirma exclusão?"
                        okText="Sim"
                        cancelText="Não"
                        onConfirm={() => delete_service(record.id)}>
                        <Tooltip title="Excluir" placement="bottom">
                            <Button
                                shape="circle"
                                size="large"
                                style={{ marginLeft: '5px' }}
                                disabled={servicesBeingRemoved.includes(record.id)}>
                                {servicesBeingRemoved.includes(record.id) ? <LoadingOutlined /> : <DeleteOutlined />}
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                </div>
            )
        }
    ]


    const fetch_services = async (filters = {}) => {

        setIsLoading(true)

        const response = await serviceApi.fetchAll(filters)

        setIsLoading(false)

        if(!!!response.error){
            
            setData(response.data)
            return
            
        }
        
        message.error('Não foi possível carregar os serviços.')

    }

    const onChangeSearch = event => {

        const { value } = event.target

        if(!!!value)
            fetch_services()

        setSearchTerm(value)

    }

    const delete_service = async id => {

        mark_service_as_being_removed(id)

        const response = await serviceApi.delete(id)

        unmark_service_as_being_removed(id)

        if(!!!response.error){

            fetch_services()

            message.success('Serviço excluído com sucesso.')

            return

        }

        message.error('Não foi possível excluir o serviço.')

    }

    const mark_service_as_being_removed = id => {

        if(!servicesBeingRemoved.includes(id))
            setServicesBeingRemoved([...servicesBeingRemoved, id])

    }

    const unmark_service_as_being_removed = id => setServicesBeingRemoved(servicesBeingRemoved.filter(serviceId => serviceId !== id))


    useEffect(() => fetch_services(), [])


    return (
        <>
            <h2> Tipos de serviços </h2>

            <div className="btns-top">

                <div className="search">

                    <Input
                        allowClear
                        size="large"
                        placeholder="Procurar..."
                        value={searchTerm}
                        onChange={onChangeSearch} />

                    <Button
                        type="default"
                        size="large"
                        disabled={!!!searchTerm}
                        style={{ marginLeft: '5px' }}
                        onClick={() => fetch_services({ q: searchTerm })}>
                        Filtrar
                    </Button>

                </div>

                <Link to="/dashboard/servicos/adicionar">

                    <Button
                        type="primary"
                        size="large">
                        Adicionar
                    </Button>

                </Link>
            
            </div>

            { isLoading ? <Loading /> : (
                <Table
                    columns={columns}
                    dataSource={data} />
            ) }
        </>
    )
}

export default Services
