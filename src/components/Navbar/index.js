import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const Navbar = () => (
    <Layout.Header className="header">

        <div className="logo"> Logomarca </div>

        <Menu theme="dark" onClick={() => {}} mode="horizontal">

            <Menu.Item key="scheduler">
                <Link to="/"> Agendar serviço </Link>
            </Menu.Item>

            <Menu.SubMenu key="dashboard" title={<>Administração <CaretDownOutlined /></>}>

                <Menu.Item key="dashboard/agendamentos">
                    <Link to="/dashboard/agendamentos"> Agendamentos </Link>
                </Menu.Item>

                <Menu.Item key="dashboard/servicos">
                    <Link to="/dashboard/servicos"> Tipos de serviços </Link>
                </Menu.Item>

            </Menu.SubMenu>

        </Menu>

    </Layout.Header>
)

export default Navbar
