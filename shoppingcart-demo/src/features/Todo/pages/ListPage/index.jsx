import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    { id: 1, title: 'Eat', status: 'new' },
    { id: 2, title: 'Sleep', status: 'completed' },
    { id: 3, title: 'Code', status: 'new' },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const [todoList, setTodoList] = useState(initTodoList);
  const [filterdStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, index) => {
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };

    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompletedClick = () => {
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderListFiltered = useMemo(() => {
    return todoList.filter((todo) => filterdStatus === 'all' || todo.status === filterdStatus);
  }, [todoList, filterdStatus]);

  const handleTodoFormSubmit = (data) => {
    const newTodo = {
      id: todoList.length + 1,
      title: data.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <TodoList todoList={renderListFiltered} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleShowAllClick}>Show all</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
