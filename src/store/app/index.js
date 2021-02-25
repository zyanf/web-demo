import _ from 'lodash'
import { Message } from 'element-ui'

import { user } from '@/api'
import { clientType, currentType } from '@/config'

const InitState = {
    user: {
        userId: '',
        userQq: '',
        userSex: 0,
        userName: '',
        userPhone: '',
        userEmail: '',
        departments: [],
        userBirthday: '',
        userCreateTime: '',
        userIcon: {
            userId: '',
            isAudit: 0,
            iconUrl: '',
            isNameIcon: 0,
            userIconId: '',
            auditRemark: ''
        },
        organizationUserDTO: {
            orgId: '',
            userId: '',
            orgName: '',
            orgIsDisable: 0,
            isSupervisor: 0,
            linkOrgUserId: '',
            linkOrgUserPost: '',
            linkOrgUserIsDisable: 0,
            linkOrgUserJobNumber: '',
            linkOrgUserIsDimission: 0,
            linkOrgUserDetailAddress: '',
            linkOrgUserDisableRemark: '',
            linkOrgUserAdministrativeArea: ''
        }
    },
    loading: 0,
    lang: 'zh_cn',
    token: {
        userId: '',
        tokenId: '',
        subToken: '',
        marketToken: '',
        currentCompanyId: '',
        clientType: clientType,
        currentType: currentType
    },
    company: {
        orgId: '',
        orgName: '',
        orgLogoUrl: '',
        isSupervisor: 0,
        orgIsDisable: 0,
        linkOrgUserId: '',
        linkOrgUserIsDisable: 0
    }
}

export const state = InitState

export const actions = {
    async getUser({ commit }) {
        try {
            const res = await user.getPersonalInformation()
            if (res.resStatus !== 200) throw new Error(res.message)
            commit('SET_STATE', { user: res.result })
        } catch (err) {
            Message.error(err.message)
        }
    },

    setUser({ commit }, user) {
        commit('SET_STATE', { user })
    },

    setToken({ commit }, token) {
        commit('SET_STATE', { token })
    },

    clearToken({ commit }) {
        commit('CLEAR_TOKEN')
    },

    setLang({ commit }, lang) {
        commit('SET_STATE', { lang })
    },
    showLoading({ state, commit }) {
        commit('SET_STATE', { loading: state.loading + 1 })
    },
    hideLoading({ state, commit }, hadeAll) {
        if (hadeAll) {
            commit('SET_STATE', { loading: 0 })
        } else {
            commit('SET_STATE', { loading: state.loading - 1 })
        }
    },

    setCompany({ commit }, company) {
        commit('SET_STATE', { company })
        commit('SET_STATE', { 'token.currentCompanyId': company.orgId })
    }
}

export const mutations = {
    SET_STATE(state, payload) {
        for (const p in payload) {
            const _state = _.get(state, p)
            if (typeof _state === 'object') {
                const obj = { ..._state, ...payload[p] }
                _.set(state, p, _.cloneDeep(obj))
            } else {
                _.set(state, p, payload[p])
            }
        }
    },
    CLEAR_TOKEN(state) {
        _.set(state, 'token', InitState.token)
    }
}
