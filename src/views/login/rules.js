// 登录表单的校验规则
export const mobileRules = [
  { required: true, message: '请填写用户名', trigger: 'onSubmit' },
  { pattern: /^1[0-9]\d{9}$/, message: '手机号码不合法' }
]
export const codeRules = [
  { required: true, message: '请填写密码', trigger: 'onSubmit' },
  { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
]
