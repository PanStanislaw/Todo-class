import React from "react";
import './AddItem.css'

export default class AddItem extends React.Component {

    constructor(){
        super()
        this.state = {
            lable: ''
        }

        this.onLableChange = (e) => {
               this.setState({
                lable : e.target.value
               })
        }

        this.onSubmit = (e) => {
            e.preventDefault();
            this.props.newItem(this.state.lable);
            this.setState({
                lable: ''
            });
        }

        }

    render(){
        const { newItem } = this.props
        return(
            <form className="d-flex" onSubmit={this.onSubmit}>
                <input className="add-input form-control" type="text" 
                placeholder="new item..."
                onChange={this.onLableChange}
                value={this.state.lable}
                />
                <button className="btn btn-info" onClick={this.newItem}>
                 Push   
                </button>
            </form>
        )
    }
}