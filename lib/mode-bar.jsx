/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import appState from './flux/app-state';

const { setEditorMode } = appState.actionCreators;

const buttonClasses = 'button button-segmented-control button-compact';

export const ModeBar = ( {
	editorMode,
	onSetEditorModeEdit,
	onSetEditorModeMarkdown,
} ) =>
	<div className="note-editor-mode-bar segmented-control">
		<button
			className={ classNames( buttonClasses, { active: editorMode === 'edit' } ) }
			onClick={ onSetEditorModeEdit }
			type="button"
		>
			Edit
		</button>
		<button
			className={ classNames( buttonClasses, { active: editorMode === 'markdown' } ) }
			onClick={ onSetEditorModeMarkdown }
			type="button"
		>
			Preview
		</button>
	</div>;

const mapStateToProps = ( { appState: state } ) => ( { editorMode: state.editorMode } );

const mapDispatchToProps = dispatch => ( {
	onSetEditorModeEdit: () => dispatch( setEditorMode( { mode: 'edit' } ) ),
	onSetEditorModeMarkdown: () => dispatch( setEditorMode( { mode: 'markdown' } ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ModeBar );