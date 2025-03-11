/* 
  处理元素多个classname，且支持按条件挂载
*/
export const mutiClassName = (arr: any) => {
  return arr.map((d: any) => `${d}`).join(" ");
};
