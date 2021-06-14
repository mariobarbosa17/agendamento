import locale from 'antd/lib/locale/pt_BR'
import { Layout, ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'

import 'antd/dist/antd.css'
import './app.css'

import { Navbar } from './components'
import { Routes } from './routes'

const App = () => (
    <Router>
        <ConfigProvider locale={locale}>
            <Layout className="layout">
                <Navbar />

                <Layout.Content className="content">
                    <div className="main">
                        <Routes />
                    </div>
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    </Router>
)

export default App
