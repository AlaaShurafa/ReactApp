class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.toDoListItem =['hi'];
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.filter = this.filter.bind(this);
        this.state ={
            toDo : [{
                text : 'Hi there',
                completedItem : false
            }] ,
            showFilter : false
        }
        
    }
    handleInputValue(e){
        e.preventDefault();
        let inputValue = e.target.inputValue.value;
        let newItem = this.state.toDo.concat({ text: e.target.inputValue.value, completedItem: false })
        if (inputValue){
            this.setState({
                toDo: newItem
                })
            e.target.inputValue.value = ""
        }

    }
    handleClickItem(e){
        const arrayOfItem = this.state.toDo;

        arrayOfItem.map((item) => {
            if (item.text == e.target.outerText){
                item.completedItem = true;
                console.log(item);
                this.setState({
                    toDo: arrayOfItem
                })
            }
    })}

    filter(e){
        this.state.showFilter ? this.setState({ showFilter: false }) : this.setState({ showFilter: true });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleInputValue}>
                    <input type ="text" name="inputValue"/>
                    <button>CLick To Add</button>
                </form>

                <ol>
                    {this.state.showFilter ?
                        this.state.toDo.map((item, key) =>{
                            return item.completedItem ?
                                <li style={{ color: '#ccc'}}
                                    key={key}>{item.text}</li>
                                    : ''
                            
                        })

                                
                    : this.state.toDo.map((item, key) =>
                            <li style={item.completedItem ? { color: '#ccc' } : { color: '#000' }}
                                key={key} onClick={this.handleClickItem}>{item.text}</li>)
                    }

                </ol>
                <button onClick={this.filter}>{this.state.showFilter ? 'UnFilter' : 'Filter'}</button>
            </div>
        )
    }
}

    ReactDOM.render(<ToDo /> , document.getElementById('app'));
