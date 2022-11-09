Main('18 / 7*6+3-22-1000')

console.log(18 / 7*6+3-22-1000)

function Main(nums){
  nums = nums.replace(/\s/g,'').match(/\d+|\D/g)
  nums = MultAndDiv(nums)
  nums = AddAndSub(nums)
  console.log(nums.join())
}

function Calculation(nums, index, operator){
  switch(operator){
    case '+' :
      return [Number(nums[0]) + Number(nums[2])]
    case '-' :
      return [Number(nums[0]) - Number(nums[2])]
    case '*' :
      return [nums[index - 1] * nums[index + 1], index]
    case '/' :
      return [(nums[index - 1] / nums[index + 1]).toFixed(2), index]
  }
}

function MultAndDiv(nums)
{
  const Count = nums.filter((operator) => '*' === operator || '/' === operator).length // 연산자 개수
  for(let i = 0; i < Count; i++)
  {
    const multIndex = nums.indexOf('*')
    const divIndex = nums.indexOf('/')
    if(multIndex === -1) // '*' 연산자 존재 x
    {
      const [value, index] = Calculation(nums,divIndex,'/')
      nums[index -1] = value
      nums.splice(index, 2)
    }
    else if(divIndex === -1) // '/' 연산자 존재 x
    {
      const [value, index] = Calculation(nums,multIndex,'*')
      nums[index -1] = value
      nums.splice(index, 2)
    }
    else
    {
      const [value, index] = multIndex > divIndex ? Calculation(nums,divIndex,'/') : Calculation(nums,multIndex,'*')
      nums[index -1] = value
      nums.splice(index, 2)
    }
    console.log(nums)
  }
  return nums
}

function AddAndSub(nums)
{
  const len = Math.floor(nums.length/2)
  for(let i = 0; i < len; i++)
  {
    const [value] = Calculation(nums, NaN, nums[1])
    nums[0] = value
    nums.splice(1, 2)
  }
  return nums
}
