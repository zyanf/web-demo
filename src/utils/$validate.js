import _ from 'lodash'
import validate from '@qietuzi/validate'

const rules = {
    empty(val) {
        return !validate.isEmpty(val)
    },
    phone(val) {
        return validate.isCellPhone(val)
    },
    password(val) {
        return val.length >= 6
    }
}

const $validate = function(self, arr) {
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i].key
        const rule = arr[i].rules
        const value = _.get(self, key)
        for (let j = 0; j < rule.length; j++) {
            // eslint-disable-next-line no-prototype-builtins
            if (rules.hasOwnProperty(rule[j])) {
                if (!rules[rule[j]](value)) {
                    const suffix = rule[j] === 'empty' ? 'Empty' : 'Error'
                    return self.langPrefix + key + suffix
                }
            } else {
                try {
                    const reg = new RegExp(rule[j])
                    if (!reg.test(value)) {
                        return self.langPrefix + key + 'Error'
                    }
                } catch (err) {
                    console.error('err')
                }
            }
        }
    }
    return ''
}

export default $validate
