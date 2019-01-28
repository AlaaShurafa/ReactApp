class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.toDoListItem =['hi'];
        this.completedItem =[];
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.filter = this.filter.bind(this);
        this.state ={
            defaultColor : '#00ff00',
            activeColor : '#ccc',
        }
        this.showFilter = false
        
    }
    handleInputValue(e){
        e.preventDefault();
        let inputValue = e.target.inputValue.value;
        console.log(inputValue)
        if (inputValue){
            this.toDoListItem.push(e.target.inputValue.value);
            e.target.inputValue.value = ""
        }
        RenderInt()

    }
    handleClickItem(e){
        e.target.style.color = (this.state.activeColor);
        this.completedItem.push(e.target.outerText);
    }
    filter(e){
        this.showFilter ? this.showFilter = false : this.showFilter = true;
        RenderInt()
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleInputValue}>
                    <input type ="text" name="inputValue"/>
                    <button>CLick To Add</button>
                </form>

                <ol>
                    {this.toDoListItem.map((item, key) => 
                    <li style={{  color:  this.state.defaultColor }} 
                     key={key} onClick={this.handleClickItem}>{item}</li>) }
                </ol>
                <button onClick={this.filter}>{this.showFilter ? 'UnFilter' : 'Filter'}</button>
            </div>
        )
    }
}
function RenderInt(){
    ReactDOM.render(<ToDo /> , document.getElementById('app'));
}
// setInterval(RenderInt,1000)
RenderInt()