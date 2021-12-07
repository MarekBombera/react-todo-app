import React from "react";

const TodoItem = ({ itemBody }) => {
	return (
		<div className="item-body-container">
			<p>{itemBody}</p>
		</div>
	);
};

export default TodoItem;
