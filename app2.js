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
    handleClickItem = (key) =>{
        const arrayOfItem = this.state.toDo;
        arrayOfItem.map((item,id) => {
            if (id == key){
                item.completedItem = !item.completedItem;
            }
            this.setState({
                toDo: arrayOfItem
            })
    })}

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
    finalList = () =>{
        
        if(this.state.type.all){
            console.log('hi')
            const allList = this.state.toDo.map((item, key) =>{

                return <li style={item.completedItem ? { color: '#ccc' } : { color: '#000' }}
                    key={key} onClick={() => this.handleClickItem(key)}>
                    {item.text}
                </li>}
                );
                return allList
            }
        
        if(this.state.type.completed){
            
            const completedList = this.state.toDo.map((item, key) => {
                return item.completedItem ?
                    <li style={item.completedItem ? { color: '#ccc' } : { color: '#000' }}
                        key={key} onClick={() => this.handleClickItem(key)}>
                        {item.text}
                    </li>
                    : ''
            })               
            return completedList
            }
        
        if(this.state.type.active){
            
            const activeList = this.state.toDo.map((item, key) => {
                return !item.completedItem ?
                    <li style={item.completedItem ? { color: '#ccc' } : { color: '#000' }}
                        key={key} onClick={() => this.handleClickItem(key)}>
                        {item.text}
                    </li>
                    : ''
            })
            return activeList
            }
        }
    
    render(){
        

        return(
            <div>
                <form onSubmit={this.handleInputValue}>
                    <input type ="text" name="inputValue"
                           value = {this.state.input}
                           onChange ={this.handleChange} />
                    <button>CLick To Add</button>
                </form>

                <ol>
                    {this.finalList()}
                </ol>
                <button onClick={() => this.filter('all')}>All</button>
                <button onClick={() => this.filter('completed')}>Completed</button>
                <button onClick={() => this.filter('active')}>Active</button>
            </div>
        )
    }
}

    ReactDOM.render(<ToDo /> , document.getElementById('app'));
