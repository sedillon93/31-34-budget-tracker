import React from 'react';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';
import ExpenseItem from '../expense-item';
import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';
import { connect } from 'react-redux';
import './category-item.scss';


class CategoryItem extends React.Component{
  render(){
    let {
      expenses,
      expenseCreate,
      categories,
      categoryDestroy,
      categoryUpdate,
    } = this.props;

    return(
      categories.map((category, index) =>
        <div key={index} className='category-item'>
          <h2>Category: {category.label}</h2>
          <h3><em>Budget:</em> ${category.budget}</h3>
          <button onClick={() => this.props.categoryDestroy(category)}> Delete Category </button>
          <CategoryForm category={category} onComplete={categoryUpdate}/>
          <ExpenseForm category={category} onComplete={expenseCreate}/>
          <ExpenseItem expenses={expenses[category.id]}/>
        </div>
      )
    );
  }
}

let mapStateToProps = (state) => {
  return {expenses: state.expenses};
};

let mapDispatchToProps = (dispatch) => {
  return {
    expenseCreate: (data) => {dispatch(expenseActions.create(data));},
    categoryDestroy: (data) => {dispatch(categoryActions.destroy(data));},
    categoryUpdate: (data) => {dispatch(categoryActions.update(data));},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
