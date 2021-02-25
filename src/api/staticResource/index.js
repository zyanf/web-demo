import $http from '@/utils/$http'

export const staticResource = {
    getBasePath() {
        return $http.get('/staticResource/path/basePath')
    }
}
