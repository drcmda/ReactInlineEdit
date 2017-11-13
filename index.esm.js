import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _class, _temp2;

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function selectInputText(element) {
  element.setSelectionRange(0, element.value.length);
}

var InlineEdit = (_temp2 = _class =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InlineEdit, _React$Component);

  function InlineEdit() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, Object.defineProperty(_this, "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        editing: _this.props.editing,
        text: _this.props.text,
        minLength: _this.props.minLength,
        maxLength: _this.props.maxLength
      }
    }), Object.defineProperty(_this, "startEditing", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        if (_this.props.stopPropagation) {
          e.stopPropagation();
        }

        _this.setState({
          editing: true,
          text: _this.props.text
        });
      }
    }), Object.defineProperty(_this, "finishEditing", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.isInputValid(_this.state.text) && _this.props.text != _this.state.text) {
          _this.commitEditing();
        } else if (_this.props.text === _this.state.text || !_this.isInputValid(_this.state.text)) {
          _this.cancelEditing();
        }
      }
    }), Object.defineProperty(_this, "cancelEditing", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          editing: false,
          text: _this.props.text
        });
      }
    }), Object.defineProperty(_this, "commitEditing", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          editing: false,
          text: _this.state.text
        });

        var newProp = {};
        newProp[_this.props.paramName] = _this.state.text;

        _this.props.change(newProp);
      }
    }), Object.defineProperty(_this, "clickWhenEditing", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        if (_this.props.stopPropagation) {
          e.stopPropagation();
        }
      }
    }), Object.defineProperty(_this, "isInputValid", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(text) {
        return text.length >= _this.state.minLength && text.length <= _this.state.maxLength;
      }
    }), Object.defineProperty(_this, "keyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode === 13) {
          _this.finishEditing();
        } else if (event.keyCode === 27) {
          _this.cancelEditing();
        }
      }
    }), Object.defineProperty(_this, "textChanged", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          text: event.target.value.trim()
        });
      }
    }), _temp) || _this;
  }

  var _proto = InlineEdit.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.isInputValid = this.props.validate || this.isInputValid; // Warn about deprecated elements

    if (this.props.element) {
      console.warn('`element` prop is deprecated: instead pass editingElement or staticElement to InlineEdit component');
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var isTextChanged = nextProps.text !== this.props.text;
    var isEditingChanged = nextProps.editing !== this.props.editing;
    var nextState = {};

    if (isTextChanged) {
      nextState.text = nextProps.text;
    }

    if (isEditingChanged) {
      nextState.editing = nextProps.editing;
    }

    if (isTextChanged || isEditingChanged) {
      this.setState(nextState);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var inputElem = ReactDOM.findDOMNode(this.refs.input);

    if (this.state.editing && !prevState.editing) {
      inputElem.focus();
      selectInputText(inputElem);
    } else if (this.state.editing && prevProps.text != this.props.text) {
      this.finishEditing();
    }
  };

  _proto.render = function render() {
    if (this.props.isDisabled) {
      var Element = this.props.element || this.props.staticElement;
      return React.createElement(Element, {
        className: this.props.className,
        style: this.props.style
      }, this.state.text || this.props.placeholder);
    } else if (!this.state.editing) {
      var _Element = this.props.element || this.props.staticElement;

      return React.createElement(_Element, {
        className: this.props.className,
        onClick: this.startEditing,
        tabIndex: this.props.tabIndex,
        style: this.props.style
      }, this.state.text || this.props.placeholder);
    } else {
      var _Element2 = this.props.element || this.props.editingElement;

      return React.createElement(_Element2, {
        onClick: this.clickWhenEditing,
        onKeyDown: this.keyDown,
        onBlur: this.finishEditing,
        className: this.props.activeClassName,
        placeholder: this.props.placeholder,
        defaultValue: this.state.text,
        onChange: this.textChanged,
        style: this.props.style,
        ref: "input"
      });
    }
  };

  return InlineEdit;
}(React.Component), Object.defineProperty(_class, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    text: PropTypes.string.isRequired,
    paramName: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    validate: PropTypes.func,
    style: PropTypes.object,
    editingElement: PropTypes.string,
    staticElement: PropTypes.string,
    tabIndex: PropTypes.number,
    isDisabled: PropTypes.bool,
    editing: PropTypes.bool
  }
}), Object.defineProperty(_class, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    minLength: 1,
    maxLength: 256,
    editingElement: 'input',
    staticElement: 'span',
    tabIndex: 0,
    isDisabled: false,
    editing: false
  }
}), _temp2);
export { InlineEdit as default };
