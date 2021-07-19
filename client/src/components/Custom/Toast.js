import React, { useContext } from 'react';
import { ToastContext } from '../../context/toastContext';
import {
  BiCheckCircle,
  BiInfoCircle,
  BiError,
  BiErrorCircle,
} from 'react-icons/bi';
import { ERROR, INFO, SUCCESS, WARNING } from '../../constant';
import { Col, Row } from 'react-bootstrap';
import { VscClose } from 'react-icons/vsc';
import { REMOVE_TOASTER } from '../../reducer/actionTypes';

const Toast = ({ position }) => {
  const { state: { toasts = [] } = {}, toastDispatch } =
    useContext(ToastContext);
  const getIcons = (type) => {
    switch (type) {
      case SUCCESS:
        return <BiCheckCircle />;
      case ERROR:
        return <BiErrorCircle />;
      case INFO:
        return <BiInfoCircle />;
      case WARNING:
        return <BiError />;

      default:
        return;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case SUCCESS:
        return '#5cb85c';
      case ERROR:
        return '#d9534f';
      case INFO:
        return '#5bc0de';
      case WARNING:
        return '#f0ad4e';

      default:
        return;
    }
  };
  return (
    <div className={`custom-toast-container ${position}`}>
      {toasts.map((toastObj, i) => {
        return (
          <div
            key={i}
            className="custom-toast"
            style={{ backgroundColor: getBackgroundColor(toastObj.type) }}
          >
            <Row>
              <Col className="close-icon-container">
                <VscClose
                  className="close-icon"
                  onClick={() => {
                    toastDispatch({
                      type: REMOVE_TOASTER,
                      payload: { id: toastObj.id },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row className="custom-toast-row">
              <Col md={2} className="custom-toast-img">
                {getIcons(toastObj.type)}
              </Col>
              <Col md={10} className="custom-toast-content">
                <p className="custom-toast-title">{toastObj.title}</p>
                <p className="custom-toast-message">{toastObj.message}</p>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
