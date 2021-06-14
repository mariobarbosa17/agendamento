import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Schedules from './pages/Dashboard/Schedules'
import SchedulesAdd from './pages/Dashboard/Schedules/add'
import SchedulesEdit from './pages/Dashboard/Schedules/edit'

import Services from './pages/Dashboard/Services'
import ServicesAdd from './pages/Dashboard/Services/add'
import ServicesEdit from './pages/Dashboard/Services/edit'

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
    </Switch>
)

const DashboardRoutes = () => (
    <Switch>
        <Route path="/dashboard/agendamentos" exact component={Schedules} />
        <Route path="/dashboard/agendamentos/adicionar" component={SchedulesAdd} />
        <Route path="/dashboard/agendamentos/editar/:id" component={SchedulesEdit} />
        
        <Route path="/dashboard/servicos" exact component={Services} />
        <Route path="/dashboard/servicos/adicionar" component={ServicesAdd} />
        <Route path="/dashboard/servicos/editar/:id" component={ServicesEdit} />
    </Switch>
)

export {
    Routes,
    DashboardRoutes
}
