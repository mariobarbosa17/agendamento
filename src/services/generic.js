import api from './api'

import { sleep } from '../utils'

const createApi = endpoint => {

    const $api = {}

    $api.fetchAll = async (params = {}) => {

        await sleep(500)

        try{
            const response = await api.get(endpoint, {
                params
            })

            const data = response.data.map((item, key) => ({
                key,
                ...item
            }))

            return {
                data
            }
        }catch(exception){
            return { error: exception }
        }

    }

    $api.add = async data => {

        await sleep(500)

        try{
            data.createdAt = (new Date).toJSON()

            await api.post(endpoint, data)

            return { data }
        }catch(exception){
            return { error: exception }
        }

    }

    $api.delete = async id => {

        await sleep(500)

        const [ $endpoint ] = endpoint.split('?')

        try{
            await api.delete(`${$endpoint}/${id}`)
            return {}
        }catch(exception){
            return { error: exception }
        }

    }

    $api.fetch = async id => {

        await sleep(500)

        const [ $endpoint ] = endpoint.split('?')

        try{
            const { data } = await api.get(`${$endpoint}/${id}`)

            return {
                data
            }
        }catch(exception){
            return { error: exception }
        }

    }

    $api.edit = async (id, data) => {

        await sleep(500)

        const [ $endpoint ] = endpoint.split('?')

        try{
            await api.put(`${$endpoint}/${id}`, data)
            
            return {
                data
            }
        }catch(exception){
            return { error: exception }
        }

    }

    return $api

}

export default createApi
