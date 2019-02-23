const rootApp = document.getElementById('app');
class Indecision extends React.Component{
    state ={
        options : [],
    }
    componentDidMount(){
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        this.setState({options})
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.options !== this.state.options){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
        }
    }
    hendleRemoveAll = () =>{
        this.setState({
            options:[]
        })
    }
    handleAddOption =(option) =>{
        if(option == ""){
            return "Add Option"
        }
        if(this.state.options.indexOf(option) >-1){
            return "this option alreay exict"
        }
        this.setState((prev)=>{
            return {
                options: prev.options.concat(option)
            }
        })

    }
    handlePick=()=>{
        let randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum])
    }
    handleRemoveOne =(opt)=>{
        console.log(opt)
        this.setState((prev)=>{
            return {options : prev.options.filter((option)=>option !==opt)}
        })
    }
    render(){
        return(
            <div>
                <Header />
                <Action handlePick = {this.handlePick} disabled = {this.state.options.length}/>
                <Options options={this.state.options} 
                handleRemove={this.hendleRemoveAll}
                handleRemoveOne={this.handleRemoveOne}/>
                <AddOption handleAddOption = {this.handleAddOption} />
            </div>
        )
    }
}
const Header = ()=>{
    return(
        <div>
            <h1>Indecision App</h1>
            <p>Put your life in progammer hands</p>
        </div>
    )
}
const Action =(props)=>{
    return(
        <button onClick={props.handlePick}
        disabled = {props.disabled > 0? false : true} 
        
        >What should I do?</button>
    )
}
const Options  =(props)=>{
    return (
        <div>
            <button onClick={props.handleRemove}>Remove all</button>
            {props.options.length ==0 ?<p>Add some option </p>:''}
            <ol>
                {props.options.map((option) => <Option key={option} option={option}
                    handleRemoveOne={props.handleRemoveOne} />)}
            </ol>
        </div>
    )
}
const Option =(props)=>{
        return(
            <li key={props.key}>{props.option} 
                <button onClick={() => props.handleRemoveOne(props.option)}>Remove</button>
            </li>
        )
}
class AddOption extends React.Component{
    state={
        error :''
    }
    handleAoption =(e)=>{
        e.preventDefault();
        
        let error = this.props.handleAddOption(e.target.elements.option.value)
        this.setState({error});
        e.target.elements.option.value = "";
    }
    render(){
        // console.log(this.state.error)
        return(
            <div>
                {this.state.error && <h3>{this.state.error}</h3>}
                <form onSubmit={this.handleAoption}>
                    <input type="text" name="option"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<Indecision/>,rootApp)
