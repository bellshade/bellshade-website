import constant from './constant'

const getContents = (url) => fetch(url).then((res) => res.json())

export const getPublicMembers = () =>
  getContents('https://api.github.com/orgs/bellshade/public_members')

export const getUserInfo = (username) =>
  getContents(`https://api.github.com/users/${username}`)
