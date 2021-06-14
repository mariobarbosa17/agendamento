import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Table, message, Tooltip, Popconfirm, Tag } from 'antd'
import { LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import scheduleApi from '../../../services/schedules'
import statusList from '../../../constants/scheduleStatusList'
import { format_date } from '../../../utils'
import { Loading } from '../../../components'

import '../style.css'

const Schedules = () => {
    const [data, setData]                                   = useState([])
    const [searchTerm, setSearchTerm]                       = useState('')
    const [isLoading, setIsLoading]                         = useState(false)
    const [schedulesBeingRemoved, setSchedulesBeingRemoved] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            with: '10px'
        },
        {
            title: 'Situação',
            dataIndex: 'status',
            key: 'status',
            render: statusId => {

                const status = statusList[statusId];

                return (
                    <Tag color={status.color} key={status}>
                        {status.name}
                    </Tag>
                )

            }
        },
        {
            title: 'Data do Agendamento',
            dataIndex: 'date',
            key: 'date',
            render: (date, record) => `${date.split('-').reverse().join('/')} ${record.hour}`
        },
        {
            title: 'Proprietário do Veículo',
            dataIndex: 'owner',
            key: 'owner'
        },
        {
            title: 'Placa do Veículo',
            dataIndex: 'license_plate',
            key: 'license_plate'
        },
        {
            title: 'Serviço',
            dataIndex: 'service',
            key: 'service',
            render: (service, record) => (
                <>
                    <div>{service.name}</div>
                    <div style={{ color: '#999' }}>{record.description}</div>
                </>
            )
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

                    <Link to={`/dashboard/agendamentos/editar/${record.id}`}>
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
                        onConfirm={() => delete_schedule(record.id)}>
                        <Tooltip title="Excluir" placement="bottom">
                            <Button
                                shape="circle"
                                size="large"
                                style={{ marginLeft: '5px' }}
                                disabled={schedulesBeingRemoved.includes(record.id)}>
                                {schedulesBeingRemoved.includes(record.id) ? <LoadingOutlined /> : <DeleteOutlined />}
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                </div>
            )
        }
    ]


    const fetch_schedules = async (filters = {}) => {

        setIsLoading(true)

        const response = await scheduleApi.fetchAll(filters)

        setIsLoading(false)

        if(!!!response.error){
            
            setData(response.data)
            return

        }
        
        message.error('Não foi possível carregar os agendamentos.')

    }

    const onChangeSearch = event => {

        const { value } = event.target

        if(!!!value)
            fetch_schedules()

        setSearchTerm(value)

    }

    const delete_schedule = async id => {

        mark_schedule_as_being_removed(id)

        const response = await scheduleApi.delete(id)

        unmark_schedule_as_being_removed(id)

        if(!!!response.error){

            fetch_schedules()

            message.success('Agendamento excluído com sucesso.')

            return

        }

        message.error('Não foi possível excluir o agendamento.')

    }

    const mark_schedule_as_being_removed = id => {

        if(!schedulesBeingRemoved.includes(id))
            setSchedulesBeingRemoved([...schedulesBeingRemoved, id])

    }

    const unmark_schedule_as_being_removed = id => setSchedulesBeingRemoved(schedulesBeingRemoved.filter(scheduleId => scheduleId !== id))


    useEffect(() => fetch_schedules(), [])


    return (
        <>
            <h2> Agendamentos </h2>

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
                        onClick={() => fetch_schedules({ q: searchTerm })}>
                        Filtrar
                    </Button>

                </div>

                <Link to="/dashboard/agendamentos/adicionar">

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

export default Schedules
