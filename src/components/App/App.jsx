import React from 'react';

import AppHeader from '../AppHeader/';
import TodoList from '../TodoList/';
import SerchPanel from '../SearchPanel/';
import ItemStatusFilter from '../ItemStatusFilter/';
import AddItem from '../AddItem';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: [
        { lable: 'Drink Cofee', important: false, done: false, id: 1 },
        { lable: 'Make Awesome App', important: false, done: true, id: 2 },
        { lable: 'Have a lanch', important: false, done: false, id: 3 },
      ],
      but: [
        { name: 'All', active: true },
        { name: 'Active', active: false },
        { name: 'Done', active: false },
      ],
      term: '',
      filter: 'All',
    };

    this.addItem = (text) => {
      this.setState(({ todoData }) => {
        let idx = todoData.length + 1;
        const newItem = { lable: text, important: false, done: false, id: idx };
        const newArray = [...todoData, newItem];
        return {
          todoData: newArray,
        };
      });
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const newData = todoData.filter((el, i) => el.id !== id);

        return {
          todoData: newData,
        };
      });
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return todoData.map((el) => {
          if (el.id === id) {
            el.important = !el.important;
          }
        });
      });
    };

    this.onSearchChange = (term) => {
      this.setState({ term });
    };

    this.onSearch = (items, term) => {
      if (term === '') {
        return items;
      }
      return items.filter((item) => {
        return item.lable.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    };

    this.onFilter = (items, filter) => {
      switch (filter) {
        case 'All':
          return items;
        case 'Active':
          return items.filter((el) => el.done === false);
        case 'Done':
          return items.filter((el) => el.done === true);
        default:
          return items;
      }
    };

    this.onActiveFilter = (e) => {
      this.setState(({ filter }) => {
        return { filter: e.target.innerHTML };
      });
    };
  }

  render() {
    const { todoData, but, term, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.onFilter(this.onSearch(todoData, term), filter);
    return (
      <div>
        <AppHeader work={doneCount} done={todoCount} />
        <div className="top-panel d-flex">
          <SerchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter button={but} onClick={this.onActiveFilter} filter={filter} />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={(id) => this.deleteItem(id)}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem newItem={this.addItem} />
      </div>
    );
  }
}
