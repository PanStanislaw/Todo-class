import React from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

  render() {
        const { button, filter, onClick } = this.props
    return (
      <div className="btn-group">
          {
              button.map(el =>             
            <button 
                key={el.name}
                type="button" 
                className={ filter ===  el.name
                ?  "btn  btn-info" 
                : "btn btn-outline-secondary"} 
                onClick={onClick}>
                {el.name}
            </button>)
          }
      </div>
    );
  }
}


