import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //以下の記載は暗記物。引数はなんでもいいが、基本eventかe。
  // inputの値をstateとして保持設定する方法。
  // 「event.target.value」に実際のフォームの値が入っているので、この値をsetTodoTextに代入している。
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    // スプレッド構文を利用し、現在のincompleteTodosと同じ配列を作成。プラス現在フォームに追加したテキストも追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除する場合などの、何番目の要素にだけ処理を実行する時はindexを指定し判定すると良い
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // splice は、一つ目の引数に何番目かの要素を渡し、二番目の要素にいくつ削除するかを設定できる
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // splice は、一つ目の引数に何番目かの要素を渡し、二番目の要素にいくつ削除するかを設定できる
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        {/* 以下の記載だと初期値''が優先され、フォーム(value)に何を入力しても空文字に。そのためにonChange={}を使ってstateの変更を実現する */}
        {/* <input placeholder="TODOを入力" value={todoText} />  */}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* 関数に引数を渡したいときはアロー関数が必須になる */}
                {/* リロードされた時に関数が走るため。削除ボタンを押さなくても実行される */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
