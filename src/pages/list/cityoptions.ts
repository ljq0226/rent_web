import data from './pc.json'
const cityOptions = Object.keys(data).map((item)=>{
  return {
    value:item,
    label:item,
    children:data[item].map((item)=>{
      return {
        value:item,
        label:item,
      }
    })
  }
})
const cityString = (city)=>{
  let res = ['','']
  Object.keys(data).map(item=>{
    if (data[item]?.includes(city)) res =[item,city]
  })
  return res
}
export { cityOptions,cityString}
