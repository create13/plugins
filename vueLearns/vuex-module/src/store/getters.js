
const getters ={
		isEvenOrOdd(state){
		return state.user.count%2==0?'我是偶数':'我是基数';
	}
		
}
export default getters;
