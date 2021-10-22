import { ActionType } from '../action-types';
import {
	Direction,
	DeleteCellAction,
	InsertCellBeforeCellAction,
	MoveCellAction,
	UpdateCellAction,
} from '../actions';
import { CellTypes } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content,
		},
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	};
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};

export const insertcCellBefore = (id: string, type: CellTypes): InsertCellBeforeCellAction => {
	return {
		type: ActionType.INSERT_CELL_BEFORE,
		payload: {
			id,
			type,
		},
	};
};
