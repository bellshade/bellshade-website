import constant from './constant'

const getContents = (url) => fetch(url).then((res) => res.json())

export const getPublicMembers = () => getContents(constant.api)
