import $http from '@/utils/$http'

export const user = {
    getPersonalInformation() {
        return $http.post('/user/getPersonalInformation')
    }
}
