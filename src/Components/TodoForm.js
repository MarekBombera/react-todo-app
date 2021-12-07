import React from "react";

const TodoForm = ({
	currentItem,
	setCurrentItem,
	addItemToList,
	forwardedRef,
}) => {
	const handleUserInput = (e) => {
		setCurrentItem(e.target.value);
	};

	return (
		<>
			<input
				type="text"
				value={currentItem}
				onChange={handleUserInput}
				ref={forwardedRef}
			></input>
			<button onClick={addItemToList} className="add-item-button">
				Add To-Do
			</button>
		</>
	);
};

export default TodoForm;
