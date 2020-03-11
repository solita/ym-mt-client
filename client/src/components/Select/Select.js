import cx from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withNamespaces } from 'react-i18next';
import styles from './Select.module.css';

export class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchHits: [],
      focused: false,
      elementIndex: 0
    };
    this.searchInputRef = React.createRef();
    this.dropDownDivRef = React.createRef();
  }

  handleAdd = value => event => {
    this.setState({ searchString: '', focused: false, elementIndex: 0, searchHits: [] });
    this.props.onAdd(value);
  };

  handleRemoveSingle = () => {
    this.setState({ elementIndex: 0, searchString: '', searchHits: [] });

    this.props.onRemove();
  };

  onFocus = event => {
    this.setState({ focused: true });
    if (this.props.showAllOnFocus) {
      this.setState({ searchHits: this.props.values });
    }
  };

  dropDownDivIsActive = () => {
    const dropDownDivDOM = ReactDOM.findDOMNode(this.dropDownDivRef.current);
    return document.activeElement.isEqualNode(dropDownDivDOM);
  };

  onBlur = event => {
    if (this.dropDownDivIsActive()) {
      // Prevent losing the focus of the dropdownlist in vain
      // (IE needs this prevent because otherwise it loses it when user clicks on the scroll):
      return;
    }

    this.setState({ focused: false, elementIndex: 0, searchString: '', searchHits: [] });
  };

  handleSearch = event => {
    const { target } = event;
    const searchString = target.value || '';
    const { values } = this.props;

    const searchHits = values.filter(this.props.searchFn(searchString));

    this.setState({ searchString, searchHits, focused: true });
  };

  activeRef = undefined;

  setRef = (ref, item, isActive) => {
    if (isActive) {
      this.activeRef = ref;
    }
  };

  scrollActiveToView = () => {
    setTimeout(() => {
      this.activeRef.scrollIntoView({
        block: 'nearest'
      });
    }, 0); // next tick
  };

  handleKeyPress = (noSelectFn, event) => {
    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        let newElementIndex = this.state.elementIndex - 1;

        while (
          newElementIndex > -1 &&
          (noSelectFn ? noSelectFn(this.state.searchHits[newElementIndex]) : false)
        ) {
          newElementIndex--;
        }

        if (newElementIndex > 0) {
          this.setState({
            elementIndex: newElementIndex
          });
          this.scrollActiveToView();
        }
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();

        let newElementIndex = this.state.elementIndex + 1;
        while (
          newElementIndex < this.state.searchHits.length &&
          (noSelectFn ? noSelectFn(this.state.searchHits[newElementIndex]) : false)
        ) {
          newElementIndex++;
        }

        if (newElementIndex < this.state.searchHits.length - 1) {
          this.setState({
            elementIndex: newElementIndex
          });
          this.scrollActiveToView();
        }
        break;
      }

      case 'Escape': {
        this.searchInputRef.current.blur();
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (this.state.searchHits[this.state.elementIndex]) {
          this.handleAdd(this.state.searchHits[this.state.elementIndex])(event);
        }
        break;
      }

      default:
        break;
    }
  };

  render() {
    const { searchHits, searchString, elementIndex } = this.state;
    const { t, placeholder } = this.props;

    return (
      <>
        <div
          onKeyDown={e => this.handleKeyPress(this.props.noSelectFn, e)}
          className={styles.selectWrapper}
          onBlur={this.onBlur}
          ref={this.dropDownDivRef}
        >
          <div>
            {this.props.single &&
            Array.isArray(this.props.value) &&
            this.props.value.length === 1 ? (
              <button
                type="button"
                className={cx(styles.chosenSingle__Button, 'qa-custom-select-value')}
                onClick={this.handleRemoveSingle}
                data-value={this.props.keyFn(this.props.value[0])}
              >
                {this.props.displayFn(this.props.value[0])}
                <span className={styles.chosenSingle__Button__x} aria-label={t('Poista hakuehto')}>
                  &times;
                </span>
              </button>
            ) : (
              <input
                type="text"
                name="selectInput"
                onChange={this.handleSearch}
                onFocus={this.onFocus}
                value={searchString}
                placeholder={placeholder || ''}
                autoComplete="off"
                ref={this.searchInputRef}
                className={'qa-custom-select-input'}
              />
            )}
          </div>
          <div className={styles.searchResultWrapper}>
            <ul
              className={cx({ [styles.hidden]: !this.state.focused }, styles.selectList)}
              role="menu"
            >
              {searchHits.map((searchHit, index) => (
                <li
                  className={styles.selectList__item}
                  key={this.props.keyFn(searchHit)}
                  ref={r => this.setRef(r, searchHit, index === elementIndex)}
                >
                  {this.props.noSelectFn && this.props.noSelectFn(searchHit) ? (
                    <button
                      type="button"
                      tabIndex="-1"
                      className={cx(
                        styles.selectList__button,
                        'qa-custom-select-option',
                        styles['selectList__Button--disabled']
                      )}
                    >
                      {this.props.displayFn(searchHit)}
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-value={this.props.keyFn(searchHit)}
                      tabIndex="-1"
                      className={cx(styles.selectList__button, 'qa-custom-select-option', {
                        [styles['selectList__Button--active']]: index === elementIndex
                      })}
                      onMouseDown={this.handleAdd(searchHit)}
                    >
                      {this.props.displayFn(searchHit)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {!this.props.single && Array.isArray(this.props.value) && this.props.value.length > 0 && (
          <div className={styles.searchTerms__Container}>
            {this.props.value.map(val => {
              return (
                <button
                  key={this.props.keyFn(val)}
                  type="button"
                  data-value={this.props.keyFn(val)}
                  className={'searchTerms__Button qa-custom-select-value'}
                  onClick={() => this.props.onRemove(val)}
                >
                  {this.props.displayFn(val)}
                  <span className={'searchTerms__Button__x'} aria-label={t('Poista')}>
                    &times;
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default withNamespaces()(Select);
