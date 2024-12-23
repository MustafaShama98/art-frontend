import React, { Component } from "react";
import PropTypes from "prop-types";

import { ReactComponent as MiddleIcon } from "./icons/middle.svg";
import { ReactComponent as StoppingIcon } from "./icons/stopping.svg";
import { ReactComponent as StoppedIcon } from "./icons/stopped.svg";
import { ReactComponent as StartingIcon } from "./icons/starting.svg";
import { ReactComponent as UnavailableIcon } from "./icons/unavailable.svg";
import { ReactComponent as RunningIcon } from "./icons/running.svg";

const icons = {
  grey: UnavailableIcon,
  green: RunningIcon,
  greenOutline: StartingIcon,
  red: StoppedIcon,
  redOutline: StoppingIcon,
  orange: MiddleIcon
};

const STATUS_CLASS = "mq__status-icon";

const GREEN_STATUSES = ["Running"];
const GREEN_OUTLINE_STATUSES = ["Starting"];
const ORANGE_STATUSES = ["Retrying"];
const RED_OUTLINE_STATUSES = ["Stopping"];
const RED_STATUSES = ["Stopped"];
const GREY_STATUSES = ["Unavailable"];

const STATUS_LOOKUPS = [
  [GREEN_STATUSES, "green"],
  [GREEN_OUTLINE_STATUSES, "greenOutline"],
  [ORANGE_STATUSES, "orange"],
  [RED_OUTLINE_STATUSES, "redOutline"],
  [RED_STATUSES, "red"],
  [GREY_STATUSES, "grey"]
];

class Status extends Component {
  static propTypes = {
    /**
     * object type
     */
    objectType: PropTypes.string,
    /**
     * raw status type from object
     */
    status: PropTypes.string,
    /**
     * animates with a 'ping' when status prop changes value
     */
    animated: PropTypes.bool
  };

  static defaultProps = {
    status: "Unavailable"
  };

  constructor(props) {
    super(props);

    this.state = {
      statusType: {
        red: false,
        redOutline: false,
        orange: false,
        greenOutline: false,
        green: false,
        grey: true
      },
      status: undefined, // A record of the current status prop value, for detecting when it changes prior to rendering.
      animated: false // If true the icon will animate with a 'ping' if the statusType changes.
    };
  }

  /*
   * Prior to every render:
   * - Record the current value of the status prop.
   * - If the status prop is changing from a previously set value to a
   *   different one then set the animation state flag if the animation prop is
   *   true.
   * - Recalculate statusType based on the current status prop.
   */
  static getDerivedStateFromProps(props, state) {
    let newState = {
      statusType: {
        red: false,
        redOutline: false,
        orange: false,
        greenOutline: false,
        green: false,
        grey: true
      },
      status: props.status,
      animated:
        state.status && props.status !== state.status ? props.animated : false
    };

    STATUS_LOOKUPS.forEach((el, i) => {
      let found = el[0].find(statusEl => statusEl === props.status);
      if (found) {
        newState = {
          ...newState,
          statusType: {
            ...newState.statusType,
            grey: false,
            [el[1]]: true
          }
        };
      }
    });

    return newState;
  }

  render() {
    let initialClassNames = {
      [STATUS_CLASS]: true,
      [STATUS_CLASS + "--animated"]: this.state.animated,
      [STATUS_CLASS + "--green"]: this.state.statusType.green,
      [STATUS_CLASS + "--green-outline"]: this.state.statusType.greenOutline,
      [STATUS_CLASS + "--orange"]: this.state.statusType.orange,
      [STATUS_CLASS + "--red-outline"]: this.state.statusType.redOutline,
      [STATUS_CLASS + "--red"]: this.state.statusType.red,
      [STATUS_CLASS + "--grey"]: this.state.statusType.grey
    };

    let statusClassNames = Object.entries(initialClassNames)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .join(" ");

    const status = Object.keys(this.state.statusType).reduce(
      (s, key) => (this.state.statusType[key] ? key : s),
      "grey"
    );

    const StatusIcon = icons[status];

    return (
      <div className="mq__status-wrapper">
        <div className={statusClassNames}>
          <StatusIcon />
        </div>
        <div className="mq__status-text">{this.props.status}</div>
      </div>
    );
  }
}

export default Status;
