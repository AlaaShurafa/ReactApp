const rootApp = document.getElementById('app');
class CounterApp extends React.Component{
    state = {
        count : 0,
        tt :2,
        buttonText :'Show Details',
        Visibilty : false
    }
    addOne = ()=>{
        // let count = this.state.count +1
        console.log(this.state.tt)
        this.setState((preState)=>{
            return {
                count: preState.count+1,
                tt:preState.count
            }
        })
    }
    componentDidMount(){
        const num = localStorage.getItem('count');
        const count = parseInt(num);
        if(count){

            this.setState({count})
        }

    }
    componentDidUpdate(prevP,prevS){
        if(prevS.count !== this.state.count){
            localStorage.setItem('count',this.state.count)
        }
    }
    miOne = ()=>{
        let count = this.state.count -1
        this.setState({
            count:count
        })
    }
    reset = ()=>{
        
        this.setState({
            count:0
        })
    }
    handleClick =()=>{
        if(this.state.Visibilty){
            this.setState({
                buttonText:'Hide Details'
            })
        }
        else{
            this.setState({
                buttonText: 'Show Details'
            })
        }
        this.setState((prev)=>{
            return{
                Visibilty : !prev.Visibilty
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Count :{this.state.count}</h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.miOne}>-1</button>
                <button onClick={this.reset}>Reset</button>

                <div>
                    <h1>Visibilty toggle</h1>
                    <button onClick={this.handleClick}>{this.state.Visibilty? 'Hide Detials' : 'Show Details'}</button>
                    {this.state.Visibilty && <p>This is somee toggle</p>}
                </div>
            </div>
        )
    }
}
ReactDOM.render(<CounterApp /> , rootApp)
