var React = require('react');

const InfoIcon = require( './icons/info.jsx' );
const RevisionsIcon = require( './icons/revisions.jsx' );
const TrashIcon = require( './icons/trash.jsx' );

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      note: {
        data: {
          tags: []
        }
      },
      revisions: null,
      onTrashNote: function() {},
      onRestoreNote: function() {},
      onRevisions: function() {},
      onSignOut: function() {}
    };
  },

  withNote: function(fn) {
    var note = this.props.note;
    return function() {
      var args = [note].concat([].slice.call(arguments));
      fn.apply(null, args);
    };
  },

  isTrashed: function(fn) {
    var note = this.props.note;
    if (note && note.deleted) {
      return fn.call(this, note);
    }
  },

  isNotTrashed: function(fn) {
    var note = this.props.note;
    if (note && !note.deleted) {
      return fn.call(this, note);
    }
  },

  render: function() {
    return (
      <div className="toolbar">
        <div className="detail-toolbar">
          <div ref="info" tabIndex="-1" className="button infoButton"><InfoIcon /></div>
          <div ref="revisions" tabIndex="-1" className="button revisionsButton" onClick={this.withNote(this.props.onRevisions)}><RevisionsIcon /></div>
          { this.isNotTrashed(function() {
            return (
              <div ref="trash" tabIndex="-1" className="button trashButton" onClick={this.withNote(this.props.onTrashNote)}><TrashIcon /></div>
            )
          })}
          { this.isTrashed(function() {
            return (
              <div ref="trash" tabIndex="-1" className="button trashButton" onClick={this.withNote(this.props.onRestoreNote)}>Restore</div>
            )
          })}
          <div className="space" style={{"flex": "1 1 auto", "visibility": "hidden"}}></div>
          <div ref="logout" tabIndex="-1" className="textbutton signoutButton" onClick={this.props.onSignOut}>Sign Out</div>
        </div>
      </div>
    )
  }
});