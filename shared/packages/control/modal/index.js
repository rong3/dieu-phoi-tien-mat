import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import PerfectScrollbar from 'react-perfect-scrollbar'

function Modal({ children, modalName, isOpen, size, className, centered, title, onClose, onAfterOpen, onAfterClose, ...props }) {
  const defaultClassNames = 'modal-dialog modal-dialog-scrollable';
  let classNames = `${defaultClassNames}${size ? ' modal-' + size : ''}`;
  classNames += `${centered ? ' modal-dialog-centered' : ''}`;
  classNames += className ? ` ${className}` : '';

  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      id={modalName}
      portalClassName={
        "ReactModalPortal"
      }
      shouldCloseOnEsc={props.shouldCloseOnEsc}
      className={classNames}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
      bodyOpenClassName={"modal-open"}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: props.zIndex,
          backgroundColor: props.showOverlay ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
        }
      }}
    >
      <div class="popup-detail popup-savedraft fancybox__content" id="popup-detail">
        {
          props.hasHeader && <div class="popup-header wide">
            <h2 className="title">{title}
            {
              props.showCloseButton && <a onClick={onClose}>
                <em style={{float: "right"}} className="fa fa-times pull-right"
                  role={"button"}>
                </em>
              </a>
            }
            </h2>
           
          </div>
        }
        <div className="popup-main">
          {
            React.Children.map(children, child => {
              return child;
            })
          }
        </div>
      </div>

    </ReactModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  centered: PropTypes.bool,
  modalName: PropTypes.string,
  shouldCloseOnOverlayClick: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  onClose: PropTypes.func,
  rightControl: PropTypes.func,
  showOverlay: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  zIndex: PropTypes.number,
  hasHeader: PropTypes.bool,
};

Modal.defaultProps = {
  zIndex: 1040,
  isOpen: false,
  title: 'Untitled',
  className: '',
  centered: false,
  shouldCloseOnOverlayClick: false,
  shouldCloseOnEsc: true,
  showOverlay: true,
  showCloseButton: true,
  hasHeader: true
};

Modal.Body = function ModalBody({ children }) {
  return (
    <PerfectScrollbar options={{
      useBothWheelAxes: false,
      suppressScrollX: false
    }} className="modal-body">
      <div className='col-md-12'>
        {children}
      </div>
    </PerfectScrollbar>
  );
};

Modal.Footer = function ModalBody({ children }) {
  return (
    <div className="modal-footer">
      {children}
    </div>
  );
};

export default Modal;
