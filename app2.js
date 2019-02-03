class ToDo extends React.Component{
 
    state = {
        input : '',
        toDo : [{
            text : 'Hi there',
            completedItem : false
        }] ,
        type : {
            all : true,
            completed :false,
            active : false
        }
        // showFilter : false
    }
    handleChange = (e) =>{
        this.setState({input : e.target.value});
    }
    handleInputValue = (e) => {
        e.preventDefault();
        let newItem = { text:this.state.input, completedItem: false }
        if (this.state.input){
            this.setState({
                toDo: [...this.state.toDo,newItem] , input: ''
                })
        }
    }
    handleClickItem = (id) =>{
        const arrayOfItem = this.state.toDo.map((item,i) => (
            i === id ? { ...item, completedItem:!item.completedItem} : item
        ));
        console.log(arrayOfItem)
        this.setState({ toDo: arrayOfItem})
        }

    filter = (type) =>{
        // this.state.showFilter ? this.setState({ showFilter: false }) : this.setState({ showFilter: true });    
        if(type == 'all'){
            this.setState({
                type: {
                    all: true,
                    completed: false,
                    active: false
                }
            })
        }
        else if (type == 'completed') {
            this.setState({
                type: {
                    all: false,
                    completed: true,
                    active: false
                }
            })
        }
        else if (type == 'active') {
            this.setState({
                type: {
                    all: false,
                    completed: false,
                    active: true
                }
            })
        }

    }
  
    render(){
        

        return(
            <div>
                <form onSubmit={this.handleInputValue}>
                    <FormInput  name="inputValue" value = {this.state.input} onChange ={this.handleChange} />
                    <button>CLick To Add</button>
                </form>

                <ToDoList toDo={this.state.toDo} onClick={this.handleClickItem} type={this.state.type} />

                <FilterButton type="All" onClick={()=>this.filter('all')} />
                <FilterButton type="Completed" onClick={()=>this.filter('completed')} />
                <FilterButton type="Active" onClick={()=>this.filter('active')} />
            </div>
        )
    }
}


class FormInput extends React.Component{
    render(){
        return(
            <input type="text" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
        )
    }
}

class ToDoList extends React.Component{
    render(){
        const allList = this.props.toDo.map((item, key) => {
            const style = item.completedItem ? { color: '#ccc' } : { color: '#000' };
            const FinalLi = <li style={style} key={key} onClick={() => this.props.onClick(key)}>{item.text}</li>;

            if(this.props.type.all){
                return FinalLi
            }
            if(this.props.type.completed){
                return item.completedItem ? FinalLi: ''
            }
            if(this.props.type.active){
                return !item.completedItem ?FinalLi: ''
            }
        });
        return(
               <ol>{allList}</ol>

        )
    }
}
class FilterButton extends React.Component{
    render(){
        return(
            <button onClick={this.props.onClick}>{this.props.type}</button>
        )
    }
}
    ReactDOM.render(<ToDo /> , document.getElementById('app'));
