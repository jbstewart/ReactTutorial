import React from 'react';
import classnames from 'classnames';

const Editable = ( { editing, value, onEdit, className, ...props } ) => {
    if (editing) {
        return <Editable.Edit className={className} value={value} onEdit={onEdit} {...props} />
    }
    return <Editable.Value className="" value={value} />
};

class Edit extends React.Component {
    render() {
        const {className, value, ...props} = this.props;

        return <input
            className={classnames('edit', className)}
            type="text"
            autoFocus="true"
            defaultValue={value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
            {...props}
        />
    }

    checkEnter = (e) => {
    // if (event.type === 'keypress' && (event.keyCode === 10 || event.keyCode === 13 || event.which === 13)) {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if (this.props.onEdit) {
            this.props.onEdit(value);
        }
    };
}

Editable.Value = ( { value, ...props } ) => <span className={classnames('value', className)} {...props}>{value}</span>;

Editable.Edit = Edit;

export default Editable;
