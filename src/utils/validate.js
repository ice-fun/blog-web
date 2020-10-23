/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 校验手机号
export function checkPhone(rule, value, callback) {
  const phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/
  if (value === '') {
    callback(new Error('手机号码不能为空'))
  } else if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
